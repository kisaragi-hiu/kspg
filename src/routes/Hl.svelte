<script>
  import "prismjs/themes/prism-solarizedlight.css";

  export let lang = "svelte";
  export let code;

  // Simplified from @vuepress/plugin-prismjs
  // https://github.com/vuepress/vuepress-next/tree/main/ecosystem/plugin-prismjs/src/node
  // Because I couldn't find a coherent documentation for Prism.
  import Prism from "prismjs";
  import "prism-svelte";
  import loadLanguages from "prismjs/components/index.js";
  loadLanguages.silent = true;
  function resolveHighlighter(lang) {
    const langsToLoad = [lang].filter((item) => !Prism.languages[item]);
    if (langsToLoad.length) {
      loadLanguages(langsToLoad);
    }
    if (!Prism.languages[lang]) {
      return null;
    }
    return (code) => Prism.highlight(code, Prism.languages[lang], lang);
  }
  let highlighter = resolveHighlighter(lang);
</script>

{#if highlighter}
  <pre><code>{@html highlighter(code)}</code></pre>
{:else}
  <pre><code>{code}</code></pre>
{/if}
