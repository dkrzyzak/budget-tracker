import { useFormContext } from 'react-hook-form';
import ColorPicker from '~/components/form/color-picker';
import FormField from '~/components/form/form-field';
import type { CategoryFormData } from '~/db/models';

function CategoryColorInput() {
    const { setValue, watch, formState: { errors } } = useFormContext<CategoryFormData>();
    const color = watch('color');

    const onChange = (newColor: string) => {
        setValue('color', newColor);
    }

    return (
        <div>
        <FormField label="Kolor" id="color" error={errors.color}>
            <ColorPicker targetLabel={color ? color : 'Wybierz kolor'} color={color} onChange={onChange} />
        </FormField>
        </div>
    );
}

export default CategoryColorInput;
