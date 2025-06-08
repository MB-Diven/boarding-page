import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
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
  address: string;
  welcome_message: string;
  about: string;
  custom_domain?: string;
  site_id?: string;
  product_ids: string[];
}

export interface Product {
  name: string;
  sales: number;
  photo: string;
  id: number;
  price: number;
  duration: number;
  description: string;
}

export interface Worker {
  id: string;
  name: string;
  clients: number;
  revenue: number;
  contact: string;
  services: string[];
  rating: number;
  photo?: string;
  product_ids: number[];
}

export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  last_visit: string;
  total_spent: number;
}

export interface UserState {
  user?: User;
  workers: { workers: Worker[]; totalRev: number };
  products: Product[];
  clients?: Client[];
}

const initialState: UserState = {
  user: undefined,
  workers: { workers: [], totalRev: 0 },
  products: [],
  clients: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setClients: (state, action: PayloadAction<Client[]>) => {
      state.clients = action.payload;
    },
    setWorkers: (
      state,
      action: PayloadAction<{ workers: Worker[]; totalRev: number }>
    ) => {
      state.workers = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setProducts, setClients, setWorkers } =
  userSlice.actions;

export default userSlice.reducer;
