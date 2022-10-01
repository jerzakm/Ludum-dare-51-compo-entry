import type { Provider } from '@supabase/supabase-js';
import { writable } from 'svelte/store';
import { supabase } from './supabaseClient';

export const user: any | null = writable({
	email: '',
	anonymous: false
});

export const socialSignIn = async (provider: Provider) => {
	try {
		const { error } = await supabase.auth.signIn({ provider });
		if (error) throw error;
	} catch (error: any) {
		alert(error.error_description || error.message);
	}
};

export const magicLinkSignIn = async (email: string) => {
	try {
		const { error } = await supabase.auth.signIn({ email });
		if (error) throw error;
		alert('Check your email for the login link!');
	} catch (error: any) {
		alert(error.error_description || error.message);
	}
};

export const anonSignIn = () => {
	user.set({ email: '', anonymous: true });
};

export const signOut = async () => {
	await supabase.auth.signOut();
};
