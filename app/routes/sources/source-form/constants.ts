import type { SourceFormData } from '~/db/models';

const defaultImage = null;

export const emptySourceData: SourceFormData = {
    id: null,
    name: '',
    image: defaultImage,
};
