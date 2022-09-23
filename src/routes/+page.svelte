<script>
	import { my_store } from '../lib/myStore';
	$my_store = 1;
</script>

<!-- https://supabase.com/docs/guides/realtime/presence -->
<!-- https://supabase.com/blog/supabase-realtime-multiplayer-general-availability -->
<button
	on:click={() => {
		$my_store += 1;
	}}
>
	random int
</button>

<p>{$my_store}</p>
