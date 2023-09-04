import { createSlice, nanoid } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const demoContacts = {
  items: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
};

export const contactsSlice = createSlice({
  name: 'contact',
  initialState: demoContacts,
  reducers: {
    addContact: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: newContact => {
        return {
          payload: { id: nanoid(), ...newContact },
        };
      },
    },
    deleteContact: (state, action) => {
      state.items = state.items.filter(
        contact => contact.id !== action.payload
      );
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = persistReducer(
  { key: 'contacts', storage },
  contactsSlice.reducer
);
