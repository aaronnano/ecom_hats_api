// No se usa en ningun lado
export const cleanEmptyFields = (args: object) => {
    const data = Object.entries(args).filter(([_, value]) => value)
    return data.reduce((memo, next) => ({...memo, [next[0]]: next[1] }), {})
}