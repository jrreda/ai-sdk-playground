import { streamObject} from "ai";
import { recipeSchema } from "./schema";
import { huggingface } from "@ai-sdk/huggingface";

export async function POST(req: Request) {
  try {
    const { dish } = await req.json();
    const result = streamObject({
      model: huggingface('deepseek-ai/DeepSeek-V3-0324'),
      schema: recipeSchema,
      prompt: `Generate a recipe for ${dish}`,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error(`Error generating text: ${error}`);
    return Response.json({ error: 'Failed to generate text' }, { status: 500 });
  }
}