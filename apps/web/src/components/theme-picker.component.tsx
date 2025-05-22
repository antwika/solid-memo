import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/index";
import { Check, Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { type ReactNode, useEffect, useState } from "react";

export function ThemePicker() {
  const { theme, setTheme } = useTheme() as {
    theme: string;
    setTheme: (theme: string) => void;
  };
  const [themeIcon, setThemeIcon] = useState<ReactNode | undefined>();

  useEffect(() => {
    if (theme === "system") setThemeIcon(<SunMoon />);
    if (theme === "light") setThemeIcon(<Sun />);
    if (theme === "dark") setThemeIcon(<Moon />);
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="border-2 border-secondary hover:bg-secondary p-1 rounded-md"
        title="Select theme"
      >
        {themeIcon}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System {theme === "system" && <Check />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light {theme === "light" && <Check />}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark {theme === "dark" && <Check />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
