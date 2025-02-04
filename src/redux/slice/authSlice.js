import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";


const initialState = {
    user: {
        userName: null,
        email: null
    },
    isLoading: false,
    error: null,
    isLoggedIn: false
}

export const registerUser = createAsyncThunk(
    'user-authentication/registerUser',
    async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
        try {
            const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(userCredentials.user, {
                displayName: `${firstName} ${lastName}`
            })
            return {
                displayName: userCredentials.user.displayName,
                email: userCredentials.user.email
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const loginUser = createAsyncThunk(
    "user-authentication",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password)
            return {
                displayName: userCredentials.user.displayName,
                email: userCredentials.user.email
            }
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const logoutUser = createAsyncThunk(
    "authSlice/logoutUser",
    async (_, { rejectWithValue }) => {
        console.log("Inside Logout");
        try {
            await signOut(auth)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const checkUserSession = createAsyncThunk(
    "authSlice/checkUserSession",
    async (_, { rejectWithValue }) => {
        return new Promise((resolve) => {
            onAuthStateChanged(auth, (user) => {
                resolve(user)
            })
        })
    }
)

export const resetUserPassword = createAsyncThunk(
    "authSlice/resetUserPassword",
    async (email, { rejectWithValue }) => {
        try {
            await sendPasswordResetEmail(auth, email)
            console.log("Email sent")
            return "Password reset e-mail sent successfully"
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)



const authSlice = createSlice(
    {
        name: "user-authentication",
        initialState,
        reducers: {
            setError: (state, action) => {
                state.error = action.payload
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(registerUser.pending, (state) => {
                    state.isLoading = true,
                        state.error = null;
                })
                .addCase(registerUser.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.user.userName = action.payload.displayName;
                    state.user.email = action.payload.email;
                })
                .addCase(registerUser.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload
                })
                .addCase(loginUser.pending, (state) => {
                    state.isLoading = true
                    state.error = null
                })
                .addCase(loginUser.fulfilled, (state, action) => {
                    state.isLoading = false,
                        state.user.userName = action.payload.displayName,
                        state.user.email = action.payload.email
                })
                .addCase(loginUser.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload
                })
                .addCase(logoutUser.pending, (state) => {
                    state.isLoading = true;
                    state.error = null
                })
                .addCase(logoutUser.fulfilled, (state) => {
                    state.isLoading = false;
                    state.user.userName = null;
                    state.user.email = null;
                })
                .addCase(checkUserSession.fulfilled, (state, action) => {
                    if (action.payload) {
                        state.user.userName = action.payload.displayName
                        state.user.email = action.payload.email
                    }
                })
                .addCase(resetUserPassword.pending, (state) => {
                    state.isLoading = true;
                    state.error = null
                })
                .addCase(resetUserPassword.fulfilled, (state, action) => {
                    state.isLoading = false;
                })
                .addCase(resetUserPassword.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload
                })
        }
    }
)

export const { setError } = authSlice.actions
export default authSlice.reducer;