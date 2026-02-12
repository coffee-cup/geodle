const R = 6371; // Earth radius in km

export function haversine(
  a: [lon: number, lat: number],
  b: [lon: number, lat: number],
): number {
  const [lon1, lat1] = a.map(toRad);
  const [lon2, lat2] = b.map(toRad);

  const dlat = lat2 - lat1;
  const dlon = lon2 - lon1;

  const h =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(h));
}

export function bearing(
  a: [lon: number, lat: number],
  b: [lon: number, lat: number],
): number {
  const [lon1, lat1] = a.map(toRad);
  const [lon2, lat2] = b.map(toRad);
  const dlon = lon2 - lon1;

  const y = Math.sin(dlon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dlon);

  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

const DIRECTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"] as const;

export function compassDirection(degrees: number): string {
  const index = Math.round(degrees / 45) % 8;
  return DIRECTIONS[index];
}

const DIRECTION_ARROWS: Record<string, string> = {
  N: "⬆️",
  NE: "↗️",
  E: "➡️",
  SE: "↘️",
  S: "⬇️",
  SW: "↙️",
  W: "⬅️",
  NW: "↖️",
};

export function directionArrow(direction: string): string {
  return DIRECTION_ARROWS[direction] ?? "📍";
}

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function toDeg(rad: number) {
  return (rad * 180) / Math.PI;
}
