<script>
	import { my_store } from '../lib/myStore';

	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}
</script>

<button
	on:click={() => {
		$my_store = { ...$my_store, test: getRandomInt(10) };
	}}
>
	Create user
</button>

<p>{$my_store.test}</p>
