"use client";

import {
  AssistantRuntimeProvider,
  useLocalRuntime,
} from "@assistant-ui/react";
import { mockModelAdapter } from "./mock-model-adapter";
import type { ReactNode } from "react";

/**
 * Wraps demo components with a runtime provider.
 * Provides the message/thread context needed by primitives.
 */
export function DemoWrapper({ children }: { children: ReactNode }) {
  const runtime = useLocalRuntime(mockModelAdapter);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      {children}
    </AssistantRuntimeProvider>
  );
}
