import { cn } from "@src/lib/utils";
import { Button } from "@src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import type { ClassValue } from "clsx";

type Props = {
  className?: ClassValue;
  loggedInAs: string;
  onLogOut: () => void;
};

export function LogoutForm({ className, loggedInAs, onLogOut }: Props) {
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
