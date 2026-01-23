import { huggingface } from '@ai-sdk/huggingface';
import { generateText } from 'ai';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const { text } = await generateText({
      model: huggingface('deepseek-ai/DeepSeek-V3-0324'),
      prompt,
    });

    return Response.json({ text });
  } catch (error) {
    console.error(`Error generating text: ${error}`);
    return Response.json({ error: 'Failed to generate text' }, { status: 500 });
  }
}
