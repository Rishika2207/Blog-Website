// The second set of code defines a Redux slice named "auth" with reducers for managing authentication-related state in a Redux store. It specifies how the authentication state should change in response to actions like logging in and logging out.

import {createSlice} from '@reduxjs/toolkit'
const initialState={
    status:false,
    userData:null
}
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.userData=action.payload.userData;
        },
        logout:(state,action)=>{
            state.status=false;
            state.userData=null;
        }
    }
})
// const initialState1={
//     status:false,
//     postData:null
// }
// const postSlice=createSlice({
//     name:'post',
//     initialState:initialState1,
//     reducers:{
//         create:(state,action)=>{
//             state.status=true;
//             state.postData=action.payload.postData;
//         },
//         deletePost:(state,action)=>{
//             state.status=false;
//             state.postData=null;
//         }
//     }
// })
export const {login,logout}=authSlice.actions;//authslice mai joh reducers h usem joh function h usko actions kehte h
// export const {create,deletePost}=postSlice.actions;
// export {postSlice};
export default authSlice.reducer;