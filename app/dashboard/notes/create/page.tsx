"use client";
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
import { createNote } from "@/lib/actionsNotes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default async function CreatePage() {
  const router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await createNote(new FormData(event.target));
      toast.success("Compte modifié avec succès");
      router.push("/dashboard/notes");
    } catch (error) {
      toast.error("Erreur lors de la modification du compte");
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Nouvelle Note</CardTitle>
          <CardDescription>Quelques mots pour ne pas oublier</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-5">
          <div className="gap-y-2 flex flex-col">
            <Label htmlFor="title">Titre</Label>
            <Input
              name="title"
              id="title"
              type="text"
              required
              placeholder="Titre de votre note"
            />
          </div>
          <div className="gap-y-2 flex flex-col">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              id="description"
              required
              placeholder="Titre de votre note"
            />
          </div>
          <div className="gap-y-2 flex flex-col">
            <Label htmlFor="completed">En attente | Complet</Label>
            <Input
              name="completed"
              id="completed"
              type="checkbox"
              className="w-6 cursor-pointer "
            />
          </div>
        </CardContent>
        <CardFooter className="gap-x-6">
          <Button variant="secondary">
            <Link href="/dashboard/notes">Annuler</Link>
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Créer votre note
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
