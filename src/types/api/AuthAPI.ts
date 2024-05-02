export interface PostAuthSignUpReq {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export interface PostAuthSignInReq {
  email: string;
  password: string;
}

export interface PostProjectReq {
  title: string;
  type: string;
  content: string;
  image?: File;
}
