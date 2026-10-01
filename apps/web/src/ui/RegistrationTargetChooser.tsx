import type {
  RegistrationOptions,
  RegistrationTarget,
} from "@solid-memo/domain/instance";
import { useI18n } from "./i18n";

/**
 * Choice between the private and public type index, with the
 * warn-and-choose flow when the private index does not exist yet.
 */
export function RegistrationTargetChooser({
  options,
  value,
  onChange,
}: {
  /** null while the registration options are still loading. */
  options: RegistrationOptions | null;
  value: RegistrationTarget;
  onChange: (target: RegistrationTarget) => void;
}) {
  const { t } = useI18n();
  return (
    <fieldset>
      <legend>{t("registrationTargetChooser.legend")}</legend>
      {options !== null && !options.privateIndexExists && (
        <p class="warning">{t("registrationTargetChooser.noPrivateIndex")}</p>
      )}
      <label>
        <input
          type="radio"
          name="registration-target"
          checked={value === "private"}
          onChange={() => onChange("private")}
        />
        {options !== null && !options.privateIndexExists
          ? t("registrationTargetChooser.privateCreated")
          : t("registrationTargetChooser.private")}
      </label>
      <label>
        <input
          type="radio"
          name="registration-target"
          checked={value === "public"}
          onChange={() => onChange("public")}
        />
        {options !== null && !options.publicIndexExists
          ? t("registrationTargetChooser.publicCreated")
          : t("registrationTargetChooser.public")}
      </label>
    </fieldset>
  );
}
