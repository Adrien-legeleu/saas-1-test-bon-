"use client"; // Ce composant est un Client Component

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
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateUser } from "@/lib/actionsUsers";

export default function PageSettingsClient({ user }: any) {
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      await updateUser(new FormData(event.target));
      toast.success("Compte modifié avec succès");
    } catch (error) {
      toast.error("Erreur lors de la modification du compte");
    }
  };

  return (
    <section className="border border-gray-200 dark:border-gray-800 rounded-xl p-3">
      <h2 className="text-3xl uppercase font-black tracking-wider">Settings</h2>
      <p className="text-lg text-muted-foreground">Vos paramètres de profil</p>
      <div className="w-12 bg-white my-2 mx-1 h-[1px]"></div>
      <form onSubmit={handleSubmit}>
        <Input type="hidden" name="id" value={user?.id} />
        <Card>
          <CardHeader>
            <CardTitle>Paramètre global</CardTitle>
            <CardDescription>
              Modifier vos informations puis sauvegarder
            </CardDescription>
          </CardHeader>
          <CardContent>
            {user?.image && (
              <Image
                width={100}
                height={100}
                alt={`photo de profil de ${user?.name}`}
                src={user.image}
                className="rounded-full w-16 h-16 object-cover mb-4"
              />
            )}
            <div className="space-y-2 mb-2">
              <Label htmlFor="idUser">Id</Label>
              <Input
                type="text"
                name="idUser"
                id="idUser"
                disabled
                defaultValue={user?.id || ""}
              />
            </div>
            <div className="space-y-1 mb-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                type="text"
                name="name"
                id="name"
                defaultValue={user?.name || ""}
              />
            </div>
            <div className="space-y-1 mb-2">
              <Label htmlFor="email">Email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                disabled
                defaultValue={user?.email || ""}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Modifier</Button>
          </CardFooter>
        </Card>
      </form>
      <form action="">
        <Input type="hidden" name="id" value={user?.id} />
        <Button variant="destructive" className="mx-1 my-4 mb-2">
          Supprimer votre compte
        </Button>
      </form>
    </section>
  );
}
