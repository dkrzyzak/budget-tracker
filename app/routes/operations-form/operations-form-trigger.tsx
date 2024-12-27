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

function OperationsFormTrigger() {
    const isDesktop = useMediaQuery('(min-width: 768px)');

    if (isDesktop) {
        return (
            <Dialog>
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
                    <OperationsForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant='outline'>Dodaj wpis</Button>
            </DrawerTrigger>
            <DrawerContent className='p-8'>
                <DrawerTitle className='text-center mt-4'>Dodaj wpis</DrawerTitle>
                <DrawerDescription className='text-center'>
                    Na co poszło tym razem? A może to dzień wypłaty?
                </DrawerDescription>

                <OperationsForm />
            </DrawerContent>
        </Drawer>
    );
}

export default OperationsFormTrigger;
