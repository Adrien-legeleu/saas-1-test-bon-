"use server";

import { getUser } from "./actionsUsers";
import { prisma } from "./prisma";

export const createNote = async (formData: FormData) => {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const completed = formData.get("completed") === "on";
    const user = await getUser();
    const userid = user.id as string;

    if (!title || !description) {
      throw new Error("Title and description are required.");
    }

    await prisma.notes.create({
      data: {
        userId: userid,
        title,
        description,
        completed,
      },
    });
  } catch (error: any) {
    console.error("Erreur lors de la création de votre note:", error.message);
  }
};

export const getAllnotes = async (userid: string) => {
  const data = await prisma.notes.findMany({
    where: {
      userId: userid,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return data;
};
