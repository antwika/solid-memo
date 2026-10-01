import { isHttpUrl } from "@solid-memo/domain/webId";
import type { LangText } from "@solid-memo/domain/langText";
import { breakable } from "./breakable";
import { useI18n } from "./i18n";

/**
 * One side of a card as it looks in study: its picture (if any) above its
 * text (if any), with the back's label above its text and the side's
 * note under it, both smaller. A question's note is passed only once the
 * answer is revealed. A picture URL comes from pod data, so only http(s) URLs
 * are loaded; anything else is named rather than shown.
 *
 * The face is sized by its role — the question large, the answer under
 * it smaller — not by which side it is, so a deck studied back-to-front
 * looks like any other. Without a role, the front asks and the back
 * answers.
 */
export function CardFace({
  side,
  role = side === "front" ? "question" : "answer",
  text,
  imageUrl,
  label,
  note,
}: {
  side: "front" | "back";
  role?: "question" | "answer";
  text: string;
  imageUrl?: string;
  /** How the back relates to the front, e.g. "Replaced by", in the reader's language. */
  label?: LangText;
  /** What holds of this side, e.g. "Out of use", in the reader's language. */
  note?: LangText;
}) {
  const { t, readerText } = useI18n();
  return (
    <div class={`card-face card-${side} card-${role}`}>
      {imageUrl !== undefined &&
        (isHttpUrl(imageUrl) ? (
          <img
            class="card-image"
            src={imageUrl}
            alt={
              text === ""
                ? side === "front"
                  ? t("cardFace.frontPictureAlt")
                  : t("cardFace.backPictureAlt")
                : ""
            }
          />
        ) : (
          <p class="hint">{t("cardFace.notWebUrl")}</p>
        ))}
      {label !== undefined && <p class="card-label">{breakable(readerText(label))}</p>}
      {text !== "" && <p>{breakable(text)}</p>}
      {note !== undefined && <p class="card-note">{breakable(readerText(note))}</p>}
    </div>
  );
}

/** A card's picture at list size, e.g. beside its text in a Browser row. */
export function CardThumbnail({ imageUrl }: { imageUrl?: string }) {
  if (imageUrl === undefined || !isHttpUrl(imageUrl)) return null;
  return <img class="card-thumbnail" src={imageUrl} alt="" />;
}
