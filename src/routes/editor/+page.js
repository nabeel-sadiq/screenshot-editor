/** @type {import('./$types').PageServerLoad} */
export async function load({ url }) {
  return {
    image: url.searchParams.get("image") || null,
  };
}
