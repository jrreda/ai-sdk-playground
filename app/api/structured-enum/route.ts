import { generateObject } from "ai";
import { huggingface } from "@ai-sdk/huggingface";

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const result = generateObject({
      model: huggingface('deepseek-ai/DeepSeek-V3-0324'),
      output: 'enum',
      enum: ['positive', 'negative', 'neutral'],
      prompt: `Classify the sentiment of the text: ${text}`,
    });

    return (await result).toJsonResponse();
  } catch (error) {
    console.error(`Error generating sentiment: ${error}`);
    return Response.json({ error: 'Failed to generate sentiment' }, { status: 500 });
  }
}