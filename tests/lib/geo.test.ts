import { describe, it, expect } from "vitest";
import { haversine, bearing, compassDirection } from "@/lib/geo";

describe("haversine", () => {
  it("London to Paris ≈ 343km", () => {
    const london: [number, number] = [-0.1276, 51.5074];
    const paris: [number, number] = [2.3522, 48.8566];
    const dist = haversine(london, paris);
    expect(dist).toBeGreaterThan(330);
    expect(dist).toBeLessThan(360);
  });

  it("same point = 0km", () => {
    const point: [number, number] = [10, 20];
    expect(haversine(point, point)).toBe(0);
  });

  it("NYC to Tokyo ≈ 10,838km", () => {
    const nyc: [number, number] = [-74.006, 40.7128];
    const tokyo: [number, number] = [139.6917, 35.6895];
    const dist = haversine(nyc, tokyo);
    expect(dist).toBeGreaterThan(10700);
    expect(dist).toBeLessThan(11000);
  });
});

describe("bearing", () => {
  it("due east ≈ 90°", () => {
    const a: [number, number] = [0, 0];
    const b: [number, number] = [10, 0];
    const b1 = bearing(a, b);
    expect(b1).toBeGreaterThan(85);
    expect(b1).toBeLessThan(95);
  });

  it("due north ≈ 0°", () => {
    const a: [number, number] = [0, 0];
    const b: [number, number] = [0, 10];
    const b1 = bearing(a, b);
    expect(b1).toBeLessThan(5);
  });
});

describe("compassDirection", () => {
  it("0° → N", () => expect(compassDirection(0)).toBe("N"));
  it("90° → E", () => expect(compassDirection(90)).toBe("E"));
  it("180° → S", () => expect(compassDirection(180)).toBe("S"));
  it("270° → W", () => expect(compassDirection(270)).toBe("W"));
  it("45° → NE", () => expect(compassDirection(45)).toBe("NE"));
  it("315° → NW", () => expect(compassDirection(315)).toBe("NW"));
});
