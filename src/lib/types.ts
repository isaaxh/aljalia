export type TUserData = {
    uid: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
}


export type TAdminList = TAdmin[]

export type TAdmin = {
    phoneNumber: string
}