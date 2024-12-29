import { type MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
    return [{ title: 'Kategorie | Billans' }];
};

export default function CategoriesPage() {
    return (
        <div className='grid'>
            <h1>Kategorie</h1>
        </div>
    );
}
