import { writable } from 'svelte/store';
import { supabase } from '$lib/supabase';


export async function sharedStore(store_name, default_state = { "test": null, "test2": null }) {


    async function fetchValueInDB() {
        return await supabase
            .from('shared-stores')
            .select('content')
            .eq('store_name', store_name)
            .order('id', { ascending: false })
            .limit(1)
            .single()
            .then(response => { return response.data.content })
    }

    let state = default_state
    state = await fetchValueInDB()

    const store = writable(state);

    async function set(value) {
        if (JSON.stringify(state) !== JSON.stringify(value)) {
            await supabase
                .from('shared-stores')
                .insert({ store_name: store_name, content: value }, { returning: 'minimal' })
            store.set(value)
            state = value
        }
    }

    const subscriptionSupabase = supabase
        .from('shared-stores')
        .on('INSERT', (payload) => {
            if (payload.new.store_name === store_name) {
                store.set(payload.new.content);
                state = payload.new.content
            }
        })
        .subscribe();

    return {
        subscribe: store.subscribe,
        set: set,
    };
}

