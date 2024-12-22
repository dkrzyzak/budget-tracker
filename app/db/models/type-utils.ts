export type Dto<Element, IdField extends string = 'id'> = Element & {
    [K in IdField]: string; // by default it's { id: string }
};
