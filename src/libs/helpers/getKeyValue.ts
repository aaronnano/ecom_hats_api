export const getKeyValue = (data: any): any => {
    return Object.entries(data)
    .reduce((store, none) => ({ key: none[0], value: none[1] }), {})
}