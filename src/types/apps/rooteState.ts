export interface RootState {
  login: {
    data: {
      authorization: {
        token: string
        user: {
          id: string
          first_name: string
        }
        success: boolean
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

export interface DashboardAnalytics {
  dashboardAnalytics: {
    data: {
      Status: number
      Message: string
      Type: string
      Report: {
        Sale_section: {
          Sale: number
          Percent: number
        }
        Purchase_section: {
          Purchase: number
          Percent: number
        }
        Expense_section: {
          Expense: string
          Percent: number
        }
      }
      Currency: string
      Profit: {
        Profit: number
      }
    }
  }
}
