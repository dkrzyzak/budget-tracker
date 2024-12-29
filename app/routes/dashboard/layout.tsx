import { Outlet } from 'react-router';

import { Menu } from './menu';

function DashboardLayout() {
    return (
        <main className='h-screen flex flex-col'>
            <Menu />

            <div className='flex flex-col items-center justify-center flex-1 text-center mb-[20%]'>
                <Outlet />
            </div>
        </main>
    );
}

export default DashboardLayout;
