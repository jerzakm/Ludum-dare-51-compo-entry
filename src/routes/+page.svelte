<script>
	import { signOut, user } from '$lib/auth';
	import { supabase } from '../lib/supabaseClient';
	import Auth from '$lib/components/Auth.svelte';
</script>

<container class="flex flex-col gap-8 items-center">
	<h1 class="text-5xl">Wizard's tower defense</h1>
	<p>
		The world is full of secrets. You're an impatient wizard who crawls dungeons by duplicating
		himself. Although you can be in many places at the same time, your powers and life are not
		multiplicated. Be careful or you may overstretch yourself!
	</p>

	{#if $user}
		<menu class="flex flex-col gap-2">
			<a
				href="/"
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
			>
				Start the game
			</a>
			<a
				href="/"
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
			>
				Options
			</a>
			<button
				class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-center"
				on:click={signOut}
			>
				Sign out
			</button>
		</menu>
	{:else}
		<h2>The game features a leaderboard, sign in to join in on the fun.</h2>
		<Auth />
	{/if}
</container>

<style>
	container {
		width: calc(6rem + 30vmax);
	}
</style>
