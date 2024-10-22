// ClientComponentNote.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { toast } from "react-toastify";
import { updateNote } from "@/lib/actionsNotes";

type Note = {
  id: string;
  title: string | null;
  description: string | null;
  completed: boolean | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};

interface PageNoteUpdateProps {
  note: Partial<Note> | null; // Vous recevez la note du composant serveur
}

export default function PageNoteUpdate({ note }: PageNoteUpdateProps) {
  const [currentNote, setCurrentNote] = useState<Partial<Note | null>>(note); // On gère l'état ici

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      if (note?.id) {
        const newNote = await updateNote(new FormData(event.target), note.id);
        setCurrentNote(newNote);
        toast.success("modification de votre note réussi avec succès !");
      }
    } catch (error) {
      toast.error("erreur lors de la modification de la note");
      console.error("erreur lors de la modification", error);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Votre Note</CardTitle>
          <CardDescription>Quelques mots pour ne pas oublier</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="gap-y-2 flex flex-col">
            <Label htmlFor="title">Titre</Label>
            <Input
              name="title"
              id="title"
              type="text"
              defaultValue={currentNote?.title ?? ""}
              required
              placeholder="Titre de votre note"
            />
          </div>
          <div className="gap-y-2 flex flex-col">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              id="description"
              defaultValue={currentNote?.description ?? ""}
              required
              placeholder="Description de votre note"
            />
          </div>
          <div className="gap-y-2 flex flex-col">
            <Label htmlFor="completed">En attente | Complet</Label>
            <Input
              name="completed"
              id="completed"
              type="checkbox"
              className="w-6 cursor-pointer "
              defaultChecked={currentNote?.completed ?? false}
            />
          </div>
        </CardContent>
        <CardFooter className="gap-x-6">
          <Button type="button" variant="secondary">
            <Link href="/dashboard/notes">Annuler</Link>
          </Button>
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            Modifier votre note
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
