import { Link, type LinkProps, useLocation } from 'react-router';
import { menuLinks } from './constants';
import { cn } from '~/lib/utils';

type DesktopMenuItemProps = LinkProps & { active?: boolean };

function DesktopMenuItem({ active, ...props }: DesktopMenuItemProps) {
    return (
        <Link
            className={cn(
                'px-4 py-2 text-lg hover:text-gray-300 active:text-gray-300',
                active && 'text-primary hover:text-primary/90'
            )}
            {...props}
        />
    );
}

export function DesktopMenu() {
    const { pathname } = useLocation();

    return (
        <div className='flex'>
            {menuLinks.map((link) => (
                <DesktopMenuItem
                    key={link.label}
                    to={link.to}
                    active={link.to === pathname}
                >
                    {link.label}
                </DesktopMenuItem>
            ))}
        </div>
    );
}

export default DesktopMenu;
