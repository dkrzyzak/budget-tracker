import { DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from '~/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog';
import OperationsForm from './operations-form';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
} from '~/components/ui/drawer';
import { useMediaQuery } from '~/hooks/use-media-query';
import { useState } from 'react';

function OperationsFormTrigger() {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const [isOpen, setOpen] = useState(false);

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant='outline'>Dodaj wpis</Button>
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
                <Button variant='outline'>Dodaj wpis</Button>
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
