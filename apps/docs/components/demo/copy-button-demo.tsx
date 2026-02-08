"use client";

import {
  ThreadPrimitive,
  ComposerPrimitive,
  MessagePrimitive,
} from "@assistant-ui/react";
import { ComposerActionStatus, CopyButton } from "@assistant-ui/ux-primitives";
import { DemoWrapper } from "./demo-wrapper";

export function CopyButtonDemo() {
  return (
    <DemoWrapper>
      <ThreadPrimitive.Root className="flex h-[300px] flex-col rounded-xl border border-zinc-800 bg-zinc-950 text-white">
        <div className="relative min-h-0 flex-1">
          <ThreadPrimitive.Viewport className="flex h-full flex-col gap-4 overflow-y-auto px-4 pt-4 pb-4">
            <ThreadPrimitive.Messages
              components={{ UserMessage: DemoUserMessage, AssistantMessage: DemoAssistantMessage }}
            />
          </ThreadPrimitive.Viewport>
        </div>
        <div className="border-t border-zinc-800 p-3">
          <ComposerPrimitive.Root className="flex items-center rounded-2xl bg-white/5 px-2">
            <ComposerPrimitive.Input
              placeholder="Send a message, then click the copy icon..."
              className="h-10 flex-1 resize-none bg-transparent p-3 text-sm text-white outline-none placeholder:text-white/40"
            />
            <ComposerActionStatus />
          </ComposerPrimitive.Root>
        </div>
      </ThreadPrimitive.Root>
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
    <MessagePrimitive.Root className="group/message flex gap-2">
      <div className="flex size-6 shrink-0 items-center justify-center rounded-full border border-white/15 text-[10px]">A</div>
      <div className="flex-1">
        <div className="text-sm text-white/90"><MessagePrimitive.Content /></div>
        <div className="mt-1 flex items-center gap-1 opacity-0 transition-opacity group-hover/message:opacity-100">
          <CopyButton />
        </div>
      </div>
    </MessagePrimitive.Root>
  );
}
