# kspg

Kisaragi's Svelte Pagination component.

## URL-based pagination

```javascript
// +page.js
import { redirect } from "@sveltejs/kit";
import { parsePageParam } from "kspg";
export function load({ url }) {
  const pageNumberFromUrl = parsePageParam(url.searchParams.get("p"));
  if (pageNumberFromUrl === false) {
    throw redirect(307, "/");
  }
  return {
    pageNumberFromUrl,
  };
}
```

```svelte
<!-- +page.svelte -->
<script>
  export let data;
  let pageNumberFromUrl;
  $: pageNumberFromUrl = data.pageNumberFromUrl;
</script>
<Pages
  pageCount={10}
  currentPage={pageNumberFromUrl}
  template={"/?p={0}"}
/>
```

## Store-based pagination

```svelte
<script>
  import { writable } from "svelte/store";
  const store = writable(1);
</script>
<Pages pageCount={10} currentPage={store} />
```

## Roadmap

- (maybe) Automate publishing
- another style where each page is listed out
- publish demo page to Netlify
- logo
- proper docs
