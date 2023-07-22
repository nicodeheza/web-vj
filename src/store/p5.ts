import type BufferRenderer from '$lib/appComponents/BufferRenderer'
import type P5 from 'p5'
import { writable } from 'svelte/store'

export const globalP5 = writable<P5>()
export const bufferOutput = writable<BufferRenderer>()
export const resolution = writable<{ w: number; h: number }>()
