// Convert string to object with its fields-label
interface Format {
    params: string
    sep?: string
    label: string | boolean
}

export const formatFields = ({ params, sep = ',', label }: Format) => {
    const fields = params.split(sep)
    return fields?.reduce((store, next) => ({ ...store, [next]: label }) , {})
    // Return undefined or object 
}