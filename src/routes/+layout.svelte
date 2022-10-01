<script lang="ts">
	import { user } from '$lib/auth';
	import { supabase } from '$lib/supabaseClient';
	import '../app.postcss';
	import '../styles/global.css';

	user.set(supabase.auth.user());

	supabase.auth.onAuthStateChange((_, session: any) => {
		if (_ == 'SIGNED_OUT') {
			user.set(null);
		} else {
			if (user) {
				user.set(session.user);
			}
		}
	});
</script>

<slot />
