import { redirect } from "@sveltejs/kit";
import { parsePageParam } from "$lib/index";
/** @type {import('./$types').PageLoad} */
export function load({ url }) {
  const pageNumberFromUrl = parsePageParam(url.searchParams.get("p"));
  if (pageNumberFromUrl === false) {
    throw redirect(307, "/");
  }
  return {
    pageNumberFromUrl,
  };
}
