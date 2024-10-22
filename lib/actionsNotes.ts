"use server";

import { revalidatePath } from "next/cache";
import { getUser } from "./actionsUsers";
import { prisma } from "./prisma";
type Note = {
  id: string;
  title: string | null;
  description: string | null;
  completed: boolean | null;
  createdAt: Date;
  updateAt: Date;
  userId: string;
};

export const createNote = async (formData: FormData) => {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const completed = formData.get("completed");
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
        completed: completed == "on",
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

export const deleteNote = async (id: string) => {
  await prisma.notes.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/notes");
};

export const getNote = async (id: string) => {
  const note = prisma.notes.findUnique({
    where: { id: id },
  });
  return note;
};

export const updateNote = async (formData: FormData, id: string) => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const completed = formData.get("completed");

  const note = await prisma.notes.update({
    where: { id },
    data: {
      title,
      completed: completed == "on",
      description,
    },
  });
  return note;
};
