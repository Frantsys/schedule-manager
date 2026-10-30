

/**
 * Mapeia um objeto para um FormData.
 * 
 * @param type o objeto a ser mapeado
 * @param form FormData
 */
export const mapFormData = (type: object, form: FormData) => {
    const fields = Object.entries(type);
    fields.forEach((f) => {
        form.append(f[0], f[1]);
    });
}