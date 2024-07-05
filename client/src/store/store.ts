import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/UserReducer";
import UserLoginReducer from "./reducers/UserLoginReducer";
import RegisterReducer from "./reducers/UsersReducer";
import ModalReducer from "./reducers/ModalReducer";
import PreviewImagesReducer from "./reducers/PreviewImagesReducer";
import ImagesPostReducer from "./reducers/ImagesPostReducer";
import PostReducer from "./reducers/PostReducer";

export const store=configureStore({
    reducer:{
        user:UserReducer,
        userLogin:UserLoginReducer,
        register:RegisterReducer,
        modal:ModalReducer,
        previewImages:PreviewImagesReducer,
        imagesPost:ImagesPostReducer,
        post:PostReducer,
    }
})