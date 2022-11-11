import { writable } from 'svelte/store';
import { supabase } from '$lib/supabase';


export async function sharedStore(store_name, init_value = null) {

    const store = writable(init_value);

    const channel = supabase.channel(store_name)

    let store_value = init_value

    channel
        .on('broadcast', { event: 'store-update' }, ({ event, payload, type }) => { payload === init_value ? null : set_locally(payload) })
        .on('presence', { event: 'join' }, ({ newuser }) => { store_value === init_value ? null : set(store_value) })
        .subscribe()
        .track({ online_at: new Date().toISOString() })


    function set_locally(value) {
        store.set(value)
        store_value = value
    }

    async function set(value) {
        await channel.send({
            type: 'broadcast',
            event: 'store-update',
            payload: value
        })
        set_locally(value)
    }



    return {
        subscribe: store.subscribe,
        set: set,
    };
}
