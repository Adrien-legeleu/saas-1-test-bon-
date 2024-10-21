// Composant sans "use client" pour récupérer les données
import PageSettingsClient from "@/app/components/pageSettingsClient";
import { getUser } from "@/lib/actionsUsers";

export default async function PageSettings() {
  const user = await getUser(); // Appel serveur, permis ici

  return <PageSettingsClient user={user} />; // On passe les données à un composant client
}
