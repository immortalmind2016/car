import { Expose } from 'class-transformer';

// Nest will apply it when it turn this instance into JSON
export class UserDto {
  @Expose()
  id: number;
  @Expose()
  email: string;
}
