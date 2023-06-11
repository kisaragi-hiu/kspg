<script>
  import "../src.css";

  import Hl from "./Hl.svelte";

  import { writable } from "svelte/store";
  import { page } from "$app/stores";
  import Pages from "$lib/index";

  const store = writable(1);
  export let data;
  let pageNumberFromUrl;
  $: pageNumberFromUrl = data.pageNumberFromUrl;
</script>

<main class="mx-auto my-16 w-[95%] max-w-[40rem]">
  <div class="prose">
    <h1>kspg</h1>
    <p>Kisaragi's Svelte Pagination component.</p>
    <h2>URL-based pagination</h2>

    <section>
      <h3>Using SvelteKit's client side router</h3>
      <p>
        Using a store is better as you don't have to read the current page from
        the current URL, but this does work.
      </p>

      <p class="text-center">
        URL: <code>{$page.url}</code><br />Page number from URL:
        <code>{pageNumberFromUrl}</code>
      </p>
      <Pages
        pageCount={10}
        currentPage={pageNumberFromUrl}
        template={"/?p={0}"}
      />
      <Hl
        lang="javascript"
        code={`
// +page.js
import { redirect } from "@sveltejs/kit";
import { parsePageParam } from "$lib/index";
export function load({ url }) {
  const pageNumberFromUrl = parsePageParam(url.searchParams.get("p"));
  if (pageNumberFromUrl === false) {
    throw redirect(307, "/");
  }
  return {
    pageNumberFromUrl,
  };
}
`.trim()}
      />
      <Hl
        lang="svelte"
        code={`
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
`.trim()}
      />
    </section>

    <section>
      <h3>With full reload</h3>
      <p>Like when used in, say, Astro.</p>
      <p class="text-center">
        URL: <code>{$page.url}</code><br />Page number from URL:
        <code>{pageNumberFromUrl}</code>
      </p>
      <div data-sveltekit-reload>
        <Pages
          pageCount={10}
          currentPage={pageNumberFromUrl}
          template={"/?p={0}"}
        />
      </div>
      <Hl
        lang="markup"
        code={`
<!-- index.astro -->
---
import { parsePageParam } from "$lib/index";
const pageNumberFromUrl = parsePageParam(Astro.url.searchParams.get("p"));
if (pageNumberFromUrl === false) {
  return Astro.redirect(307, "/");
}
---
<Pages
  pageCount={10}
  currentPage={pageNumberFromUrl}
  template={"/?p={0}"}
/>
`.trim()}
      />
    </section>

    <section>
      <h2>Store-based pagination</h2>
      <p class="text-center">Store value:<code>{$store}</code></p>
      <Pages pageCount={10} currentPage={store} />
      <Hl
        lang="markup"
        code={`
<script>
  import { writable } from "svelte/store";
  const store = writable(1);
</script>
<Pages pageCount={10} currentPage={store} />
`.trim()}
      />
    </section>

    <footer>
      <hr />
      <p>
        By <a class="link text-accent-content" href="https://kisaragi-hiu.com"
          >Kisaragi Hiu</a
        >.
      </p>
    </footer>
  </div>
</main>

<style lang="postcss">
  /* Override daisyUI's default for the demo */
  :global(.btn) {
    @apply no-animation;
  }
</style>
