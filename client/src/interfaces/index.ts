export type CommentParent={
    id:string,
    idUser:string,
    avatarUser:string,
    userNameUser:string,
    postId:string,
    detail:string,
    date:number,
    comments:CommentChild[]
}
export type CommentChild={
    id:string,
    idUser:string,
    avatarUser:string,
    userNameUser:string,
    idParent:string,
    userNameParent:string,
    postId:string,
    detail:string,
    date:number,
}
export type Post={
    id:string,
    idUser:string,
    detail:string,
    date:number,
    fullDate:string,
    images:string[],
    comments:CommentParent[],
    favouristUsersById:string[],   
}
export type User={
    id:string,
    username:string,
    password:string,
    email:string,
    avatar:string,
    biography:string,
    gender:string,
    posts:Post[],
    followersById:string[],
    followUsersById:string[],
    status:boolean;
}
export type Modal={
    comments:boolean,
    avatar:boolean,
    post:boolean,
    uploadPost:boolean,
}
export type State={
    users:User[],
    user:User,
    userLogin:User,
    register:User[],
    modal:Modal,
    previewImages:string[],
    imagesPost:any[],
    post:Post,
}