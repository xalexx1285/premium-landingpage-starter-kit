import { FadeUp } from "./FadeUp";

export function MaskedReveal({ text, className = "" }: { text: string; className?: string }) {
  return (
    <div className={className} aria-label={text}>
      {text.split(" ").map((word, index) => (
        <span className="masked-word" aria-hidden="true" key={`${word}-${index}`}>
          <FadeUp as="span" delay={index * 45} className="masked-word-inner">
            {word}&nbsp;
          </FadeUp>
        </span>
      ))}
    </div>
  );
}
