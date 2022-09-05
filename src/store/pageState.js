import { createSlice } from '@reduxjs/toolkit'
import stateEnum from './stateEnum.js'

export const pageState = createSlice({
    name: 'pageState',
    initialState: {
      value: {
        showNavbar: 1,
        loggedIn: stateEnum.LoggedOut
      }
    },
    reducers: {
      setNavbarOn: state => {
        state.value.showNavbar = 1
      },
      setNavbarOff: state => {
        state.value.showNavbar = 0
      },
      setLoggedIn: state => {
        state.value.loggedIn = stateEnum.LoggedIn
      },
      setLoggedOut: state => {
        state.value.loggedIn = stateEnum.LoggedOut
      }
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { setNavbarOn,  setNavbarOff, setLoggedIn, setLoggedOut} = pageState.actions
  
  export default pageState.reducer