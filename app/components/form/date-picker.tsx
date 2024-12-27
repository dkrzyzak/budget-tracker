'use client';

import { useState } from 'react';
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

export function DatePicker() {
    const [isCalendarOpen, setCalendarOpen] = useState(false);
    const [date, setDate] = useState<Date>(new Date());
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const onSelect: SelectSingleEventHandler = (date) => {
        setDate(date!);
        setCalendarOpen(false);
    };

    if (isDesktop) {
        return (
            <div className='flex items-center gap-4'>
                <label className='text-sm' htmlFor='operation-date'>
                    Data transakcji
                </label>
                <Popover open={isCalendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant='outline'
                            id='operation-date'
                            className={cn(
                                'justify-start text-left font-normal flex-1',
                                !date && 'text-muted-foreground'
                            )}
                        >
                            <CalendarIcon className='mr-2 h-4 w-4' />
                            {date ? formatDate(date, 'PPP') : <span>Wybierz datę</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                        <Calendar mode='single' selected={date} onSelect={onSelect} />
                    </PopoverContent>
                </Popover>
            </div>
        );
    }

    return (
        <div className='flex items-center gap-4'>
            <label className='text-sm' htmlFor='operation-date'>
                Data transakcji
            </label>
            <Drawer open={isCalendarOpen} onOpenChange={setCalendarOpen}>
                <DrawerTrigger asChild>
                    <Button
                        variant='outline'
                        id='operation-date'
                        className={cn(
                            'justify-start text-left font-normal flex-1',
                            !date && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon className='mr-2 h-4 w-4' />
                        {date ? formatDate(date, 'PPP') : <span>Wybierz datę</span>}
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerTitle className='sr-only'>Wybierz kategorię</DrawerTitle>
                    <DrawerDescription className='sr-only'>
                        Drawer wyboru kategorii
                    </DrawerDescription>

                    <div className='mt-4 mx-auto'>
                        <Calendar mode='single' selected={date} onSelect={onSelect} />
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
