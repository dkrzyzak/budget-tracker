import { type MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
    return [{ title: 'Źródła | Billans' }];
};

export default function SourcesPage() {
    return (
        <div className='grid'>
            <h1>Źródła</h1>
        </div>
    );
}
