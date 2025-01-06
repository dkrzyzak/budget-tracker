import { NavLink, type NavLinkProps } from 'react-router';
import { cn } from '~/lib/utils';
import { menuLinks } from './constants';

function DesktopMenuItem(props: NavLinkProps) {
    return (
        <NavLink
            className={({ isActive }) =>
                cn(
                    'px-4 py-2 text-lg hover:text-gray-300 active:text-gray-300',
                    isActive && 'text-primary hover:text-primary/90'
                )
            }
            {...props}
        />
    );
}

export function DesktopMenu() {
    return (
        <div className='flex'>
            {menuLinks.map((link) => (
                <DesktopMenuItem key={link.label} to={link.to}>
                    {link.label}
                </DesktopMenuItem>
            ))}
        </div>
    );
}

export default DesktopMenu;
