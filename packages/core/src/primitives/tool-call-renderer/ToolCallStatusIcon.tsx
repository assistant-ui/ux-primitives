import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import {
  DEFAULT_COMPLETE_ICON_CLASSNAME,
  DEFAULT_ERROR_ICON_CLASSNAME,
  DEFAULT_INCOMPLETE_ICON_CLASSNAME,
  DEFAULT_RUNNING_ICON_CLASSNAME,
  DEFAULT_SPINNER_CLASSNAME,
} from "./defaults";

export type ToolCallStatusState = "running" | "complete" | "error" | "incomplete";

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="2"
      />
      <path
        d="M8 2a6 6 0 0 1 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ToolCallStatusIcon({
  state,
  runningClassName,
  completeClassName,
  errorClassName,
  incompleteClassName,
  spinnerClassName,
}: {
  state: ToolCallStatusState;
  runningClassName?: string;
  completeClassName?: string;
  errorClassName?: string;
  incompleteClassName?: string;
  spinnerClassName?: string;
}) {
  if (state === "running") {
    return (
      <span className={runningClassName ?? DEFAULT_RUNNING_ICON_CLASSNAME}>
        <Spinner className={spinnerClassName ?? DEFAULT_SPINNER_CLASSNAME} />
      </span>
    );
  }

  if (state === "complete") {
    return (
      <CheckCircledIcon
        className={`size-3.5 ${completeClassName ?? DEFAULT_COMPLETE_ICON_CLASSNAME}`}
      />
    );
  }

  if (state === "error") {
    return (
      <ExclamationTriangleIcon
        className={`size-3.5 ${errorClassName ?? DEFAULT_ERROR_ICON_CLASSNAME}`}
      />
    );
  }

  // incomplete
  return (
    <StopwatchIcon
      className={`size-3.5 ${incompleteClassName ?? DEFAULT_INCOMPLETE_ICON_CLASSNAME}`}
    />
  );
}
