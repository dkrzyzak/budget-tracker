export function toFormData(object: Record<string, any>) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(object)) {
        formData.append(key, value);
    }

    return formData;
}
