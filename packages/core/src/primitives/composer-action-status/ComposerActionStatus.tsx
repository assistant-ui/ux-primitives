import { ComposerActionVisual } from "./ComposerActionVisual";
import {
  ComposerActionState,
  deriveComposerActionState,
} from "./deriveComposerActionState";
import { ComposerPrimitive, useThread } from "@assistant-ui/react";

export function ComposerActionStatus({
  /**
   * Class applied to inner visual (Icon)
   */
  className,
  /**
   * Class applied to the action button wrapper (Send / Cancel).
   */
  buttonClassName,
  /**
   * Optional custom visual renderer.
   * If provided, replaces the default icons.
   */
  renderVisual,
}: {
  className?: string;
  buttonClassName?: string;
  renderVisual?: (state: ComposerActionState) => React.ReactNode;
}) {
  /**
   * NOTE:
   * `useThread` is deprecated in favor of `useAuiState(({ thread }) => thread)`,
   * but the replacement relies on store APIs that are not yet published to npm
   *
   * We intentionally use `useThread` here to remain compatible with the
   * currently released @assistant-ui packages.
   *
   * This can be migrated internally once the Store version is aligned.
   */
  const thread = useThread();

  const state = deriveComposerActionState({
    isRunning: thread.isRunning,
    isEditing: thread.isEditing,
    isEmpty: thread.isEmpty,
  });

  const visual = renderVisual ? (
    renderVisual(state)
  ) : (
    <ComposerActionVisual state={state} className={className} />
  );

  if (state === "running") {
    return (
      <ComposerPrimitive.Cancel className={buttonClassName}>
        {visual}
      </ComposerPrimitive.Cancel>
    );
  }

  if (state === "composing") {
    return (
      <ComposerPrimitive.Send className={buttonClassName}>
        {visual}
      </ComposerPrimitive.Send>
    );
  }

  return visual;
}
