import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
	// UI
    index('./routes/first-screen.tsx'),
    route('/colors', './routes/colors.tsx'),

	// CATCH ALL
    route('*', './routes/catch-all.ts'),
] satisfies RouteConfig;
