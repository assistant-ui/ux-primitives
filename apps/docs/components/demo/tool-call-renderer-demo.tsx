"use client";

import {
  AssistantRuntimeProvider,
  MessagePrimitive,
  ThreadPrimitive,
  useLocalRuntime,
} from "@assistant-ui/react";
import { ToolCallRenderer } from "@assistant-ui/ux-primitives";
import { DemoWrapper } from "./demo-wrapper";
import type { ChatModelAdapter } from "@assistant-ui/react";

let callCount = 0;

const demoAdapter: ChatModelAdapter = {
  async *run({ abortSignal }) {
    callCount++;
    const toolCallId = `call_${callCount}`;

    // Phase 1: tool call running
    yield {
      content: [
        {
          type: "tool-call" as const,
          toolCallId,
          toolName: "get_weather",
          args: { location: "Paris, France", units: "celsius" },
          argsText: JSON.stringify({
            location: "Paris, France",
            units: "celsius",
          }),
        },
      ],
    };

    await new Promise((r) => setTimeout(r, 1000));
    if (abortSignal.aborted) return;

    // Phase 2: tool call complete + text
    yield {
      content: [
        {
          type: "tool-call" as const,
          toolCallId,
          toolName: "get_weather",
          args: { location: "Paris, France", units: "celsius" },
          argsText: JSON.stringify({
            location: "Paris, France",
            units: "celsius",
          }),
          result: { temperature: 22, condition: "Sunny", humidity: "45%" },
        },
        {
          type: "text" as const,
          text: "The weather in Paris is 22°C and sunny.",
        },
      ],
    };
  },
};

export function ToolCallRendererDemo() {
  const runtime = useLocalRuntime(demoAdapter);

  return (
    <DemoWrapper>
      <AssistantRuntimeProvider runtime={runtime}>
        <ThreadPrimitive.Root className="flex h-[380px] flex-col rounded-xl border border-zinc-800 bg-zinc-950 text-white">
          <div className="relative min-h-0 flex-1">
            <ThreadPrimitive.Viewport className="flex h-full flex-col gap-2 overflow-y-auto px-4 pt-4 pb-4">
              <ThreadPrimitive.Messages
                components={{
                  UserMessage: DemoUserMessage,
                  AssistantMessage: DemoAssistantMessage,
                }}
              />
            </ThreadPrimitive.Viewport>
          </div>
          <div className="border-t border-zinc-800 px-4 py-2">
            <ThreadPrimitive.If running={false}>
              <ThreadPrimitive.Suggestion
                prompt="What's the weather in Paris?"
                send
                className="w-full rounded-lg bg-white/5 px-3 py-2 text-left text-sm text-white/60 hover:bg-white/10 transition-colors"
              >
                Send a message to trigger the tool call demo →
              </ThreadPrimitive.Suggestion>
            </ThreadPrimitive.If>
          </div>
        </ThreadPrimitive.Root>
      </AssistantRuntimeProvider>
    </DemoWrapper>
  );
}

function DemoUserMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-end">
      <div className="max-w-[70%] rounded-2xl bg-white/10 px-4 py-2 text-sm text-white/90">
        <MessagePrimitive.Content />
      </div>
    </MessagePrimitive.Root>
  );
}

function DemoAssistantMessage() {
  return (
    <MessagePrimitive.Root className="flex gap-2">
      <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-white/15 text-[10px]">
        A
      </div>
      <div className="flex-1 pt-0.5">
        <MessagePrimitive.Parts
          components={{
            Text: ({ text }) => (
              <span className="text-sm text-white/90">{text}</span>
            ),
            tools: { Fallback: ToolCallRenderer },
          }}
        />
      </div>
    </MessagePrimitive.Root>
  );
}
