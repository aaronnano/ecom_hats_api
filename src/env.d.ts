declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string
            SECRET_KEY: string
            API_URL: string
            timeToken: string
        }
        
    }
}

export {}