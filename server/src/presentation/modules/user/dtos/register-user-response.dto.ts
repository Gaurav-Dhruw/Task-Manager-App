export class RegisterUserResponseDto {
  id: string;
  email: string;
  name: string;
  profile_pic?: string;
  token: string;

  constructor(data?: {
    id?: string;
    email?: string;
    name?: string;
    profile_pic?: string;
    token?: string;
  }) {
    this.id = data?.id;
    this.email = data?.email;
    this.name = data?.name;
    this.profile_pic = data?.profile_pic;
    this.token = data?.token;
  }
}
