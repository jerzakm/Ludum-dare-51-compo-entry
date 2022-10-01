<script lang="ts">
	import { user } from '$lib/auth';
	import { supabase } from '$lib/supabaseClient';
	import '../app.postcss';
	import '../styles/global.css';

	user.set(supabase.auth.user());

	supabase.auth.onAuthStateChange((_, session: any) => {
		if (user) {
			user.set(session.user);
		}
	});
</script>

<main class="flex flex-col items-center h-screen justify-center">
	<slot />
</main>
