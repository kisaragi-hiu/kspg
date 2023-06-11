<script>
  import "../src.css";

  import { writable } from "svelte/store";
  import { page } from "$app/stores";
  import { parsePageParam, Pages } from "$lib/index";
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

  <section>
    <h3>Using SvelteKit's client side router</h3>
    <p>
      Using a store is better as you don't have to read the current page from
      the current URL, but this does work.
    </p>
    <Pages
      pageCount={10}
      currentPage={pageNumberFromUrl}
      template={"/?p={0}"}
    />
    <p>
      URL: <code>{$page.url}</code><br />Page number from URL:
      <code>{pageNumberFromUrl}</code>
    </p>
  </section>

  <section>
    <h3>With full reload</h3>
    <p>Like when used in, say, Astro.</p>
    <div data-sveltekit-reload>
      <Pages
        pageCount={10}
        currentPage={pageNumberFromUrl}
        template={"/?p={0}"}
      />
    </div>
    <p>
      URL: <code>{$page.url}</code><br />Page number from URL:
      <code>{pageNumberFromUrl}</code>
    </p>
  </section>

  <h2>Client side store-based pagination</h2>
  <p>Store value:<code>{$store}</code></p>
  <Pages pageCount={10} currentPage={store} />
</div>

<style lang="postcss">
  /* Override daisyUI's default for the demo */
  :global(.btn) {
    @apply no-animation;
  }
</style>
