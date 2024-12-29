import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

type FormatArgs = Parameters<typeof format>;

export function formatDate(date: FormatArgs[0], formatStr: FormatArgs[1]) {
    return format(date, formatStr, { weekStartsOn: 1, locale: pl });
}

export function formatDefault(date: Date) {
    return formatDate(date, 'PPP');
}

export function stripTimeZone(date: Date): Date {
    const year = date.getFullYear();
    const month = date.getMonth(); // Note: getMonth() is zero-based
    const day = date.getDate();

    return new Date(Date.UTC(year, month, day));
}
