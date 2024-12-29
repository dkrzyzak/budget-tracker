import { useState } from 'react';
import { Link, useLocation, type LinkProps } from 'react-router';
import { Button } from '~/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '~/components/ui/sheet';
import { menuLinks } from './constants';
import { cn } from '~/lib/utils';

type MobileMenuItemProps = LinkProps & {
    active?: boolean;
    setMenuOpen: (open: boolean) => void;
};

function MobileMenuItem({ setMenuOpen, active, ...props }: MobileMenuItemProps) {
    return (
        <Link
            className={cn(
                'px-4 py-2 text-lg hover:text-gray-300 active:text-gray-300',
                active && 'text-primary hover:text-primary/90'
            )}
            onClick={() => setMenuOpen(false)}
            {...props}
        />
    );
}

export function MobileMenu() {
    const { pathname } = useLocation();
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <div>
            <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                    <Button>Nakurwiaj menu</Button>
                </SheetTrigger>
                <SheetContent side='left' className='max-w-[300px]'>
                    <SheetHeader>
                        <SheetTitle className='text-4xl'>Menu</SheetTitle>
                        <SheetDescription className='sr-only' />
                    </SheetHeader>

                    <div className='grid mt-4'>
                        {menuLinks.map((link) => (
                            <MobileMenuItem
                                key={link.label}
                                to={link.to}
                                active={link.to === pathname}
                                setMenuOpen={setMenuOpen}
                            >
                                {link.label}
                            </MobileMenuItem>
                        ))}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
