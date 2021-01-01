require('../css/bootswatch.scss')
require('../css/index.scss')

import SvelteApp from "./index.svelte";

new SvelteApp({
  target: document.getElementById('svelte-app'),
});