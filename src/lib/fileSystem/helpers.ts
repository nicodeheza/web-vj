import type { NodeRecord } from 'store/nodes'

export function updateNodeRecordStorage(data: Map<string, NodeRecord>) {
	const obj = Object.fromEntries(data)
	localStorage.setItem('nodeRecords', JSON.stringify(obj))
}
