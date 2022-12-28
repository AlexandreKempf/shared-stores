import { writable } from 'svelte/store';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);

export function multiplayerStore(store_name, init_value = null) {

    const store = writable(init_value);
    let value = init_value

    const channel = supabase.channel(store_name)

    channel
        .on('broadcast', { event: 'store-update' }, ({ event, payload, type }) => { payload === init_value ? null : set_locally(payload) })
        .on('presence', { event: 'join' }, ({ newuser }) => { value === init_value ? null : set(value) })
        .subscribe()
        .track(null)


    function set_locally(new_value) {
        store.set(new_value)
        value = new_value
    }

    async function set(new_value) {
        await channel.send({
            type: 'broadcast',
            event: 'store-update',
            payload: new_value
        })
        set_locally(new_value)
    }


    return {
        subscribe: store.subscribe,
        set: set,
    };
}
