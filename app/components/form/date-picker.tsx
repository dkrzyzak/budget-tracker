'use client';

import { Calendar as CalendarIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { SelectSingleEventHandler } from 'react-day-picker';

import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { useMediaQuery } from '~/hooks/use-media-query';
import { cn } from '~/lib/utils';
import { formatDefault } from '~/lib/utils/date';

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
} from '../ui/drawer';

interface DatePickerProps {
    id?: string;
    label?: string;
    value?: Date;
    onChange?: (date: Date) => void;
}

export function DatePicker({ id, value, onChange }: DatePickerProps) {
    const [isCalendarOpen, setCalendarOpen] = useState(false);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const onSelect: SelectSingleEventHandler = (date) => {
        onChange?.(date!);
        setCalendarOpen(false);
    };

    const Trigger = useMemo(
        () => (
            <Button
                variant='outline'
                id={id}
                className={cn(
                    'justify-start text-left font-normal flex-1 flex',
                    !value && 'text-muted-foreground'
                )}
            >
                <CalendarIcon className='h-4 w-4' />
                <span className='text-center flex-1'>
                    {value ? formatDefault(value) : 'Wybierz datę'}
                </span>
            </Button>
        ),
        [id, value]
    );

    if (isDesktop) {
        return (
            <Popover open={isCalendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>{Trigger}</PopoverTrigger>
                <PopoverContent className='w-auto p-0'>
                    <Calendar mode='single' selected={value} onSelect={onSelect} />
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Drawer open={isCalendarOpen} onOpenChange={setCalendarOpen}>
            <DrawerTrigger asChild>{Trigger}</DrawerTrigger>
            <DrawerContent>
                <DrawerTitle className='sr-only' />
                <DrawerDescription className='sr-only' />

                <Calendar
                    className='mt-4 mx-auto'
                    mode='single'
                    selected={value}
                    onSelect={onSelect}
                />
            </DrawerContent>
        </Drawer>
    );
}
