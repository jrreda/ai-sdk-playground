import { streamText, UIMessage, convertToModelMessages } from "ai";
import { huggingface } from "@ai-sdk/huggingface";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: huggingface("Qwen/Qwen2.5-VL-3B-Instruct"),
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion:", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}