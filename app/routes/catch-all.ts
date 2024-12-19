// route(*)

import { LoaderFunction } from 'react-router';

const extensionPaths = ['installHook.js.map'];

export const loader: LoaderFunction = async ({ params }) => {
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
