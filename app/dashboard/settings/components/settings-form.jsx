"use client";

import { AlertError, AlertSuccess } from "@/components/alert";
import FormError from "@/components/form-error";
import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import SubmitButton from "@/components/submit-button";
import { updateSettings } from "@/lib/actions";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
  error: true,
  errors: {},
};

export default function SettingsForm({ defaults }) {
  const [state, formAction] = useFormState(updateSettings, initialState);

  return (
    <form className="space-y-4" action={formAction}>
      {state?.message && state?.error && (
        <AlertError>{state?.message}</AlertError>
      )}

      {!state?.error && state?.message?.length > 0 && (
        <AlertSuccess>{state?.message}</AlertSuccess>
      )}
      <Label htmlFor="fullName">User full name</Label>
      <Input
        type="text"
        name="fullName"
        id="fullName"
        placeholder="User full name"
        defaultValue={defaults?.fullName}
      />
      {state?.errors["fullName"]?.map((error) => (
        <FormError key={`fullName-${error}`} error={error} />
      ))}

      <Label htmlFor="defaultView">Default transactions view</Label>
      <Select
        name="defaultView"
        id="defaultView"
        defaultValue={defaults?.defaultView}
      >
        <option value="last24hours">Last 24 hours</option>
        <option value="last7days">Last 7 days</option>
        <option value="last30days">Last 30 days</option>
        <option value="last12months">Last 12 months</option>
      </Select>
      {state?.errors["defaultView"]?.map((error) => (
        <FormError key={`defaultView-${error}`} error={error} />
      ))}

      <SubmitButton>Update Settings</SubmitButton>
    </form>
  );
}
