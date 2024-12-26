export type Dto<Element, IdField extends string = 'id'> = Element & {
    [K in IdField]: number; // by default it's { id: number }
};
