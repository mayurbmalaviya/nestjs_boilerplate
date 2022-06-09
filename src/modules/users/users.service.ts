import { User } from './user.entity';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { messages } from './constants';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInUserDto } from './dto/sign-in-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
) { }

  async signup(createUser: CreateUserDto) {
    if (createUser.email == null || createUser.email == undefined || createUser.email == '') {
        throw new NotFoundException(messages.emailRequired);
    }
    const user = await this.userRepo.findOne({ where: { email: createUser.email } });
    if (user || user != undefined) {
        throw new ConflictException(messages.userAlreadyExists);
    }
    const newUser = await this.userRepo.create();
    newUser.name = createUser.name;
    newUser.email = createUser.email;
    newUser.password = createUser.password;
    newUser.address = createUser.address;
    newUser.isVerified = createUser.isVerified;
    return await this.userRepo.save(newUser);
  }

  async signIn(user: SignInUserDto) {
    if (user.email == null || user.email == undefined || user.email == '') {
      throw new NotFoundException(messages.emailRequired);
    }
    
    const result = await this.userRepo.findOne({where: {email: user.email, password: user.password}});
    if(result == null || result == undefined) {
      throw new NotFoundException(messages.userNotRegistered);
    }

    return result;
  }

}
