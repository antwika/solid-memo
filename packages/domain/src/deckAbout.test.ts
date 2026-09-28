import { describe, expect, it } from "vitest";
import type { Deck } from "./deck";
import { parseKeywords, topicsOfDeck, withAbout } from "./deckAbout";

const TOPIC = "https://solid-memo.com/vocab/topics#";
const EDUC = "http://publications.europa.eu/resource/authority/data-theme/EDUC";
const deck: Deck = {
  id: "deck-1",
  url: "https://pod.example/c.ttl#deck-1",
  name: "Capitals",
  cardsDocumentUrl: "https://pod.example/d.ttl",
  reviewsDocumentUrl: "https://pod.example/r.ttl",
  createdAt: "",
  formatVersion: 3,
  direction: "front-to-back",
  authors: [],
  description: "Old.",
  themes: [EDUC, `${TOPIC}geography`],
  keywords: ["old"],
};

describe("topicsOfDeck", () => {
  it("picks the topics among the deck's themes", () => {
    expect(topicsOfDeck(deck)).toEqual([`${TOPIC}geography`]);
    expect(topicsOfDeck({ ...deck, themes: undefined })).toEqual([]);
  });
});

describe("parseKeywords", () => {
  it("splits on commas, trims, drops empty and repeated keywords", () => {
    expect(parseKeywords(" capitals, countries ,, capitals ")).toEqual(["capitals", "countries"]);
    expect(parseKeywords("")).toEqual([]);
  });
});

describe("withAbout", () => {
  it("replaces the description, the topics and the keywords, keeping other themes", () => {
    expect(
      withAbout(deck, { description: "  Every capital. ", topics: [`${TOPIC}languages`], keywords: ["new"] }),
    ).toEqual({ ...deck, description: "Every capital.", themes: [EDUC, `${TOPIC}languages`], keywords: ["new"] });
  });

  it("gives a deck without themes the topics it names", () => {
    expect(withAbout({ ...deck, themes: undefined }, { description: "x", topics: [`${TOPIC}languages`], keywords: [] }).themes).toEqual([
      `${TOPIC}languages`,
    ]);
  });

  it("leaves out themes and keywords when there are none", () => {
    const bare = withAbout({ ...deck, themes: [`${TOPIC}geography`] }, { description: "x", topics: [], keywords: [] });
    expect(bare).not.toHaveProperty("themes");
    expect(bare).not.toHaveProperty("keywords");
  });

  it("refuses an empty description", () => {
    expect(() => withAbout(deck, { description: "  ", topics: [], keywords: [] })).toThrow(
      "A deck needs a description.",
    );
  });
});
