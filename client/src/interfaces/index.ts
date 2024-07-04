export type Comment={
    id:string,
    userId:string,
    detail:string,
    date:string,
}
export type Post={
    id:string,
    idUser:string,
    detail:string,
    date:number,
    fullDate:string,
    images:string[],
    comments:Comment[],
    favouristUsers:User[],   
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
}