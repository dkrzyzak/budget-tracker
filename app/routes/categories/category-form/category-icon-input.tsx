import { useFormContext } from 'react-hook-form';
import FormField from '~/components/form/form-field';
import { TextArea } from '~/components/ui/textarea';
import SvgIcon from '~/components/icon';
import type { CategoryFormData } from '~/db/models';

function CategoryIconInput() {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext<CategoryFormData>();
    const iconValue = watch('icon');
    const color = watch('color');

    return (
        <div>
            <FormField label='Ikonka' id='icon' error={errors.icon}>
                <TextArea {...register('icon')} rows={6} />
            </FormField>

            {iconValue && (
                <div className='flex items-center justify-between'>
                    <span>Podgląd ikonki</span>
                    <SvgIcon svgSource={iconValue} size='100px' color={color} />
                </div>
            )}
        </div>
    );
}

export default CategoryIconInput;
