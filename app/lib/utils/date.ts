import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

type FormatArgs = Parameters<typeof format>;

export function formatDate(date: FormatArgs[0], formatStr: FormatArgs[1]) {
    return format(date, formatStr, { weekStartsOn: 1, locale: pl });
}
