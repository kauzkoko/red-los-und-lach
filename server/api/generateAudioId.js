const baseUrl = "http://localhost:3000";
const url = `${baseUrl}/api/custom_generate`;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);
  const result = await $fetch(url, {
    method: "post",
    body: {
      prompt: body.prompt,
      tags: body.tags,
      title: body.title,
      make_instrumental: false,
      wait_audio: false,
    },
  });
  console.log(result);

  return {
    songs: result,
  };
});
