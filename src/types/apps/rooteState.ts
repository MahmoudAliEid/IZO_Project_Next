export interface RootState {
  login: {
    data: {
      authorization: {
        user: {
          id: string
          first_name: string
        }
      }
      status: string | boolean
      message: string
    }
    login_first_time: boolean | null
    authorization: any
    user: object
    userType: string
    token: string
    status: 'idle' | 'loading' | 'success' | 'error'
    error: Error | null
  }
}

export interface RootStateRegister {
  register: {
    data: {
      status: number
    }
  }
}
