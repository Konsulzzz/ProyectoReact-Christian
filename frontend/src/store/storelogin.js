import { createSlice } from '@reduxjs/toolkit'
const initialAuthState = {
    isAutenticated: false,
    userName: '',
    userRol: '',
    isInvitado: false

}
const authSlice = createSlice({
    name: 'authentication',
    initialState: initialAuthState,
    reducers: {
        login: (state, action) => {
            const userData = action.payload
            state.isAutenticated = true
            state.userName = userData.name
            state.userRol = userData.rol
            if(state.userRol == 'invitado'){
                state.isInvitado = true
            }
        },
        logout: (state) => {
            state.isAutenticated = false
            state.userName = ''
            state.userRol = ''
        }
    }
})
export const loginActions = authSlice.actions
export default authSlice.reducer
