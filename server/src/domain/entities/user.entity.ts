import { PartialType } from '@nestjs/mapped-types';
import { Team } from './';
import { OptionalUserInitializerData } from '../types';

export class User {
  id: string;
  email: string;
  name: string;
  password: string;
  profile_pic?: string;
  teams?: Team[];

  constructor(data?: OptionalUserInitializerData) {
    this.id = data?.id;
    this.email = data?.email;
    this.name = data?.name;
    this.password = data.password;
    this.profile_pic = data.profile_pic;
  }
}


