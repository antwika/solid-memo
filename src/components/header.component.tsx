import { SessionContext } from "@providers/index";
import { Button } from "@ui/index";
import { useContext } from "react";

type Props = {
  onLogOut: () => void;
};

export function Header({ onLogOut }: Props) {
  const { session } = useContext(SessionContext);
  return (
    <div className="flex p-4">
      <div className="grow">
        <div className="text-2xl font-extrabold">Solid Memo</div>
        <div className="italic opacity-50">
          Logged in as: {session.info.webId}
        </div>
      </div>
      <Button onClick={onLogOut}>Log out</Button>
    </div>
  );
}
