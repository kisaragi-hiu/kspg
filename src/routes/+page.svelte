<script>
  import "../src.css";

  import Pages from "$lib/components/Pages.svelte";
  import { writable } from "svelte/store";
  import { page } from "$app/stores";
  import { parsePageParam } from "$lib/index";
  import { redirect } from "@sveltejs/kit";

  const store = writable(1);
  $: pageNumberFromUrl = parsePageParam($page.url.searchParams.get("p"));
  if (pageNumberFromUrl === false) {
    throw redirect(307, "/");
  }

  console.log(`page: ${pageNumberFromUrl}`);
</script>

<div class="prose mx-auto mt-16 w-[95%] max-w-[40rem]">
  <h1>kspg</h1>
  <p>Kisaragi's Svelte Pagination component.</p>
  <h2>URL-based pagination</h2>
  <Pages pageCount={10} currentPage={pageNumberFromUrl} template={"/?p={0}"} />
  <h2>Client side store-based pagination</h2>
  Store value:<code>{$store}</code>
  <Pages pageCount={10} currentPage={store} />
</div>
