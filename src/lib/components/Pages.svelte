<script>
  import format from "pupa";
  import { onDestroy } from "svelte";

  /**
   * The current page number.
   * If this is a store, navigating to another page writes to it.
   * If not, navigation would just be normal links.
   * @type {import("svelte/store").Writable<number> | number}
   */
  export let currentPage;
  /**
   * The total number of pages.
   * @type {number}
   */
  export let pageCount;
  export let classes = {
    previous: "join-item btn",
    next: "join-item btn",
    disabled: "btn-disabled",
  };
  /**
   * The template used to create links to each page.
   * This is a `pupa` template; {0} is the page number.
   * @type {string}
   */
  export let template = "";

  /**
   * @type {number}
   */
  let _currentPageNumber;
  /**
   * @type {import("svelte/store").Unsubscriber}
   */
  let _unsubscribe;
  if (typeof currentPage === "number") {
    _currentPageNumber = currentPage;
  } else {
    _unsubscribe = currentPage.subscribe(
      (newPage) => (_currentPageNumber = newPage)
    );
    onDestroy(_unsubscribe);
  }
</script>

{JSON.stringify(format(template, [1]))}
{#if typeof currentPage === "number"}
  <div class="join mb-4 flex justify-center">
    <a
      href={format(template, [Math.max(_currentPageNumber - 1, 1)])}
      class={classes.previous + _currentPageNumber <= 1
        ? " " + classes.disabled
        : ""}>«</a
    >
    <button
      class="join-item btn w-[8ch]"
      on:click={() => {
        currentPage.set(1);
        top();
      }}>{_currentPageNumber}/{pageCount}</button
    >
    <a
      href={format(template, [Math.min(_currentPageNumber + 1, pageCount)])}
      class={classes.previous + _currentPageNumber >= pageCount
        ? " " + classes.disabled
        : ""}>»</a
    >
  </div>
{:else}
  <div class="join mb-4 flex justify-center">
    <button
      class={classes.previous + _currentPageNumber <= 1
        ? " " + classes.disabled
        : ""}
      on:click={() => {
        currentPage.set(Math.max(_currentPageNumber - 1, 1));
        top();
      }}>«</button
    >
    <button
      class="join-item btn w-[8ch]"
      on:click={() => {
        currentPage.set(1);
        top();
      }}>{_currentPageNumber}/{pageCount}</button
    >
    <button
      class={classes.previous + _currentPageNumber >= pageCount
        ? " " + classes.disabled
        : ""}
      on:click={() => {
        currentPage.set(Math.min(_currentPageNumber + 1, pageCount));
        top();
      }}>»</button
    >
  </div>
{/if}
