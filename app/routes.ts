import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
	index('./routes/first-screen.tsx'),
	route("/colors", './routes/colors.tsx'),
	route('*', './routes/catch-all.ts'),
] satisfies RouteConfig;
