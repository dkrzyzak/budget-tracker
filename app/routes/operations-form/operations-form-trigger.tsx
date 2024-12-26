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

function OperationsFormTrigger() {
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

export default OperationsFormTrigger;
