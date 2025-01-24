import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
 id: number;
 email: string;
 first_name: string;
 last_name: string;
 avatar: string;
 isEmailVisible: boolean;
}

export interface UserState {
 users: User[];
 loading: boolean;
 error: string | null;
}

const initialState: UserState = {
 users: [],
 loading: false,
 error: null,
};

export const fetchUsers = createAsyncThunk(
 'users/fetchAll',
 async () => {
   let allUsers: User[] = [];
   let page = 1;
   let hasMore = true;

   while (hasMore) {
     const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
     const { data, total_pages } = response.data;
     
     allUsers = [...allUsers, ...data.map((user: User) => ({
       ...user,
       isEmailVisible: false
     }))];
     
     hasMore = page < total_pages;
     page++;
   }

   return allUsers;
 }
);

const userSlice = createSlice({
 name: 'user',
 initialState,
 reducers: {
   toggleEmailVisibility: (state, action) => {
     const user = state.users.find(u => u.id === action.payload);
     if (user) {
       user.isEmailVisible = !user.isEmailVisible;
     }
   },
 },
 extraReducers: (builder) => {
   builder
     .addCase(fetchUsers.pending, (state) => {
       state.loading = true;
     })
     .addCase(fetchUsers.fulfilled, (state, action) => {
       state.loading = false;
       state.users = action.payload;
     })
     .addCase(fetchUsers.rejected, (state, action) => {
       state.loading = false;
       state.error = action.error.message || 'Failed to fetch users';
     });
 },
});

export const { toggleEmailVisibility } = userSlice.actions;
export default userSlice.reducer;