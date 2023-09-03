// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import loginSlice from './apps/auth/login/index'
import registerSlice from './apps/auth/register'
import loginFirstTimeSlice from './apps/auth/loginFirstTime'
import usersSlice from 'src/store/apps/users'
import dashboardSlice from './apps/dashboard/dashboardSlice'

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    login: loginSlice,
    register: registerSlice,
    loginFirstTime: loginFirstTimeSlice,
    usersNames: usersSlice,
    dashboardAnalytics: dashboardSlice
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
