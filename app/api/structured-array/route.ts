import { streamObject } from "ai";
import { pokemonSchema } from "./schema";
import { huggingface } from "@ai-sdk/huggingface";

export async function POST(req: Request) {
  try {
    const { type } = await req.json();

    const result = streamObject({
      model: huggingface('deepseek-ai/DeepSeek-V3-0324'),
      schema: pokemonSchema,
      prompt: `Generate a list of 5 pokemon of type ${type}`,
      output: 'array',
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error(`Error generating pokemon: ${error}`);
    return Response.json({ error: 'Failed to generate pokemon' }, { status: 500 });
  }
}