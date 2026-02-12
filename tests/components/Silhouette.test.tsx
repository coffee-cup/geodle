import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Silhouette } from "@/components/Silhouette";

const mockGeometry: GeoJSON.Geometry = {
  type: "Polygon",
  coordinates: [
    [
      [0, 0],
      [10, 0],
      [10, 10],
      [0, 10],
      [0, 0],
    ],
  ],
};

describe("Silhouette", () => {
  it("renders an SVG with a non-empty path", () => {
    const { container } = render(<Silhouette geometry={mockGeometry} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();

    const path = container.querySelector("path");
    expect(path).toBeInTheDocument();
    expect(path?.getAttribute("d")).toBeTruthy();
    expect(path?.getAttribute("d")?.length).toBeGreaterThan(0);
  });
});
