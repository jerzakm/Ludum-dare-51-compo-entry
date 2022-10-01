<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let selectedTower: any;

	const dispatch = createEventDispatcher();

	function closePreview() {
		dispatch('closePreview', {
			text: 'test!'
		});
	}
	$: console.log(selectedTower);
</script>

<div class="tower-preview flex flex-col items-center justify-center absolute">
	<div class="bg-black py-10 px-10">
		<div class="flex justify-between items-center">
			<h1 class="text-5xl mb-4">{selectedTower.name}</h1>
		</div>
		<p class="max-h-64 overflow-scroll overflow-x-hidden -mr-8">{selectedTower.description}</p>
		<p class="mt-16 font-bold mb-16">
			{selectedTower.name} is a place of great power and one of the hideouts of the Order of Secrets.
			Making your stand here is a very wise choice.
		</p>
		<div class="flex justify-between gap-6">
			<a
				href={`/battle?tower=${selectedTower.id}`}
				class="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center w-full"
			>
				Start!
			</a>

			<button
				class="mt-2 bg-red-800 hover:bg-red-500 text-white font-bold py-2 px-4 rounded text-center "
				on:click={closePreview}
			>
				Close
			</button>
		</div>
	</div>
</div>

<style>
	.tower-preview {
		width: calc(5rem + 30vmax);
		height: 80vh;
		/* position: fixed;
		top: 20px;
		right: 200px; */
	}
	::-webkit-scrollbar {
		width: 10px;
	}

	::-webkit-scrollbar-track {
		background: #f1f1f1;
	}

	::-webkit-scrollbar-thumb {
		background: #888;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
</style>
