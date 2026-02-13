interface SilhouetteProps {
  svg: string;
}

export function Silhouette({ svg }: SilhouetteProps) {
  return (
    <div
      className="w-full max-w-sm mx-auto text-ink [&>svg]:w-full [&>svg]:h-auto"
      role="img"
      aria-label="Country silhouette"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
