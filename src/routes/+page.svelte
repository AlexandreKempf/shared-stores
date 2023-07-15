<script>
	import { multiplayerStore } from '../lib/multiplayerStore';

	function makeid(length) {
		let result = '';
		const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		let counter = 0;
		while (counter < length) {
			result += characters.charAt(Math.floor(Math.random() * charactersLength));
			counter += 1;
		}
		return result;
	}
	let uniqID = makeid(10);
	let my_store = multiplayerStore('alex_store', uniqID, 0, false);
</script>

<p>I am {uniqID}</p>

{#each Object.entries($my_store.users) as [username, value]}
	<button
		on:click={() => {
			$my_store.users[username] += 1;
		}}
	>
		Add 1 to {username}
	</button>

	<p>{value}</p>
	<p>{username}</p>
{/each}
