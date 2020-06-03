export interface loginAuthData {
  email: string;
  password: string;
}

export interface CurrentUserDetails {
  id: string;
  firstName: string;
  lastName: string;
  imgURL: string;
}
export interface UserDetails {
  joinedDate: String;
  email: string;
  firstName: string;
  location: string;
  lastName: string;
  info: string;
  imgURL: string;
  birthDate: string;
  userType: string;
}
export interface UserImg {
  imgURL: string;
}
export interface currentUserID {
  userID: string;
}
