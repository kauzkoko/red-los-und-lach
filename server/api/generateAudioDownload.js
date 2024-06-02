const baseUrl = "http://localhost:3000";
const url = `${baseUrl}/api/get`;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);
  let finalUrl = url + "?ids=" + body.id;
  console.log(finalUrl);
  let test =
    "http://localhost:3000/api/get?ids=d9e083d5-7e97-42d9-9546-0a7f8831778e";
  const songs = await $fetch(test, { headers: { Accept: "application/json" } });
  console.log(songs);
  return {
    songs,
  };
});
