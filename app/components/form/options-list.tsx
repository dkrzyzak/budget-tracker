import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '~/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '~/components/ui/command';
import { NEW_OPTION_ID } from '~/lib/globals';

// every option must have those properties
export interface OptionBase {
    id: number;
    name: string;
    frequency: number;
}

interface OptionsListProps<Option extends OptionBase> {
    options: Option[];
    emptyListLabel?: string;
    setOpen: (open: boolean) => void;
    onSelectOption: (optionId: number, optionName: string) => void;
    addNewOption: (optionName: string) => void;
}

export function OptionsList<Option extends OptionBase>({
    options,
    emptyListLabel,
    setOpen,
    addNewOption,
    onSelectOption,
}: OptionsListProps<Option>) {
    const [optionName, setOptionName] = useState('');

    const filteredOptions = options.filter((option) =>
        option.name.toLowerCase().includes(optionName.toLowerCase().trim())
    ).slice(0, 6);

    const onAddOption = () => {
        addNewOption(optionName);
        onSelectOption(NEW_OPTION_ID, optionName);

        setOpen(false);
    };

    const onSelect = (optionId: number, optionName: string) => {
        onSelectOption(optionId, optionName);
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
                        <p>{emptyListLabel}</p>
                        <Button
                            disabled={!optionName}
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
                            onSelect={() => onSelect(option.id, option.name)}
                        >
                            {option.name}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    );
}
