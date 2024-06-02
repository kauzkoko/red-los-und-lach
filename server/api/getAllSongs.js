const baseUrl = "http://localhost:3000";
const url = `${baseUrl}/api/get`;

export default defineEventHandler(async (event) => {
  const result = await $fetch(url);
  return {
    allSongs: result,
  };
});
