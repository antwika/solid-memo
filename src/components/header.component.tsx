import { ServiceContext } from "@providers/service.provider";
import { Button } from "@ui/index";
import { useContext } from "react";

type Props = {
  onLogOut: () => void;
};

export function Header({ onLogOut }: Props) {
  const { getAuthService } = useContext(ServiceContext);
  const authService = getAuthService();

  return (
    <div className="relative flex p-4">
      <div className="grow">
        <div className="mb-2 text-2xl font-extrabold">Solid Memo</div>
        {authService.isLoggedIn() && authService.getWebId() && (
          <div className="break-all italic opacity-50">
            Logged in as: {authService.getWebId()}
          </div>
        )}
      </div>
      {authService.isLoggedIn() && authService.getWebId() && (
        <div className="absolute right-0">
          <Button onClick={onLogOut}>Log out</Button>
        </div>
      )}
    </div>
  );
}
