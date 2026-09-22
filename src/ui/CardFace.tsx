import { isHttpUrl } from "../domain/webId";

/**
 * One side of a card as it looks in study: its picture (if any) above its
 * text (if any). A picture URL comes from pod data, so only http(s) URLs
 * are loaded; anything else is named rather than shown.
 */
export function CardFace({
  side,
  text,
  imageUrl,
}: {
  side: "front" | "back";
  text: string;
  imageUrl?: string;
}) {
  return (
    <div class={`card-face card-${side}`}>
      {imageUrl !== undefined &&
        (isHttpUrl(imageUrl) ? (
          <img
            class="card-image"
            src={imageUrl}
            // With text beside it the picture needs no second description.
            alt={text === "" ? `Picture on the ${side} of the card` : ""}
          />
        ) : (
          <p class="hint">Picture not shown: its address is not a web URL.</p>
        ))}
      {text !== "" && <p>{text}</p>}
    </div>
  );
}

/** A card's picture at list size, e.g. beside its text in a Browser row. */
export function CardThumbnail({ imageUrl }: { imageUrl?: string }) {
  if (imageUrl === undefined || !isHttpUrl(imageUrl)) return null;
  return <img class="card-thumbnail" src={imageUrl} alt="" />;
}
