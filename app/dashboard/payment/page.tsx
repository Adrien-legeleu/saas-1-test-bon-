import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function PagePayment() {
  const itemsPremium = [
    { name: "Hébergement Web Basique" },
    { name: "Hébergement Web Standard" },
    { name: "Hébergement Web Avancé" },
    { name: "Hébergement Web Professionnel" },
  ];

  return (
    <div className="max-w-lg mx-auto space-y-4 mt-3">
      <Card className="flex flex-col">
        <CardContent className="py-8 space-y-6">
          <div>
            <h3 className="text-md font-bold tracking-wider uppercase bg-orange-900 bg-opacity-20 text-orange-500 p-3 rounded-xl">
              Pass Premium
            </h3>
          </div>
          <div className=" text-6xl font-semibold">
            <span>19,99€</span>
            <span className="text-sm text-muted-foreground ml-1">
              / par mois
            </span>
          </div>
          <p className=" text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
            quaerat voluptatibus nostrum sapiente in id iste ab, ipsa tempora
            magni.
          </p>
          <div className="flex-1 flex flex-col justify-between px-6 py-4 bg-secondary rounded-lg m-1 space-y-6 p-3 ">
            <ul className="space-y-3">
              {itemsPremium.map((item, idx) => {
                return (
                  <li
                    className="flex items-center gap-2 text-muted-foreground"
                    key={`item : ${idx}`}
                  >
                    <span>✅</span>
                    <span>{item.name}</span>
                  </li>
                );
              })}
            </ul>
            <form action="" className="w-full">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Devenir membre Premium
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
