// Composant serveur - chargé de récupérer les données
import PageNoteUpdate from "@/app/components/PageNoteUpdate";
import { getNote } from "@/lib/actionsNotes";

interface Params {
  id: string; // Seul l'id vient de l'URL
}

interface UpdatePageProps {
  params: Params;
}

export default async function PageNoteServer({ params }: UpdatePageProps) {
  const currentNote = await getNote(params.id);

  return (
    <div>
      <PageNoteUpdate note={currentNote} />
    </div>
  );
}
