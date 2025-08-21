export interface IAuthSignin{
message:string;
token:string;
refresh_token:string;
role:string;
}
export interface IAuthSignup{
message:string;
userId:string;

}
export interface IAuthSendCode{
  message:string
}
export interface IAuthForgetPassword{
  message:string
  token:string;
refresh_token:string;
}