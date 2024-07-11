import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/UserReducer";
import UserLoginReducer from "./reducers/UserLoginReducer";
import RegisterReducer from "./reducers/UsersReducer";
import ModalReducer from "./reducers/ModalReducer";
import PreviewImagesReducer from "./reducers/PreviewImagesReducer";
import ImagesPostReducer from "./reducers/ImagesPostReducer";
import PostReducer from "./reducers/PostReducer";
import PostsReducer from "./reducers/PostsReducer";
import CommentsParentReducer from "./reducers/CommentsParentReducer";
import CommentsChildReducer from "./reducers/CommentsChildReducer";
import UsersReducer from "./reducers/UsersReducer";
import UserAdminReducer from "./reducers/UserAdminReducer";
import ModalDetailUser from "../components/ModalDetailUser";
import GroupsReducer from "./reducers/GroupsReducer";

export const store=configureStore({
    reducer:{
        users:UsersReducer,
        user:UserReducer,
        userLogin:UserLoginReducer,
        register:RegisterReducer,
        modal:ModalReducer,
        previewImages:PreviewImagesReducer,
        imagesPost:ImagesPostReducer,
        posts:PostsReducer,
        post:PostReducer,
        commentsParent:CommentsParentReducer,
        commentsChild:CommentsChildReducer,
        userAdmin:UserAdminReducer,
        groups:GroupsReducer,
    }
})