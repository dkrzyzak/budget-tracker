import { Wallet } from 'lucide-react';
import { Link } from 'react-router';

import { useMediaQuery } from '~/hooks/use-media-query';

import { DesktopMenu } from './menu-desktop';
import { MobileMenu } from './menu-mobile';

export function Menu() {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    return (
        <header className='flex justify-between p-4'>
            <Link to='/' className='text-3xl flex gap-2 items-center'>
                <Wallet />
                <span>Billans</span>
            </Link>

            {isDesktop ? <DesktopMenu /> : <MobileMenu />}
        </header>
    );
}
