import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

/**
 * Default visual for CopyButton.
 *
 * Shows CopyIcon by default and CheckIcon when the parent button
 * has `data-copied` attribute (set by ActionBarPrimitive.Copy).
 *
 * Uses Tailwind's `group-data-[copied]` variant to toggle visibility:
 * - CopyIcon: visible by default, hidden when parent has [data-copied]
 * - CheckIcon: hidden by default, shown when parent has [data-copied]
 *
 * Requires the parent button to have the `group` class.
 */
export function CopyButtonVisual({ className }: { className?: string }) {
  return (
    <>
      <CopyIcon className={`${className ?? ""} group-data-[copied]:hidden`} />
      <CheckIcon
        className={`${className ?? ""} hidden group-data-[copied]:block`}
      />
    </>
  );
}
