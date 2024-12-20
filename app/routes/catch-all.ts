// route(*)

import type { Route } from '../+types/root';


const extensionPaths = ['installHook.js.map'];

export const loader = async ({ params }: Route.LoaderArgs) => {
	const { '*': resourcePath } = params;

	if (extensionPaths.some((path) => resourcePath === path)) {
		return new Response(
			JSON.stringify({
				version: 3,
				sources: [],
				mappings: '',
			}),
			{
				status: 200,
				headers: {
					// Add appropriate headers for the file type
					'Content-Type': 'application/json',
				},
			}
		);
	}

	// Let other requests fall through to the normal 404 handler
	return new Response(null, { status: 404 });
};
