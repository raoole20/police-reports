

export const loginService = {
    login: async (policeID: string, password: string) => {
        try {
            return {
                status: 200,
                message: 'Login Successful',
                data: {
                    policeID: policeID,
                    password,
                    token: null,
                }
            }
        } catch (error) {
            console.error(error)
            return {
                status: 500,
                data: null,
                message: 'Internal Server Error',
            }   
        }
    }   
}