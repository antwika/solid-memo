import { ServiceContext } from "@providers/service.provider";
import { Button } from "@ui/index";
import { Logo } from "@ui/logo.ui";
import Link from "next/link";
import { useContext } from "react";

type Props = {
  onLogOut: () => void;
};

export function Header({ onLogOut }: Props) {
  const { getAuthService } = useContext(ServiceContext);
  const authService = getAuthService();

  return (
    <div>
      <div className="relative flex p-4">
        <div>
          <Link href={`/`}>
            <div className="flex items-center gap-x-2">
              <Logo size="xs" />
              <h1>Solid Memo</h1>
            </div>
          </Link>
          {authService.isLoggedIn() && authService.getWebId() && (
            <div className="break-all italic opacity-50">
              Logged in as: {authService.getWebId()}
            </div>
          )}
        </div>
        {authService.isLoggedIn() && authService.getWebId() && (
          <div className="absolute right-0">
            <Button variant={"secondary"} onClick={onLogOut}>
              Log out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
