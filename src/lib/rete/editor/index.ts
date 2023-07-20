import { NodeEditor, type GetSchemes, ClassicPreset } from 'rete'
import { AreaPlugin, AreaExtensions } from 'rete-area-plugin'
import { ConnectionPlugin, Presets as ConnectionPresets } from 'rete-connection-plugin'
import { SveltePlugin, Presets, type SvelteArea2D } from 'rete-svelte-plugin'

type Schemes = GetSchemes<
	ClassicPreset.Node,
	ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>
type AreaExtra = SvelteArea2D<Schemes>

export default class ReteEditor {
	private editor: NodeEditor<Schemes>
	private area: AreaPlugin<Schemes, AreaExtra>
	private connection: ConnectionPlugin<Schemes, AreaExtra>
	private render: SveltePlugin<Schemes, AreaExtra>

	socket: ClassicPreset.Socket

	constructor(container: HTMLElement) {
		this.socket = new ClassicPreset.Socket('socket')

		this.editor = new NodeEditor<Schemes>()
		this.area = new AreaPlugin<Schemes, AreaExtra>(container)
		this.connection = new ConnectionPlugin<Schemes, AreaExtra>()
		this.render = new SveltePlugin<Schemes, AreaExtra>()

		AreaExtensions.selectableNodes(this.area, AreaExtensions.selector(), {
			accumulating: AreaExtensions.accumulateOnCtrl()
		})

		this.render.addPreset(Presets.classic.setup())

		this.connection.addPreset(ConnectionPresets.classic.setup())

		this.editor.use(this.area)
		this.area.use(this.connection)
		this.area.use(this.render)

		AreaExtensions.simpleNodesOrder(this.area)
	}

	destroy() {
		this.area.destroy()
	}

	async addNode(node: ClassicPreset.Node) {
		await this.editor.addNode(node)
	}

	async translateNode(node: ClassicPreset.Node, x: number, y: number) {
		await this.area.translate(node.id, { x, y })
	}
}
