<script>
  import format from "pupa";
  import { onDestroy } from "svelte";

  export let centerTitle = "Go to page 1";

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
    container: "join mb-4 flex justify-center",
    center: "join-item btn w-[8ch]",
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
  $: if (typeof currentPage === "number") {
    _currentPageNumber = currentPage;
  } else {
    _unsubscribe = currentPage.subscribe(
      (newPage) => (_currentPageNumber = newPage)
    );
    onDestroy(_unsubscribe);
  }
  $: previousClasses =
    _currentPageNumber <= 1
      ? `${classes.previous} ${classes.disabled}`
      : classes.previous;
  $: nextClasses =
    _currentPageNumber >= pageCount
      ? `${classes.next} ${classes.disabled}`
      : classes.next;
</script>

<div class={classes.container}>
  {#if typeof currentPage === "number"}
    <a
      href={format(template, [Math.max(_currentPageNumber - 1, 1)])}
      class={previousClasses}>«</a
    >
    <a class={classes.center} href={format(template, [1])} title={centerTitle}
      >{_currentPageNumber}/{pageCount}</a
    >
    <a
      href={format(template, [Math.min(_currentPageNumber + 1, pageCount)])}
      class={nextClasses}>»</a
    >
  {:else}
    <button
      class={previousClasses}
      on:click={() => {
        currentPage.set(Math.max(_currentPageNumber - 1, 1));
        top();
      }}>«</button
    >
    <button
      class={classes.center}
      title={centerTitle}
      on:click={() => {
        currentPage.set(1);
        top();
      }}>{_currentPageNumber}/{pageCount}</button
    >
    <button
      class={nextClasses}
      on:click={() => {
        currentPage.set(Math.min(_currentPageNumber + 1, pageCount));
        top();
      }}>»</button
    >
  {/if}
</div>
