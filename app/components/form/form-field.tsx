import type { FieldError } from 'react-hook-form';
import { cn } from '~/lib/utils';
import { Label } from '../ui/label';

interface FormFieldProps {
    id?: string;
    label?: string;
    error?: FieldError;
    children?: React.ReactNode;
}

function FormField({ id, label, error, children }: FormFieldProps) {
    return (
        <div className='grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-2'>
            {label && (
                <Label
                    htmlFor={id}
                    className={cn('text-right col-span-1', error && 'text-destructive')}
                >
                    {label}
                </Label>
            )}

            {/* Actual input element */}
            {children}

            {error && (
                <>
                    <div />
                    <p className='text-[0.8rem] col-span-1 font-medium text-destructive'>
                        {error.message}
                    </p>
                </>
            )}
        </div>
    );
}

export default FormField;
