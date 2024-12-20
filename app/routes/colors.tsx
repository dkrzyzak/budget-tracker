import { Link, type MetaFunction } from 'react-router';
import { Button } from '~/components/ui/button';
import { cn } from '~/lib/utils';

export const meta: MetaFunction = () => {
	return [{ title: 'Billans - kolory' }];
};

const colors = [
	{ name: 'Border', className: 'bg-border' },
	
	{ name: 'Ring', className: 'bg-ring' },
	{ name: 'Background', className: 'bg-background' },
	{ name: 'Foreground', className: 'bg-foreground' },
	{ name: 'Primary', className: 'bg-primary' },
	{ name: 'Primary foreground', className: 'bg-primary-foreground' },
   { name: 'Secondary', className: 'bg-secondary' },
	{ name: 'Secondary foreground', className: 'bg-secondary-foreground' },
   { name: 'destructive', className: 'bg-destructive' },
	{ name: 'destructive foreground', className: 'bg-destructive-foreground' },
   { name: 'muted', className: 'bg-muted' },
	{ name: 'muted foreground', className: 'bg-muted-foreground' },
   { name: 'accent', className: 'bg-accent' },
	{ name: 'accent foreground', className: 'bg-accent-foreground' },
   { name: 'popover', className: 'bg-popover' },
	{ name: 'popover foreground', className: 'bg-popover-foreground' },
   { name: 'card', className: 'bg-card' },
	{ name: 'card foreground', className: 'bg-card-foreground' },
   { name: 'Input', className: 'bg-input' },
];

export default function FirstScreen() {
	return (
		<main className='p-8'>
         <Button asChild variant='secondary' className='mb-4'>
            <Link to="/">Powrót</Link>
         </Button>
			<h1 className='text-4xl'>Kolory dostępne w aplikacji</h1>
			<div className='grid gap-4 mt-8 px-4'>
				{colors.map((color) => (
					<div key={color.name} className='flex gap-2 justify-between items-center p-2 rounded-md odd:bg-accent-foreground/20'>
						<span className='text-xl font-bold'>{color.name}</span>
						<div className={cn('w-10 h-10 border', color.className)} />
					</div>
				))}
			</div>
		</main>
	);
}
