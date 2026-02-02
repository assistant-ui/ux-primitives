export type ComposerActionState = "idle" | "composing" | "running";

export function deriveComposerActionState({
  isRunning,
  isEditing,
  isEmpty,
}: {
  isRunning: boolean;
  isEditing: boolean;
  isEmpty: boolean;
}): ComposerActionState {
  if (isRunning) return "running";

  if (isEditing && !isEmpty) return "composing";

  return "idle";
}
