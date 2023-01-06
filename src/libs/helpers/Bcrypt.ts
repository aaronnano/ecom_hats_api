import bcrypt from 'bcryptjs'
// bcrypt, hasta donde no da detalles de los erroes que lanza

export const encryptData = (data: string) => {
    if(!data) throw `El dato a hashear es undefined`
    
    const salt = bcrypt.genSaltSync()
    return bcrypt.hashSync(data, salt)
}
export const compareData = (data: string, hash: string) => {
    return bcrypt.compareSync(data, hash)
}