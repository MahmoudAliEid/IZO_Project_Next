export interface RootState {
  login: {
    data: {
      authorization: {
        token: string
        user: {
          id: string
          first_name: string
        }
      }
      status: string | boolean
      message: string
      imgUrl: string
    }
    login_first_time: boolean | null
    authorization: any
    user: object
    userType: string
    token: string
    status: 'idle' | 'loading' | 'success' | 'error'
    error: Error | null
    imgUrl: string
    userName: string
    apiUrl: string
  }
}

export interface RootStateRegister {
  register: {
    data: {
      status: number
    }
  }
}
export interface RootStateUsers {
  usersNames: {
    data: {
      status: number
      users: object[]
    }
  }
}
