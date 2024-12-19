import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import type { LinksFunction } from 'react-router';

import './tailwind.css';

export const links: LinksFunction = () => [
	{
		rel: 'preload',
		href: '/fonts/AlbertSans.ttf',
		as: 'font',
		type: 'font/ttf',
		crossOrigin: 'anonymous',
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<meta charSet='utf-8' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
