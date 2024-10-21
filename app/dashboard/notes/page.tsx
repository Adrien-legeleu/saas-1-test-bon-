"use client"; // Ajout du use client ici pour rendre ce composant interactif
import { useEffect, useState } from "react";
import ButtonDelete from "@/app/components/ButtonDelete";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FilePenLine } from "lucide-react";
import Link from "next/link";
import { getAllnotes } from "@/lib/actionsNotes"; // Mettez à jour pour utiliser une fonction client
import { getUser } from "@/lib/actionsUsers";
type Note = {
  id: string;
  title: string | null;
  description: string | null;
  completed: boolean | null;
  createdAt: Date;
  updateAt: Date;
  userId: string;
};

export default function PageNotes() {
  const [notes, setNotes] = useState<Note[]>([]); // Initialisez l'état des notes
  const [loading, setLoading] = useState(true); // État pour gérer le chargement

  // Fonction pour charger les notes
  const loadNotes = async () => {
    try {
      const user = await getUser();
      const data = await getAllnotes(user.id);
      setNotes(data);
    } catch (error) {
      console.error("Erreur lors du chargement des notes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  if (loading) {
    return <p>Chargement des notes...</p>; // Affichage lors du chargement
  }

  return (
    <section className="grid items-start gap-y-8">
      <div className="flex md:items-center md:justify-between flex-col md:flex-row px-2">
        <div className="gap-1 grid">
          <h2 className="text-3xl uppercase font-black tracking-wider">
            Notes
          </h2>
          <p className="text-lg text-muted-foreground">
            Ne perdez pas vos idées, prennez des notes
          </p>
          <div className="w-12 bg-white my-2 mx-1 h-[1px]"></div>
        </div>
        <Button>
          <Link href={"/dashboard/notes/create"}>Créer une note</Link>
        </Button>
      </div>

      {notes.length < 1 ? (
        <div className="flex flex-col min-h-[400px] items-center justify-center rounded-md border border-dashed p-3">
          pas de note
        </div>
      ) : (
        <div className="flex flex-col space-y-4">
          {notes.map((note, idx) => (
            <Card className="flex items-center justify-between p-4" key={idx}>
              <div>
                <h2 className="text-orange-500 text-xl font-bold">
                  {note.title}
                </h2>
                <p className="text-sm text-muted-foreground">
                  écrit le{" "}
                  {new Intl.DateTimeFormat("fr-FR", {
                    dateStyle: "full",
                  }).format(new Date(note.createdAt))}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-4 mb-3">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
                  <Link href={`notes/note/${note.id}`}>
                    <FilePenLine className="w-4" />
                  </Link>
                </Button>
                <ButtonDelete id={note.id} />
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
