import { cn } from "@lib/utils";
import {
  Button,
  Input,
  Label,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/index";
import type { ClassValue } from "clsx";

type Props = {
  className?: ClassValue;
  onSelectOidcIssuer: (oidcIssuer: string) => void;
};

export function LoginForm({ className, onSelectOidcIssuer }: Props) {
  const oidcIssuers = [
    { url: "https://login.inrupt.com", name: "Inrupt PodSpaces" },
    { url: "http://localhost:3000", name: "Localhost:3000" },
  ];
  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome to Solid Memo</CardTitle>
          <CardDescription>Choose your Solid WebID provider</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                {oidcIssuers.map((oidcIssuer) => (
                  <Button
                    key={oidcIssuer.url}
                    variant="outline"
                    className="w-full"
                    onClick={(evt) => {
                      evt.preventDefault();
                      onSelectOidcIssuer(oidcIssuer.url);
                    }}
                  >
                    {oidcIssuer.name}
                  </Button>
                ))}
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-background text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Your Solid WebID</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="https://your.pod/profile/card#me"
                    required
                    disabled
                  />
                </div>
                <Button type="submit" className="w-full" disabled>
                  Login with WebID
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have a WebID?{" "}
                <a
                  href="https://solidproject.org/for-developers#hosted-pod-services"
                  className="underline underline-offset-4"
                >
                  Find a WebID provider
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
