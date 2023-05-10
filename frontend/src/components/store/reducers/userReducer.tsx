// import { Action } from '../actions/index'
// import { ActionType } from '../action-types'

// // const reducer = (state: number, action: Action) => {
// //   switch (action.type) {
// //     case ActionType.DEPOSIT:
// //       return state + action.payload
// //     case ActionType.WITHDRAW:
// //       return state - action.payload
// //     case ActionType.BANKRUPT:
// //       return 0
// //     default:
// //       return state
// //   }
// // }

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import Api from '../../../Api'
// // https://github.com/fkhadra/react-toastify
// import { ToastContainer, toast } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

// export const loginUser = createAsyncThunk(`login`, async (data) => {
//   const response = await Api.loginUser(`login`)
//   if (response) {
//     let user = await Api.loggedinUser(data.username)
//     localStorage.setItem('user', JSON.stringify(user.user))
//     localStorage.setItem('token', JSON.stringify(response))

//     toast(`Hi ${user.user.username}`)
//     return user
//   }
// })

// const userSlice = createSlice({
//   name: 'user',
//   initialState: { isLoggedIn: false, currentUser: {} },
//   reducers: {
//     logout: (state) => {
//       state.isLoggedIn = false
//       state.currentUser = {}
//       localStorage.clear()
//       toast(`Logout Successful`)
//     },
//   },
//   extraReducers: {
//     [loginUser.pending]: (state, action) => {
//         state.loading = true
//     }
//   }
// })

// // export default userSlice;

// // function App() {
// //   const notify = () => toast('Wow so easy!')

// //   return (
// //     <div>
// //       <button onClick={notify}>Notify!</button>
// //       <ToastContainer />
// //     </div>
// //   )
// // }

// export default reducer
