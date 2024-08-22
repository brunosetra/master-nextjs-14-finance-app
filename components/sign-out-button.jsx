"use client";
import { LogOut } from "lucide-react";
import SubmitButton from "./submit-button";
import { logout } from "@/lib/actions";

export default function SignOutButton() {
  return (
    <form action={logout}>
      <SubmitButton variant="ghost" size="sm">
        <LogOut className="w-6 h-6" />
      </SubmitButton>
    </form>
  );
}
