import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
		id: params.tower
	};

	throw error(404, 'Not found');
}
