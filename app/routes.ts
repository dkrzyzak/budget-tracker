import { index, layout, route, type RouteConfig } from '@react-router/dev/routes';

export default [
    layout('./routes/dashboard/layout.tsx', [
        index('./routes/dashboard/index.tsx'),
        route('/operations', './routes/operations/index.tsx'),
        route('/categories', './routes/categories/index.tsx'),
        route('/sources', './routes/sources/index.tsx'),
        route('/colors', './routes/colors.tsx'),
    ]),

    route('/login', './routes/first-screen.tsx'),

    // API
    route('/api/set-theme', './actions/theme/action.server.ts'),

    // CATCH ALL
    route('*', './routes/catch-all.ts'),
] satisfies RouteConfig;
