import { useMemo } from "react";
import { geoPath, geoMercator } from "d3-geo";
import type { Geometry } from "geojson";

interface SilhouetteProps {
  geometry: Geometry;
  width?: number;
  height?: number;
}

export function Silhouette({
  geometry,
  width = 400,
  height = 400,
}: SilhouetteProps) {
  const pathD = useMemo(() => {
    const feature = {
      type: "Feature" as const,
      geometry,
      properties: {},
    };

    const projection = geoMercator().fitSize([width, height], feature);
    const path = geoPath(projection);
    return path(feature) ?? "";
  }, [geometry, width, height]);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full max-w-sm mx-auto"
      role="img"
      aria-label="Country silhouette"
    >
      <path d={pathD} fill="currentColor" className="text-stone-800" />
    </svg>
  );
}
