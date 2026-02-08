import { ArrowUpIcon, StopIcon } from "@radix-ui/react-icons";
import type { ComposerActionState } from "./deriveComposerActionState";

export function ComposerActionVisual({
  state,
  className,
}: {
  state: ComposerActionState;
  className?: string;
}) {
  switch (state) {
    case "running":
      return <StopIcon className={className} />;
    case "composing":
    default:
      return <ArrowUpIcon className={className} />;
  }
}
