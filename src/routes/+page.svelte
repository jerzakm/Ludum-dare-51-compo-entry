<script>
	import { signOut, user } from '$lib/auth';
	import { supabase } from '../lib/supabaseClient';
	import Auth from '$lib/components/Auth.svelte';

	$: console.log($user);
</script>

<container class="flex flex-col gap-8 items-center">
	<h1 class="text-5xl">Game title</h1>
	<p>
		The world is full of secrets. You're an impatient wizard who crawls dungeons by duplicating
		himself. Although you can be in many places at the same time, your powers and life are not
		multiplicated. Be careful or you may overstretch yourself!
	</p>

	<h2>The game features a leaderboard, sign in to join in on the fun.</h2>

	{#if $user}
		<button on:click={signOut}> as </button>
	{:else}
		<Auth />
	{/if}

	<menu class="flex flex-col gap-2">
		<a
			href="/"
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
		>
			Explore the world
		</a>
		<a
			href="/"
			class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
		>
			Options
		</a>
	</menu>
</container>

<style>
	container {
		width: calc(6rem + 30vmax);
	}
</style>
