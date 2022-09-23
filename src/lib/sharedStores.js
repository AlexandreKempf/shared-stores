import { writable } from 'svelte/store';
import { supabase } from '$lib/supabase';


export async function sharedStore(store_name) {

    const store = writable();

    const channel = supabase.channel(store_name)

    // listen to broadcasts
    channel
        .on('broadcast', { event: 'store-update' }, ({ event, payload, type }) => store.set(payload))
        .subscribe()

    async function set(value) {
        await channel.send({
            type: 'broadcast',
            event: 'store-update',
            payload: value
        })
        store.set(value)
    }

    return {
        subscribe: store.subscribe,
        set: set,
    };
}

