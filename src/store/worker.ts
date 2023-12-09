import { writable } from 'svelte/store'

export const worker = writable<Worker>()
