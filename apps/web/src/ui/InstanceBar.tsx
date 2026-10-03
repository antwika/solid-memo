import type { Instance } from "@solid-memo/domain/instance";
import { ExternalLink } from "./ExternalLink";
import { useI18n } from "./i18n";

/** Persistent bar showing which instance the user is working in. */
export function InstanceBar({
  instance,
  onSwitch,
  onOpenPreferences,
  onOpenStatistics,
}: {
  instance: Instance;
  onSwitch: () => void;
  onOpenPreferences: () => void;
  onOpenStatistics: () => void;
}) {
  const { t } = useI18n();
  return (
    <div class="instance-bar">
      <div class="instance-bar-identity">
        <strong>{instance.name}</strong>
        <ExternalLink url={instance.url} class="hint" />
      </div>
      <button onClick={onOpenStatistics}>{t("instanceBar.statistics")}</button>
      <button onClick={onOpenPreferences}>{t("instanceBar.preferences")}</button>
      <button onClick={onSwitch}>{t("instanceBar.switch")}</button>
    </div>
  );
}
