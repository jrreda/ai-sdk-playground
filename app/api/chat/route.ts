import { huggingface } from "@ai-sdk/huggingface";
import { streamText, UIMessage, convertToModelMessages } from "ai";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: huggingface('deepseek-ai/DeepSeek-V3-0324'),
      messages: [
        {role: 'system', content: 'You are a helpful coding assistant. Keep responses under 3 sentences and focus on practical examples.'},
        ...modelMessages,
      ],
    });

    // log the usage of the stream
    result.usage.then((usage) => {
      console.log({
        messageCount: messages.length,
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.totalTokens,
      });
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error(`Error streaming chat completion: ${error}`);
    return Response.json({ error: 'Failed to stream chat completion' }, { status: 500 });
  }
}