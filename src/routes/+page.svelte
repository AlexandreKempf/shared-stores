<script>
	import { multiplayerStore } from '../lib/multiplayerStore';

	let my_store = multiplayerStore('alex_store', 0);
</script>

<button
	on:click={() => {
		$my_store += 1;
	}}
>
	Add 1
</button>

<p>{$my_store}</p>
