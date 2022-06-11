import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersService } from './users.service';
let service: AuthService;
describe('AuthService', () => {
  beforeEach(async () => {
    //More intellegent mocks
    const users: User[] = [];

    //create a fake copy of the users service
    //Partial to not force define every method
    const fakeUsersService: Partial<UsersService> = {
      find: async (email: string) => {
        return users.filter((user) => user.email === email);
      },
      create: async (email: string, password: string) => {
        const user = { id: users.length, email, password } as User;
        users.push(user);
        return user;
      },
    };

    //This code create a new DI container
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  it('Can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });
  //   it('Can create an instance of auth service', async (done) => {
  //     //Some async tasks
  //     //done() when everything is complete
  //   });
});

//
