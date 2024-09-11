"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { settingsSchema, transactionSchema } from "./validation";
import { redirect } from "next/navigation";

export async function createTransaction(formData) {
  const { success, data } = transactionSchema.safeParse(formData);

  if (!success) {
    throw new Error("Invalid transaction data");
  }

  const { error } = await createClient().from("transactions").insert(data);

  if (error) {
    throw new Error("Failed to create transaction");
  }

  revalidatePath("/dashboard");
}

export async function updateTransaction(id, formData) {
  const { success, data } = transactionSchema.safeParse(formData);

  if (!success) {
    throw new Error("Invalid transaction data");
  }

  const { error } = await createClient()
    .from("transactions")
    .update(data)
    .eq("id", id);

  if (error) {
    throw new Error("Failed to update transaction");
  }

  revalidatePath("/dashboard");
}

export async function getTransacion(id) {
  const supabase = createClient();
  return await supabase.from("transactions").select("*").eq("id", id).single();
}

export async function findTransactions(range, offset = 0, limit = 10) {
  const { startDate, endDate } = getDatesForRange(range);

  const supabase = createClient();

  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .gte("created_at", startDate.toISOString())
    .lte("created_at", endDate.toISOString())
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    throw new Error("Failed to get transactions");
  }

  return data;
}

export async function getTrendTotal(type, range = "last30days") {
  const { startDate, endDate, previousStartDate, previousEndDate } =
    getDatesForRange(range);

  const supabase = createClient();
  const { data, error } = await supabase
    .from("transactions")
    .select("type, amount.sum()")
    .eq("type", type)
    .gte("created_at", startDate.toISOString())
    .lte("created_at", endDate.toISOString())
    .limit(1);

  const { data: previousData, error: previousError } = await supabase
    .from("transactions")
    .select("type, amount.sum()")
    .eq("type", type)
    .gte("created_at", previousStartDate.toISOString())
    .lte("created_at", previousEndDate.toISOString())
    .limit(1);

  if (error || previousError)
    throw new Error(`Failed to get trend total ${type}`);

  const amount = data[0]?.sum ?? 0;
  const prevAmount = previousData[0]?.sum ?? 0;

  return { amount, prevAmount };
}

export async function deleteTransaction(id) {
  const supabase = createClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id);
  if (error) throw new Error("Failed to delete transaction");

  revalidatePath("/dashboard");
}

function getDatesForRange(range) {
  const now = new Date();
  let startDate = now;
  let previousEndDate = now;
  let previousStartDate = now;

  switch (range) {
    case "last24hours":
      startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      previousEndDate = new Date(startDate - 1);
      previousStartDate = new Date(previousEndDate - 48 * 60 * 60 * 1000);
      break;
    case "last7days":
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      previousEndDate = new Date(startDate - 1);
      previousStartDate = new Date(previousEndDate - 7 * 24 * 60 * 60 * 1000);
      break;
    case "last30days":
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      previousEndDate = new Date(startDate - 1);
      previousStartDate = new Date(previousEndDate - 30 * 24 * 60 * 60 * 1000);
      break;
    case "last12months":
      startDate = new Date(now.getTime() - 12 * 30 * 24 * 60 * 60 * 1000);
      previousEndDate = new Date(startDate - 1);
      previousStartDate = new Date(
        previousEndDate - 12 * 30 * 24 * 60 * 60 * 1000
      );
      break;
    default:
      startDate = new Date(now.getTime() - 30 * 12 * 30 * 24 * 60 * 60 * 1000);
      previousEndDate = new Date(startDate - 1);
      previousStartDate = new Date(
        previousEndDate - 30 * 12 * 30 * 24 * 60 * 60 * 1000
      );
      break;
  }

  return { startDate, endDate: now, previousStartDate, previousEndDate };
}

export async function login(prevState, formData) {
  const supabase = createClient();
  const email = formData.get("email");

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    },
  });

  return error
    ? {
        error: true,
        message: "Error authenticating!",
      }
    : {
        message: `Email sent to ${email}`,
      };
}

export async function logout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("Failed to sign out");
  redirect("/login");
}

export async function uploadAvatar(prevState, formData) {
  const supabase = createClient();

  const file = formData.get("file");

  const fileExtension = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExtension}`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, file);

  if (error)
    return {
      error: true,
      message: "Failed to upload avatar",
    };

  const { data: userData, userError } = await supabase.auth.getUser();
  if (userError) {
    return {
      error: true,
      message: "Something went wrong, try again",
    };
  }

  const avatar = userData.user.user_metadata.avatar;
  if (avatar) {
    const { error } = await supabase.storage.from("avatars").remove([avatar]);

    if (error) {
      return {
        error: true,
        message: "Something went wrong, try again",
      };
    }
  }

  const { error: dataUpdateError } = await supabase.auth.updateUser({
    data: { avatar: fileName },
  });

  if (dataUpdateError)
    return {
      error: true,
      message: "Error associating the avatar with the user.",
    };

  return {
    message: "Avatar uploaded",
  };
}

export async function updateSettings(prevState, formData) {
  const validated = settingsSchema.safeParse({
    fullName: formData.get("fullName"),
    defaultView: formData.get("defaultView"),
  });

  if (!validated.success)
    return {
      errors: validated.error.flatten().fieldErrors,
    };

  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({
    data: {
      fullName: validated.data.fullName,
      defaultView: validated.data.defaultView,
    },
  });

  if (error)
    return {
      error: true,
      message: "Failed updating settings.",
      errors: {},
    };

  return {
    message: "Settings updated.",
    errors: {},
  };
}

const categories = [
  "Housing",
  "Transport",
  "Health",
  "Food",
  "Education",
  "Other",
];

// export async function seed() {
//   let transactions = [];

//   for (let i = 0; i < 10; i++) {
//     const created_at = getRandomPastDate();
//     let type,
//       category = null;

//     const typeBias = Math.random();

//     if (typeBias < 0.8) {
//       type = "Expense";
//       category = getRandomValueFromArray(categories);
//     } else if (typeBias < 0.9) {
//       type = "Income";
//     } else {
//       type = getRandomValueFromArray(["Saving", "Investment"]);
//     }

//     let amount;
//     switch (type) {
//       case "Income":
//         amount = getRandomValue(2000, 9000);
//         break;
//       case "Expense":
//         amount = getRandomValue(10, 1000);
//         break;
//       case "Investment":
//       case "Saving":
//         amount = getRandomValue(3000, 10000);
//         break;
//     }

//     transactions.push({
//       created_at,
//       amount,
//       type,
//       description: getRandomText(),
//       category,
//     });
//   }
//   const supabase = createClient();
//   const { error } = await supabase.from("transactions").insert(transactions);

//   if (error) {
//     console.error("Error inserting data", error);
//   } else {
//     console.log("Data inserted");
//   }
// }

// function getRandomValue(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// function getRandomText() {
//   const characters =
//     "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//   let result = "";
//   for (let i = 0; i < 30; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return result;
// }

// function getRandomValueFromArray(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// function getRandomPastDate() {
//   const minYear = new Date().getFullYear() - 2;
//   const maxYear = new Date().getFullYear();
//   const randomYear =
//     Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
//   const randomMonth = Math.floor(Math.random() * 12);
//   const randomDay = Math.floor(Math.random() * 28) + 1;
//   const randomDate = new Date(randomYear, randomMonth, randomDay);
//   return randomDate;
// }
