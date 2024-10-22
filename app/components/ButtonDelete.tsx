"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { deleteNote } from "@/lib/actionsNotes";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";

interface DeleteButtonprops {
  id: string;
  updateNotes: (id: string) => void;
}
export default function ButtonDelete({ id, updateNotes }: DeleteButtonprops) {
  const handleSubmit = async () => {
    try {
      await deleteNote(id);
      updateNotes(id);
      toast.success("note supprime avec succès");
    } catch (error) {
      console.error("error lors de la suppression", error);
      toast.error("error lors de la suppression");
    }
  };

  return (
    <Button onClick={handleSubmit} type="submit" variant="destructive">
      <Trash2 />
    </Button>
  );
}
