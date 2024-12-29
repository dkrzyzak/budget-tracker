import { useState, type PropsWithChildren } from 'react';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
} from '~/components/ui/drawer';
import { useMediaQuery } from '~/hooks/use-media-query';
import OperationsForm from './operations-form';

function OperationsFormTrigger({ children }: PropsWithChildren) {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const [isOpen, setOpen] = useState(false);

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                {children}
                </DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>Dodaj wpis</DialogTitle>
                        <DialogDescription>
                            Na co poszło tym razem? A może to dzień wypłaty?
                        </DialogDescription>
                    </DialogHeader>
                    <OperationsForm setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={isOpen} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent className='px-8 pb-8'>
                <DrawerTitle className='text-center mt-4'>Dodaj wpis</DrawerTitle>
                <DrawerDescription className='text-center my-2'>
                    Na co poszło tym razem? A może to dzień wypłaty?
                </DrawerDescription>

                <OperationsForm setOpen={setOpen} />
            </DrawerContent>
        </Drawer>
    );
}

export default OperationsFormTrigger;
