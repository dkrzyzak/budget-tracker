import { index, route, RouteConfig } from '@react-router/dev/routes';

export default [
	index('./routes/home.tsx'),
	route('*', './routes/catch-all.ts'),
] satisfies RouteConfig;
