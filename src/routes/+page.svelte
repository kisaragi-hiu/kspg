<script>
  import Pages from "$lib/components/Pages.svelte";
  import { writable } from "svelte/store";

  const store = writable(1);
</script>

<h1>Welcome to your library project</h1>
<p>
  Create your package using @sveltejs/package and preview/showcase your work
  with SvelteKit
</p>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>

<Pages pageCount={3} currentPage={1} template={"https://example.com?p={0}"} />
<Pages pageCount={3} currentPage={store} />
