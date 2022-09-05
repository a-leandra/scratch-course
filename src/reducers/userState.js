import { createSlice } from '@reduxjs/toolkit'
import stateEnum from './stateEnum.js'

export const userState = createSlice({
    name: 'userState',
    initialState: {
      value: stateEnum.LoggedOut
    },
    reducers: {
      setLoggedIn: state => {
        state.value = stateEnum.LoggedIn
      },
      setLoggedOut: state => {
        state.value = stateEnum.LoggedOut
      }
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { setLoggedIn,  setLoggedOut} = userState.actions
  
  export default userState.reducer