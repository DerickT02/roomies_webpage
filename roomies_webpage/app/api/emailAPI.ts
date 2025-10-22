import { client } from '../index';

export async function createEmail(email: string) {
  try {
    
    const { data: createdEmail, errors } = await client.models.Email.create({
      email,
      sentDate: new Date().toISOString(),
    });

    if (errors && errors.length > 0) {
      console.error("Error creating email:", errors);
      return null;
    }

    console.log("Email created:", createdEmail);
    return createdEmail;

  } catch (err) {
    console.error("Unexpected error:", err);
    return null;
  }
}