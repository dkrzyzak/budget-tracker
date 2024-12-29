import { useMediaQuery } from '~/hooks/use-media-query';
import { DesktopMenu } from './menu-desktop';
import { MobileMenu } from './menu-mobile';
import { Link } from 'react-router';

export function Menu() {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    return (
        <header className='flex justify-between p-4'>
            <Link to='/' className='text-3xl'>Billans</Link>

            {isDesktop ? <DesktopMenu /> : <MobileMenu />}
        </header>
    );
}
