import { Response } from "express"

export class Info {
    static status = 200
    
    // ### Data
    private static data: object | undefined
    public static setData(status: number, args: object){
        this.clean()
        this.status = status
        this.data = args
    }

    // ### Errors
    private static errorMessage: object | undefined
    
    public static setPrismaError(status: number, error: any){
        this.clean()
        this.status = status
        this.errorMessage = {
            code: error.code, error: error.message
        }
    }

    public static setResponse(res: Response){
        res.status(this.status).json({
            ...this.data,
            ...this.errorMessage
        })
        this.clean()
    }   
    
    private static clean(){
        this.status = 200
        this.errorMessage = undefined
        this.data = undefined
    }

}