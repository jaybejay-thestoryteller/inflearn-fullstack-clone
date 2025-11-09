"use server";

import { prisma } from "@/prisma";
import { hashPassword } from "@/lib/auth-utils";

export const signUp = async (email: string, password: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return { status: "error", message: "User already exists" };
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.create({
      data: {
        email,
        hashedPassword,
      },
    });

    return { status: "success", message: "User created successfully" };
  } catch (error) {
    console.error(error);
    return { status: "error", message: "Failed to sign up" };
  }
};
