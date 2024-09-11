"use client";
import { AlertError, AlertSuccess } from "@/components/alert";
import Input from "@/components/input";
import SubmitButton from "@/components/submit-button";
import { uploadAvatar } from "@/lib/actions";
import { Ban, Check } from "lucide-react";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
  error: true,
};

export default function Page() {
  const [state, formAction] = useFormState(uploadAvatar, initialState);

  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Avatar</h1>
      <form action={formAction} className="space-y-4">
        {state?.message && state?.error && (
          <AlertError>{state?.message}</AlertError>
        )}

        {state?.message && !state?.error && (
          <AlertSuccess>{state?.message}</AlertSuccess>
        )}

        <Input type="file" name="file" id="file" />
        <SubmitButton>Upload Avatar</SubmitButton>
      </form>
    </>
  );
}
