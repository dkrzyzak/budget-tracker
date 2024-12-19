// index()

import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
	return [
		{ title: 'Billans' },
		{ name: 'description', content: 'Na co to poszło?' },
	];
};

export default function Home() {
	return (
		<main>
			<h1 className='font-extralight'>lorem</h1>
			<p>
				After we’ve chosen a typeface to use in our project, and have either chosen a
				font delivery service or acquired the font files themselves, there are
				effectively three steps in using web fonts. First we’ll need to load the font
				files; then, we need to reference those files and assign weights and styles
				(although these first two steps are done for us if we’re using Google Fonts or
				Adobe Fonts); and finally, we get to the fun stuff: the typography. While the
				entirety of Google Fonts Knowledge is a guide to the latter part, we’ll cover
				the first two steps here in this article.
			</p>
		</main>
	);
}
