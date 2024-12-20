import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
	return [{ title: 'Billans' }, { name: 'description', content: 'Na co to poszło?' }];
};

export default function FirstScreen() {
	return (
		<main className='flex items-center justify-center h-screen'>
			<div className='mb-[20%] text-center'>
				<h1>Bilans</h1>
				<h2>Na co to poszło?</h2>
			</div>
		</main>
	);
}
