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

interface Params {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface UpdatePageProps {
  params: Params;
}

export default function PageNote({ params }: UpdatePageProps) {
  return (
    <Card>
      <form>
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
            Modifier votre note
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
