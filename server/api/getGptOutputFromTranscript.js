import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const messages = [
    { role: "system", content: body.prompt },
    { role: "user", content: body.transcript },
  ];

  const completion = await openai.chat.completions.create({
    messages: messages,
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
  let gptOutput = completion.choices[0].message.content;
  console.log(gptOutput);

  return {
    gptOutput,
  };
});
