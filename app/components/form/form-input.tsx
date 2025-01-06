import type { FieldError } from 'react-hook-form';
import FormField from './form-field';
import { Input, type InputProps } from '../ui/input';

type FormInputProps = InputProps & {
    id?: string;
    label?: string;
    error?: FieldError;
};

const FormInput = ({ className, id, label, error, ref, ...props }: FormInputProps) => {
    return (
        <FormField id={id} label={label} error={error}>
            <Input id={id} ref={ref} className={className} {...props} />
        </FormField>
    );
};

export { FormInput };
