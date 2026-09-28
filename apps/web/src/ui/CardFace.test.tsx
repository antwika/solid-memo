import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/preact";
import { CardFace, CardThumbnail } from "./CardFace";

const FLAG = "https://flagcdn.com/af.svg";

describe("CardFace", () => {
  it("shows text alone", () => {
    const { container } = render(<CardFace side="front" text="水" />);
    expect(container.querySelector(".card-face.card-front")).toHaveTextContent(
      "水",
    );
    expect(container.querySelector("img")).toBeNull();
  });

  it("shows a picture alone, described for screen readers", () => {
    render(<CardFace side="back" text="" imageUrl={FLAG} />);
    const image = screen.getByRole("img", {
      name: "Picture on the back of the card",
    });
    expect(image).toHaveAttribute("src", FLAG);
    expect(image).toHaveClass("card-image");
  });

  it("shows a picture above its text, the text being the description", () => {
    const { container } = render(
      <CardFace side="front" text="Afghanistan" imageUrl={FLAG} />,
    );
    const [image, text] = container.querySelector(".card-face")!.children;
    expect(image.tagName).toBe("IMG");
    expect(image).toHaveAttribute("alt", "");
    expect(text).toHaveTextContent("Afghanistan");
  });

  it("names, rather than loads, a picture that is not a web URL", () => {
    const { container } = render(
      <CardFace side="front" text="" imageUrl="javascript:alert(1)" />,
    );
    expect(container.querySelector("img")).toBeNull();
    expect(
      screen.getByText("Picture not shown: its address is not a web URL."),
    ).toBeInTheDocument();
  });
});

describe("CardThumbnail", () => {
  it("renders a small decorative picture for a web URL only", () => {
    const { container, rerender } = render(<CardThumbnail imageUrl={FLAG} />);
    const image = container.querySelector("img.card-thumbnail")!;
    expect(image).toHaveAttribute("src", FLAG);
    expect(image).toHaveAttribute("alt", "");

    rerender(<CardThumbnail imageUrl="data:image/png;base64,AAAA" />);
    expect(container.querySelector("img")).toBeNull();
    rerender(<CardThumbnail />);
    expect(container.querySelector("img")).toBeNull();
  });
});
