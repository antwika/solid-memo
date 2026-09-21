import type { Instance } from "../domain/instance";

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
        <span class="hint">{instance.url}</span>
      </div>
      <button onClick={onOpenPreferences}>Preferences</button>
      <button onClick={onSwitch}>Switch instance</button>
    </div>
  );
}
