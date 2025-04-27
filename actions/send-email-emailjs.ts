"use server"

import { z } from "zod"

// Form validation schema
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

export type FormState = {
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
    _form?: string[]
  }
  success?: boolean
  message?: string
}

export async function sendEmailWithEmailJS(prevState: FormState, formData: FormData): Promise<FormState> {
  // Validate form data
  const validatedFields = formSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  })

  // Return errors if validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
      message: "Please check the form for errors.",
    }
  }

  // If validation passes, return success
  // The actual email sending will be handled client-side with EmailJS
  return {
    success: true,
    message: "Your message has been sent successfully!",
  }
}
