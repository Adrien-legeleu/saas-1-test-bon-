"use server";

import { getRequiredAuthSession } from "./auth";
import { prisma } from "./prisma";

export const getUser = async () => {
  const session = await getRequiredAuthSession();
  const id = session.user.id as string;
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) {
    throw new Error(`User not found for ID: ${id}`);
  }

  return user;
};

export const updateUser = async (formDate: FormData) => {
  try {
    const userName = formDate.get("name") as string;
    const id = formDate.get("id") as string;
    if (userName !== null) {
      await prisma.user.update({
        where: { id },
        data: { name: userName },
      });
    }
  } catch (error) {
    console.error(
      "Une erreur est survenue lors de la modification de l'utilidateur",
      error
    );
  }
};
