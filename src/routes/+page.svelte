<script>
	import { my_store } from '../lib/myStore';
</script>

<button
	on:click={() => {
		$my_store += 1;
	}}
>
	Accumulator
</button>

<p>{$my_store}</p>
