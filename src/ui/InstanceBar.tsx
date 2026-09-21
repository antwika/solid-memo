import type { Instance } from "../domain/instance";
import { ExternalLink } from "./ExternalLink";

/** Persistent bar showing which instance the user is working in. */
export function InstanceBar({
  instance,
  onSwitch,
  onOpenPreferences,
}: {
  instance: Instance;
  onSwitch: () => void;
  onOpenPreferences: () => void;
}) {
  return (
    <div class="instance-bar">
      <div class="instance-bar-identity">
        <strong>{instance.name}</strong>
        <ExternalLink url={instance.url} class="hint" />
      </div>
      <button onClick={onOpenPreferences}>Preferences</button>
      <button onClick={onSwitch}>Switch instance</button>
    </div>
  );
}
