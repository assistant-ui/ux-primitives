import type { ComposerActionState } from "./deriveComposerActionState";

export function ConposeActionVisual({
  state,
  className,
}: {
  state: ComposerActionState;
  className?: string;
}) {
  if (state === "running") {
    return <div className={className}>running</div>;
  }

  if (state === "composing") {
    return <div className={className}>composing</div>;
  }

  return <div className={className}>idle</div>;
}
