"use server";

import { createEmail } from "../api/emailAPI";

export async function subscribe(formData: FormData) {
  const email = formData.get("email") as string;
  await createEmail(email);
}