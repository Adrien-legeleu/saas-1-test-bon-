"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

interface DeleteButtonprops {
  id: string;
}
export default function ButtonDelete({ id }: DeleteButtonprops) {
  return (
    <form>
      <Input type="hidden" name="id" value={id} />
      <Button type="submit" variant="destructive">
        <Trash2 />
      </Button>
    </form>
  );
}
