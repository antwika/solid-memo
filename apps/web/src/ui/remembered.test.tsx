import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/preact";
import { forget, useRemembered } from "./remembered";

function Counter({ memoryKey }: { memoryKey: string }) {
  const [count, setCount] = useRemembered(memoryKey, 0);
  return <button onClick={() => setCount((n) => n + 1)}>{count}</button>;
}

describe("useRemembered", () => {
  it("starts from the initial value", () => {
    render(<Counter memoryKey="fresh" />);
    expect(screen.getByRole("button")).toHaveTextContent("0");
  });

  it("brings the value back when a component asks for its key again", () => {
    const first = render(<Counter memoryKey="kept" />);
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByRole("button"));
    first.unmount();
    render(<Counter memoryKey="kept" />);
    expect(screen.getByRole("button")).toHaveTextContent("2");
  });

  it("keeps each key's value apart", () => {
    const first = render(<Counter memoryKey="one" />);
    fireEvent.click(screen.getByRole("button"));
    first.unmount();
    render(<Counter memoryKey="two" />);
    expect(screen.getByRole("button")).toHaveTextContent("0");
  });

  it("starts afresh once the key is forgotten", () => {
    const first = render(<Counter memoryKey="dropped" />);
    fireEvent.click(screen.getByRole("button"));
    first.unmount();
    forget("dropped");
    render(<Counter memoryKey="dropped" />);
    expect(screen.getByRole("button")).toHaveTextContent("0");
  });
});
