import type {
  RegistrationOptions,
  RegistrationTarget,
} from "../domain/instance";

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
  return (
    <fieldset>
      <legend>Register in</legend>
      {options !== null && !options.privateIndexExists && (
        <p class="warning">
          Your profile has no private type index yet. Solid Memo can create
          one (recommended), or register in your public type index instead —
          public registrations are visible to anyone who can read your
          profile.
        </p>
      )}
      <label>
        <input
          type="radio"
          name="registration-target"
          checked={value === "private"}
          onChange={() => onChange("private")}
        />
        Private type index
        {options !== null && !options.privateIndexExists
          ? " (will be created)"
          : ""}
      </label>
      <label>
        <input
          type="radio"
          name="registration-target"
          checked={value === "public"}
          onChange={() => onChange("public")}
        />
        Public type index
        {options !== null && !options.publicIndexExists
          ? " (will be created)"
          : ""}
      </label>
    </fieldset>
  );
}
