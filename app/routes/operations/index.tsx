import { type MetaFunction } from 'react-router';

export const meta: MetaFunction = () => {
    return [{ title: 'Operacje | Billans' }];
};

export default function OperationsPage() {
    return (
        <div className='grid'>
            <h1>Operacje</h1>
        </div>
    );
}
