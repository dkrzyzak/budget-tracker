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
import RecordsForm from './records-form';

function RecordsFormModal() {
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
                <RecordsForm />
                <DialogFooter>
                    <Button type='submit'>Potwierdź</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default RecordsFormModal;
