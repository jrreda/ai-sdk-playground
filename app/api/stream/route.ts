import { huggingface } from "@ai-sdk/huggingface";
import { streamText } from "ai";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const result = streamText({
      model: huggingface('deepseek-ai/DeepSeek-V3-0324'),
      prompt,
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error(`Error generating text: ${error}`);
    return Response.json({ error: 'Failed to generate text' }, { status: 500 });
  }
}