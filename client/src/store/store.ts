import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/UserReducer";
import UserLoginReducer from "./reducers/UserLoginReducer";
import RegisterReducer from "./reducers/RegisterReducer";
import ModalReducer from "./reducers/ModalReducer";
import PreviewImagesReducer from "./reducers/PreviewImagesReducer";

export const store=configureStore({
    reducer:{
        user:UserReducer,
        userLogin:UserLoginReducer,
        register:RegisterReducer,
        modal:ModalReducer,
        previewImages:PreviewImagesReducer,
    }
})