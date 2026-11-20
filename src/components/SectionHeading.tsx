interface SectionHeadingProps {
  title: string;
  description?: string;
  /** Use "dark" on cobalt / navy backgrounds */
  tone?: "light" | "dark";
}

export default function SectionHeading({
  title,
  description,
  tone = "light",
}: SectionHeadingProps) {
  const isDark = tone === "dark";
  return (
    <div className="max-w-xl">
      <h2
        className={`font-display text-3xl font-bold tracking-tight sm:text-4xl ${
          isDark ? "text-white" : "text-heading"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-3 text-lg ${isDark ? "text-white/80" : "text-body"}`}>
          {description}
        </p>
      )}
    </div>
  );
}
