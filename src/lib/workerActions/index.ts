import type { Action } from '$lib/workers/types'
import { worker } from 'store/worker'

export function postActionFactory(key: string) {
	return function (action: Action) {
		worker.subscribe((worker) => {
			worker?.postMessage({
				[key]: action
			})
		})
	}
}
