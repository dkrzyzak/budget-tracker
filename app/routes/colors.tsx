import { type MetaFunction } from 'react-router';
import { Button } from '~/components/ui/button';
import { useTheme } from '~/context/ThemeContext';
import { cn } from '~/lib/utils';

export const meta: MetaFunction = () => {
    return [{ title: 'Kolorki | Billans' }];
};

const colors = [
    { name: 'Border', className: 'bg-border' },
    { name: 'ring', className: 'bg-ring' },
    { name: 'background', className: 'bg-background' },
    { name: 'foreground', className: 'bg-foreground' },
    { name: 'primary', className: 'bg-primary' },
    { name: 'primary foreground', className: 'bg-primary-foreground' },
    { name: 'secondary', className: 'bg-secondary' },
    { name: 'secondary foreground', className: 'bg-secondary-foreground' },
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
    { name: 'input', className: 'bg-input' },
];

/*
<Button asChild variant='secondary' className='mb-4'>
	<Link to="/"><ChevronLeft /> Powrót</Link>
</Button>
 */

export default function FirstScreen() {
    const { toggleTheme } = useTheme();

    return (
        <main className='p-8'>
            <h1 className='text-4xl'>Kolory dostępne w aplikacji</h1>
            <Button onClick={toggleTheme} className='mt-4'>
                Odwróć kolory
            </Button>
            <div className='grid gap-4 mt-8 px-4'>
                {colors.map((color) => (
                    <div
                        key={color.name}
                        className='flex gap-2 justify-between items-center p-2 rounded-md odd:bg-accent-foreground/20'
                    >
                        <span className='text-xl font-bold'>{color.name}</span>
                        <div className={cn('w-10 h-10 border', color.className)} />
                    </div>
                ))}
            </div>
        </main>
    );
}
