import { createSlice } from '@reduxjs/toolkit'

export const pageState = createSlice({
    name: 'pageState',
    initialState: {
      value: 1
    },
    reducers: {
      setNavbarOn: state => {
        state.value = 1
      },
      setNavbarOff: state => {
        state.value = 0
      }
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { setNavbarOn,  setNavbarOff} = pageState.actions
  
  export default pageState.reducer