import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  created_at: string;
  businessName: string;
  logo: string;
  worker_ids: number[];
  updated_at: string;
  businessType: string;
  auth_id: string;
  stripe_account_id: string;
  email: string;
  businessDescription: string;
  primaryColor: string;
  inventorySize: string;
  rentalPeriod: string;
  contactPhone: string;
  additionalFeatures: string[];
  country: string;
  ip: string;
  unpaid_token: string;
}

export interface UserState {
  user?: User;
}

const initialState: UserState = {
  user: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
