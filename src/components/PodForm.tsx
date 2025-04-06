import { cn } from "@lib/utils";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/index";
import type { ClassValue } from "clsx";

type Props = {
  className?: ClassValue;
  loggedInAs: string;
  storages: string[];
  decks: string[];
  cards: string[];
  onLogOut: () => void;
  onFetchSolidMemoData: () => void;
};

export function PodForm({ className, loggedInAs, onLogOut }: Props) {
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Solid Memo</CardTitle>
          <CardDescription className="break-all">
            <div>Logged in as</div>
            <div>{loggedInAs}</div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={(evt) => {
                    evt.preventDefault();
                    onLogOut();
                  }}
                >
                  Log out
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
