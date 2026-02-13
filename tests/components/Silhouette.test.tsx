import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Silhouette } from "@/components/Silhouette";

const mockSvg = `<svg viewBox="0 0 100 100"><path d="M0 0L10 0L10 10L0 10Z" fill="currentColor"/></svg>`;

describe("Silhouette", () => {
  it("renders an SVG with a non-empty path", () => {
    const { container } = render(<Silhouette svg={mockSvg} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();

    const path = container.querySelector("path");
    expect(path).toBeInTheDocument();
    expect(path?.getAttribute("d")).toBeTruthy();
  });
});
