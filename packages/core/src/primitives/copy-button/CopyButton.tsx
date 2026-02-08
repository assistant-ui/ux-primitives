"use client";

import { ActionBarPrimitive } from "@assistant-ui/react";
import { CopyButtonVisual } from "./CopyButtonVisual";
import {
  DEFAULT_BUTTON_CLASSNAME,
  DEFAULT_ICON_CLASSNAME,
} from "./defaults";

/**
 * A single-component replacement for the copy-message pattern.
 *
 * Wraps `ActionBarPrimitive.Copy` which handles:
 * - Clipboard API call
 * - `data-copied` attribute (set for `copiedDuration` ms after copy)
 * - Auto-disabled when there's no copyable content
 *
 * The default visual swaps between CopyIcon and CheckIcon
 * using the `data-copied` attribute on the parent button.
 *
 * Must be rendered inside a message context (e.g. within MessagePrimitive.Root).
 *
 * ---
 * MIGRATION NOTE (tap/store):
 *
 * Currently this component does NOT read `isCopied` from any hook.
 * Instead it relies on `ActionBarPrimitive.Copy` setting `data-copied`
 * on the DOM element, and Tailwind's `group-data-[copied]` variant
 * in CopyButtonVisual for the icon toggle.
 *
 * When the Store API is available on npm, we could optionally switch to:
 *   `const isCopied = useAuiState(({ message }) => message.isCopied);`
 * and pass it to `CopyButtonVisual` as a prop.
 * This would also allow the `renderVisual` prop to receive `isCopied` as a boolean.
 *
 * The current Tailwind-only approach is simpler and has zero hook dependencies,
 * so migration is optional — only needed if we want JS-driven visuals
 * (e.g. animations, render-prop with boolean state).
 */
export function CopyButton({
  /**
   * Class applied to the inner visual (icon).
   */
  className,
  /**
   * Class applied to the button wrapper.
   */
  buttonClassName,
  /**
   * Duration in ms to show the "copied" state.
   * @default 3000
   */
  copiedDuration,
  /**
   * Optional custom visual renderer.
   * Receives the `data-copied` state cannot be read here;
   * use CSS `[data-copied] &` selectors or provide both icons.
   */
  renderVisual,
}: {
  className?: string;
  buttonClassName?: string;
  copiedDuration?: number;
  renderVisual?: () => React.ReactNode;
}) {
  const visual = renderVisual ? (
    renderVisual()
  ) : (
    <CopyButtonVisual className={className ?? DEFAULT_ICON_CLASSNAME} />
  );

  return (
    <ActionBarPrimitive.Copy
      copiedDuration={copiedDuration}
      className={buttonClassName ?? DEFAULT_BUTTON_CLASSNAME}
    >
      {visual}
    </ActionBarPrimitive.Copy>
  );
}
