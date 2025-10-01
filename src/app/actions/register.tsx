"use server";

import { IFormData } from "@/types/form-type";
import { saltAndHashPassword } from "@/utils/password";
import { prisma } from "@/utils/prisma";

export async function registerUser(formData: IFormData) {
  const { email, password, confirmPassword } = formData;

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  if(password.length < 6){
      return {error: "The password must be at least 6 characters long"}
  }

  try {

    const existingUser = await prisma.user.findUnique({
        where:{ email }
    })

    if(existingUser){
        return {error: "A user with this email address already exists"}
    }

    const pwHash = await saltAndHashPassword(password);

    const user = await prisma.user.create({
      data: {
        email: email,
        password: pwHash,
      },
    });
    return user;
  } catch (error) {
    console.error("Error registration", error);
    return { error: "Error registration" };
  }
}
