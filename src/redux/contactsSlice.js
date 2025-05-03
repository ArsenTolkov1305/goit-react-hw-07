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
    items: [], // Початкові контакти
    loading: false,
    error: null,
  },
  reducers: {}, // Виправлено назву
  extraReducers: (builder) => {
    builder
      // fetchContacts
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload; // Виправлено на items
      })
      .addCase(fetchContacts.rejected, handleRejected)
      // addContact
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload); // Виправлено на items
        state.loading = false;
        state.error = null;
      })
      .addCase(addContact.rejected, handleRejected)
      // deleteContact
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload.id
        ); // Виправлено на items
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});

export const selectContacts = (state) => state.contacts.items; // Виправлено на items
export default contactsSlice.reducer;
