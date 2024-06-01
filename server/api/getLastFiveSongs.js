const baseUrl = "http://localhost:3000";
const url = `${baseUrl}/api/custom_generate`;

export default defineEventHandler(async (event) => {
  return {
    lastFiveSongs: [new Array(5).fill("example url")],
  };
});
