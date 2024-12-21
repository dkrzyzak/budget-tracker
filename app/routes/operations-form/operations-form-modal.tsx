import { DialogTrigger } from '@radix-ui/react-dialog';
import { Button } from '~/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog';
import OperationsForm from './operations-form';

function OperationsFormModal() {
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
                <DialogFooter>
                    <Button type='submit'>Potwierdź</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default OperationsFormModal;
