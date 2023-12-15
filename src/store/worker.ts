import { writable } from 'svelte/store'

export const worker = writable<Worker>()
export const ready = writable<boolean>(false)
