<script lang="ts">
	export let name: string
	export let id: string
	export let disconnect: (id: string) => void
	export let moveUp: (id: string) => void
	export let moveDown: (id: string) => void
</script>

<li class="element">
	{name}
	<div class="buttons">
		<div class="move">
			<button class="move" on:click={() => moveUp(id)}>▲</button>
			<button class="move" on:click={() => moveDown(id)}>▼</button>
		</div>
		<button class="close" on:click={() => disconnect(id)}>x</button>
	</div>
</li>

<style>
	.element {
		border: solid white 1px;
		list-style: none;
		margin: 5px 0;
		color: white;
		text-align: left;
		padding: 5px 10px;
		padding-right: 0pc;
		border-radius: 5px;

		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.buttons {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.close {
		border: none;
		background-color: transparent;
		color: white;
		cursor: pointer;
		font-size: 15px;
	}

	.close:hover {
		color: rgb(124, 124, 124);
	}

	.move {
		display: flex;
		flex-direction: column;
	}

	.move button {
		cursor: pointer;
		background-color: transparent;
		border: none;
		color: white;
		font-size: 10px;
	}

	.move button:hover {
		color: rgb(124, 124, 124);
	}
</style>
