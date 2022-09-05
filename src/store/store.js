import { configureStore } from '@reduxjs/toolkit'
import pageState from './pageState.js'

export default configureStore({
  reducer: {
    pageState: pageState,
  }
})