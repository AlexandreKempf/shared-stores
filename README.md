# TLDR;

Shared-Stores are multiplayer [Svelte](https://svelte.dev/) stores sync with [Supabase](https://supabase.com/) Realtime Multiplayer.

# Motivation
This repo was created with multiplayer games in mind, mostly board games such as [vote's out](https://votesout.com/) or [codename](https://codenames.game/). I was looking for a convenient way to share a game-state between the players. I love how easy Svelte stores are to use and I decided to use them and bind the last supabase feature Realtime Multiplayer on top of them. 

Note that this project is open source and supabase is free to use for small projects! 

# Install

No install because I don't know how to handle Supabase credentials with a npm package 🤡.


# How to use it then ?

Follow these steps: 
 - Install the version >= 2.0 of supabase: `npm install @supabase/supabase-js@2.0.0-rc.5`
 - Copy the `src/lib/sharedStores.js` file and past it in your project.
 - Create a `.env` file at the root of your project containing `VITE_SUPABASE_ANON_KEY` and `VITE_SUPABASE_URL`. [Here](https://supabase.com/docs/guides/with-sveltekit) is a tuto on how to find them. YOu'll need a Supabase account (free and no credit card asked).
 - Create your store in a file located in `src/lib` (for instance `myStore.js`). The store is created with a string that it uses as ID, and it will be shared with everyone that have the same ID. For instance, in a multiplayer game, the store ID can be the room name. Example:
    ```javascript
    import { sharedStore } from "$lib/sharedStores"

    export const my_store = await sharedStore("ROOM_4K9DHRJ");
    ```
 - Use your store in your page, it will be shared to everyone that share the same store ID. Example:
    ```html
    <script>
        import { my_store } from '../lib/myStore';
    </script>

    <button on:click={() => {$my_store += 1}}>
        Accumulator
    </button>

    <p>{$my_store}</p>
    ```

# Usecase and limitations

Shared-Stores can be use for online multiplayer games, chat room, shared account ... sky is the limit 🚀.

# Example

Soon...


