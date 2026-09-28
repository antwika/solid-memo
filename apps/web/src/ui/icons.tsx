import type { ComponentChildren } from "preact";
/** Trash-bin icon; decorative only — the button provides the label. */
export function TrashIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M3 6h18" />
      <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
    </svg>
  );
}

/** Shared frame for the small inline icons next to titles and names. */
function Icon({ children }: { children: ComponentChildren }) {
  return (
    <svg
      class="icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** A collection: several decks stacked — the "Decks" list. */
export function CollectionIcon() {
  return (
    <Icon>
      <rect x="3" y="12" width="18" height="8" rx="2" />
      <path d="M5 12V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </Icon>
  );
}

/** A deck: a fanned pile of cards. */
export function DeckIcon() {
  return (
    <Icon>
      <rect x="7" y="8" width="13" height="13" rx="2" />
      <path d="M4 16V6a2 2 0 0 1 2-2h9" />
    </Icon>
  );
}

/** The Browser: a card with a magnifying glass. */
export function BrowserIcon() {
  return (
    <Icon>
      <rect x="3" y="4" width="14" height="16" rx="2" />
      <path d="M7 9h6M7 13h4" />
      <circle cx="17" cy="16" r="3" />
      <path d="m19.5 18.5 2 2" />
    </Icon>
  );
}

/** A single card: front and back. */
export function CardIcon() {
  return (
    <Icon>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 12h18" />
      <path d="M8 8.5h4M8 15.5h6" />
    </Icon>
  );
}

/** A checkmark: done for today. */
export function CheckIcon() {
  return (
    <Icon>
      <path d="m5 12 5 5L20 7" />
    </Icon>
  );
}

/** The deck library: books on a shelf. */
export function LibraryIcon() {
  return (
    <Icon>
      <path d="M4 4h4v16H4zM10 4h4v16h-4z" />
      <path d="m16 5 4-1 4 15-4 1z" transform="translate(-2 0)" />
    </Icon>
  );
}
