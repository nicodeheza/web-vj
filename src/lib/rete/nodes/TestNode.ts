import { ClassicPreset } from 'rete'
import type ReteEditor from '../editor'

export async function createTestNode(name: string, editor: ReteEditor) {
	const displayName = `Test-${name}`

	const newNode = new ClassicPreset.Node(displayName)
	newNode.addControl(
		`${displayName}-text-control`,
		new ClassicPreset.InputControl('text', { initial: 'test' })
	)
	newNode.addOutput(`${displayName}-output`, new ClassicPreset.Output(editor.socket))
	newNode.addInput(`${displayName}-input`, new ClassicPreset.Input(editor.socket))

	await editor.addNode(newNode)
	await editor.translateNode(newNode, 50, 50)
}
