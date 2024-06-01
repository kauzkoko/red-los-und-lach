const baseUrl = "http://localhost:3000";
const url = `${baseUrl}/api/get`;

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const songs = await fetch(url, { ids: body.ids });
  console.log(songs);
  // const audioUrl = songs[0].audioUrl;
  // return {
  //   audioUrl,
  // };
});
