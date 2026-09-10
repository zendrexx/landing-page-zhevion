/**
 * The DOM contains the first word exactly once. Alternate display words live
 * in data attributes and are painted by CSS, so crawlers and assistive tools
 * receive one stable sentence while the visual line can still change.
 */
export function HeroWordCycle({
  words,
  className = "",
}: {
  words: readonly string[];
  className?: string;
}) {
  const [first = "forward.", second = first, third = first, fourth = first] = words;

  return (
    <span
      className={`hero-word-cycle relative inline-block align-baseline ${className}`}
      data-word-one={first}
      data-word-two={second}
      data-word-three={third}
      data-word-four={fourth}
    >
      <span className="hero-word-reserve">{first}</span>
    </span>
  );
}
