"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { transactionSchema } from "./validation";

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
