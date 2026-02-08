import type { ChatModelAdapter } from "@assistant-ui/react";

const RESPONSES = [
  "Hello! I'm a test assistant. How can I help you today?",
  "That's a great question! Let me think about that for a moment. The answer involves several considerations that we should explore together.",
  "I appreciate you sharing that. Here are a few thoughts:\n\n1. **First point** — this is an important consideration\n2. **Second point** — we should also keep this in mind\n3. **Third point** — and finally, this ties everything together\n\nWould you like me to elaborate on any of these?",
  "Interesting! I'm just a mock assistant for testing UX primitives, but I'm happy to keep the conversation going. Try sending another message to see how the composer states change.",
  "Here's a longer response to test scrolling behavior and message rendering.\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\nThis helps us verify that the thread auto-scroll and message parts render correctly.",
];

let responseIndex = 0;

export const mockModelAdapter: ChatModelAdapter = {
  async *run({ abortSignal }) {
    const text = RESPONSES[responseIndex % RESPONSES.length]!;
    responseIndex++;

    // Simulate streaming by yielding one character at a time
    for (let i = 0; i < text.length; i++) {
      if (abortSignal.aborted) return;
      await new Promise((r) => setTimeout(r, 15));
      yield {
        content: [{ type: "text" as const, text: text.slice(0, i + 1) }],
      };
    }
  },
};
