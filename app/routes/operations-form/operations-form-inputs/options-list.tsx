import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '~/components/ui/command';
import type { Operation } from '~/db/models';
import { NEW_OPTION_ID } from '../constants';

// every option must have those properties
interface OptionBase {
    id: number;
    name: string;
    frequency: number;
}

interface OptionsListProps<Option extends OptionBase> {
    options: Option[];
    fieldName: keyof Operation;
    commandEmptyCTA: string;
    setOpen: (open: boolean) => void;
    addNewOption: (optionName: string) => void;
}

export function OptionsList<Option extends OptionBase>({
    options,
    fieldName,
    commandEmptyCTA,
    setOpen,
    addNewOption,
}: OptionsListProps<Option>) {
    const [optionName, setOptionName] = useState('');
    const { setValue } = useFormContext<Operation>();

    const filteredOptions = options.filter((option) =>
        option.name.toLowerCase().includes(optionName.toLowerCase().trim())
    );

    const onAddOption = () => {
        addNewOption(optionName);
        setValue(fieldName, NEW_OPTION_ID);

        setOpen(false);
    };

    const onSelectOption = (value: string) => {
        setValue(fieldName, Number(value));
        setOpen(false);
    };

    return (
        <Command shouldFilter={false}>
            <CommandInput
                value={optionName}
                onValueChange={setOptionName}
                placeholder='Wyszukaj...'
            />
            <CommandList>
                <CommandEmpty>
                    <div className='grid gap-2 px-4'>
                        <p>{commandEmptyCTA}</p>
                        <Button
                            disabled={false}
                            variant='outline'
                            className='gap-1'
                            onClick={onAddOption}
                        >
                            <Plus /> {optionName}
                        </Button>
                    </div>
                </CommandEmpty>
                <CommandGroup>
                    {filteredOptions.map((option) => (
                        <CommandItem
                            key={option.id}
                            value={String(option.id)}
                            onSelect={onSelectOption}
                        >
                            {option.name} ({option.frequency})
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
