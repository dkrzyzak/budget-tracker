import { db } from '~/db/connection.server';
import type { CategoryDto } from '~/db/models';

const categories: CategoryDto[] = [
    {
        id: '1',
        name: 'Jedzenie',
        color: 'red',
        icon: '',
    },
    {
        id: '2',
        name: 'Zakupy online',
        color: 'green',
        icon: '',
    },
    {
        id: '3',
        name: 'Zdrowie',
        color: 'blue',
        icon: '',
    },
    {
        id: '4',
        name: 'Pierdoły',
        color: 'violet',
        icon: '',
    },
    {
        id: '5',
        name: 'Elektronika',
        color: 'pink',
        icon: '',
    },
];

export async function getCategories() {
    return categories;
}

export async function getCategoriesReal() {
    const data = await db.select('*').from<CategoryDto>('categories');
    console.log(data);

    return data;
}
