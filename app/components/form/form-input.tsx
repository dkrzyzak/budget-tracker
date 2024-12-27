import { cn } from '~/lib/utils';
import { Label } from '../ui/label';
import type { FieldError } from 'react-hook-form';
import { Input, type InputProps } from '../ui/input';

type FormInputProps = InputProps & {
    id?: string;
    label?: string;
    error?: FieldError;
};

const FormInput = ({ className, id, label, error, ref, ...props }: FormInputProps) => {
    return (
        <div className='flex flex-col items-start gap-2'>
            {label && (
                <Label htmlFor={id} className={cn('text-right', error && 'text-destructive')}>
                    {label}
                </Label>
            )}

            <Input
                id={id}
                ref={ref}
                className={cn('flex-1', className)}
                {...props}
            />

            {error && (
                <p className='text-[0.8rem] font-medium text-destructive'>
                    {error.message}
                </p>
            )}
        </div>
    );
};

export { FormInput };
