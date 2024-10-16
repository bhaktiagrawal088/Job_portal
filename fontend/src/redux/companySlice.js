import Singlejob from "@/components/Jobs/Singlejob";
import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState : {
        Singlecompany : null,
    },
    reducers:{
        setSingleCompany:(state, action) => {
            state.Singlecompany = action.payload;
        }
    }
});
export const {setSingleCompany} = companySlice.actions;
export default companySlice.reducer;