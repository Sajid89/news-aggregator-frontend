import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../features/auth/authSlice';

// Persist configuration
const persistConfig = {
    key: 'root',
    storage,
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, authReducer);

// Configure store
const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Persistor
const persistor = persistStore(store);

export { store, persistor };