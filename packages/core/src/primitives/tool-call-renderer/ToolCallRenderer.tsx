"use client";

import { useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import type { ToolCallMessagePartComponent } from "@assistant-ui/react";
import { ToolCallStatusIcon } from "./ToolCallStatusIcon";
import type { ToolCallStatusState } from "./ToolCallStatusIcon";
import {
  DEFAULT_ROOT_CLASSNAME,
  DEFAULT_HEADER_CLASSNAME,
  DEFAULT_TOOL_NAME_CLASSNAME,
  DEFAULT_TOGGLE_CLASSNAME,
  DEFAULT_BODY_CLASSNAME,
  DEFAULT_SECTION_LABEL_CLASSNAME,
  DEFAULT_PRE_CLASSNAME,
  DEFAULT_ERROR_CLASSNAME,
} from "./defaults";

function deriveState(
  statusType: string,
  isError: boolean | undefined,
): ToolCallStatusState {
  if (statusType === "running") return "running";
  if (statusType === "complete" && isError) return "error";
  if (statusType === "complete") return "complete";
  return "incomplete";
}

function formatValue(value: unknown): string {
  if (typeof value === "string") return value;
  return JSON.stringify(value, null, 2);
}

function formatArgs(argsText: string): string {
  try {
    return JSON.stringify(JSON.parse(argsText), null, 2);
  } catch {
    return argsText;
  }
}

/**
 * A single-component fallback renderer for any tool call.
 *
 * Handles all tool call states automatically:
 * - running   - spinner
 * - complete  - green checkmark + result
 * - error     - red icon + error message
 * - incomplete - warning icon
 *
 * Use directly as the `Fallback` in MessagePrimitive.Parts tools config:
 *
 * ```tsx
 * <MessagePrimitive.Parts
 *   components={{ tools: { Fallback: ToolCallRenderer } }}
 * />
 * ```
 *
 * ---
 * TODO: migrate to store
 */
export const ToolCallRenderer: ToolCallMessagePartComponent = ({
  toolName,
  argsText,
  result,
  isError,
  status,
}) => {
  const [expanded, setExpanded] = useState(false);
  const state = deriveState(status.type, isError);
  const hasBody = Boolean(argsText) || result !== undefined;

  return (
    <div className={DEFAULT_ROOT_CLASSNAME}>
      {/* Header — always visible */}
      <div
        className={DEFAULT_HEADER_CLASSNAME}
        onClick={() => hasBody && setExpanded((v) => !v)}
        role={hasBody ? "button" : undefined}
        aria-expanded={hasBody ? expanded : undefined}
      >
        <ToolCallStatusIcon state={state} />
        <span className={DEFAULT_TOOL_NAME_CLASSNAME}>{toolName}</span>
        {hasBody && (
          <ChevronDownIcon
            className={`${DEFAULT_TOGGLE_CLASSNAME} ${expanded ? "rotate-180" : ""}`}
          />
        )}
      </div>

      {/* Collapsible body */}
      {expanded && hasBody && (
        <div className={DEFAULT_BODY_CLASSNAME}>
          {argsText && (
            <div>
              <p className={DEFAULT_SECTION_LABEL_CLASSNAME}>Arguments</p>
              <pre className={DEFAULT_PRE_CLASSNAME}>
                {formatArgs(argsText)}
              </pre>
            </div>
          )}

          {result !== undefined && (
            <div>
              <p className={DEFAULT_SECTION_LABEL_CLASSNAME}>
                {isError ? "Error" : "Result"}
              </p>
              {isError ? (
                <p className={DEFAULT_ERROR_CLASSNAME}>{formatValue(result)}</p>
              ) : (
                <pre className={DEFAULT_PRE_CLASSNAME}>
                  {formatValue(result)}
                </pre>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
