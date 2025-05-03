import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  redusers: {},
  extraReducers: (builder) => {
    builder
      // fetchContacts
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      //addContact
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addContact.rejected, handleRejected)
      //deleteContact
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload.id,
        );
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});

export const selectContacts = (state) => state.contacts.items;
export default contactsSlice.reducer;
