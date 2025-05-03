import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Використовуємо localStorage
import contactsReducer from "./contactsSlice";
import filtersReducer from "./filtersSlice";

// Конфігурація для збереження контактів
const contactsPersistConfig = {
  key: "contacts",
  storage,
  whitelist: ["items"], // Зберігаємо тільки items
};

const rootReducer = combineReducers({
  contacts: persistReducer(contactsPersistConfig, contactsReducer),
  filters: filtersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Вимикаємо перевірку серіалізації для redux-persist
    }),
});

export const persistor = persistStore(store);
