import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("lastLyrics", body.gptOutput);

  const messages = [{ role: "user", content: body.gptOutput }];

  const tools = [
    {
      type: "function",
      function: {
        name: "generate_song",
        description: "Create song based on lyrics, genres, and title",
        parameters: {
          type: "object",
          properties: {
            lyrics: {
              type: "string",
              description: "The lyrics of the song",
            },
            genres: {
              type: "string",
              description:
                "The style/genres of the song separated by commas, e.g. pop, rock, country, rap",
            },
            title: {
              type: "string",
              description: "A short title of the song",
            },
          },
          required: ["lyrics", "genres", "title"],
        },
      },
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
    tools: tools,
    tool_choice: { type: "function", function: { name: "generate_song" } },
  });

  let responseMessage = response.choices[0].message;
  console.log("tool calls", responseMessage.tool_calls);

  return {
    functionArguments: responseMessage.tool_calls[0].function.arguments,
  };
});
