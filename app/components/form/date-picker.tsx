'use client';

import { useMemo, useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';
import { Calendar } from '~/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import { formatDate } from '~/lib/utils/date';
import type { SelectSingleEventHandler } from 'react-day-picker';
import { useMediaQuery } from '~/hooks/use-media-query';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
} from '../ui/drawer';

interface DatePickerProps {
    label?: string;
    value?: Date;
    onChange?: (date: Date) => void;
}

export function DatePicker({ label, value, onChange }: DatePickerProps) {
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
                id='operation-date'
                className={cn(
                    'justify-start text-left font-normal flex-1',
                    !value && 'text-muted-foreground'
                )}
            >
                <CalendarIcon className='mr-2 h-4 w-4' />
                {value ? formatDate(value, 'PPP') : <span>Wybierz datę</span>}
            </Button>
        ),
        [value]
    );

    return (
        <div className='flex items-center gap-4'>
            {label && (
                <label className='text-sm' htmlFor='operation-date'>
                    {label}
                </label>
            )}
            {isDesktop ? (
                <Popover open={isCalendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>{Trigger}</PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                        <Calendar mode='single' selected={value} onSelect={onSelect} />
                    </PopoverContent>
                </Popover>
            ) : (
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
            )}
        </div>
    );
}
