import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { FormState, MyFormData } from '../types/form.types';

const initialState: FormState = {
  currentTab: 1,
  formData: {
    name: '',
    email: '',
    city: '',
    phone: '',
    address: '',
    agreement: false,
    id: ''
  },
};


export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: <K extends keyof MyFormData>(
      state: FormState,
      action: PayloadAction<{ id: K; value: MyFormData[K] }>
    ) => {
      state.formData[action.payload.id] = action.payload.value;
    },
    setTab: (state, action: PayloadAction<number>) => {
      state.currentTab = action.payload;
    },
  },
});

export const { updateField, setTab } = formSlice.actions;
export default formSlice.reducer;