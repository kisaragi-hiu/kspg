// Reexport your entry components here

import P from "./components/Pages.svelte";
export default P;
export const Pages = P;

/**
 * Parse the page param into a valid integer.
 * If the param is not present (=== null), treat it as page 1.
 * If the param is not valid, return false.
 * Note that page numbers are 1-based.
 * @param param {string | null} - the value of the url param
 * @param maximum {number} - the maximum number of pages
 */
export function parsePageParam(param, maximum) {
  const p = Number(param);
  // Param not present = page 1
  if (param === null) {
    return 1;
  } else if (!param || !p || p > maximum || p < 1 || !Number.isInteger(p)) {
    return false;
  } else {
    return p;
  }
}
