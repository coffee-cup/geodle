import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { GuessInput } from "@/components/GuessInput";

describe("GuessInput", () => {
  it("shows placeholder when enabled", () => {
    render(<GuessInput onSubmit={vi.fn()} disabled={false} />);
    expect(screen.getByPlaceholderText("Type a country name...")).toBeInTheDocument();
  });

  it("shows disabled placeholder when game over", () => {
    render(<GuessInput onSubmit={vi.fn()} disabled={true} />);
    const input = screen.getByPlaceholderText("Game over");
    expect(input).toBeDisabled();
  });
});
