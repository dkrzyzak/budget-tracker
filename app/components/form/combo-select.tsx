import { useState } from 'react';
import { Button } from '~/components/ui/button';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
} from '~/components/ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { useMediaQuery } from '~/hooks/use-media-query';
import { OptionsList, type OptionBase } from '~/components/form/options-list';

interface ComboSelectProps {
    options: OptionBase[];
    onSelectOption: (optionId: number) => void;
    addNewOption: (optionName: string) => void;
    fieldId?: string;
    targetLabel?: string;
    emptyListLabel?: string;
}

export function ComboSelect({
    options,
    fieldId,
    targetLabel,
    emptyListLabel,
    addNewOption,
    onSelectOption,
}: ComboSelectProps) {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const [isModalOpened, setModalOpened] = useState(false);

    if (isDesktop) {
        return (
            <Popover open={isModalOpened} onOpenChange={setModalOpened}>
                <PopoverTrigger asChild>
                    <Button variant='outline' id={fieldId} className='flex-1'>
                        {targetLabel}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0' align='start'>
                    <OptionsList
                        options={options}
                        emptyListLabel={emptyListLabel}
                        setOpen={setModalOpened}
                        addNewOption={addNewOption}
                        onSelectOption={onSelectOption}
                    />
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Drawer open={isModalOpened} onOpenChange={setModalOpened}>
            <DrawerTrigger asChild>
                <Button variant='outline' id='category' className='flex-1'>
                    {targetLabel}
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerTitle className='sr-only' />
                <DrawerDescription className='sr-only' />

                <div className='mt-4 border-t'>
                    <OptionsList
                        options={options}
                        emptyListLabel={emptyListLabel}
                        setOpen={setModalOpened}
                        addNewOption={addNewOption}
                        onSelectOption={onSelectOption}
                    />
                </div>
            </DrawerContent>
        </Drawer>
    );
}

export default ComboSelect;
