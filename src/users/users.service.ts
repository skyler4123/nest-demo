import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CheckData } from 'src/utilities/check_data';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  index({query}) {
    if (CheckData.isEmptyObject(query)) {
      return this.findAll();
    } else if (query.email) {
      return this.findByEmail(query.email)
    } else if (query.id) {
      return this.findById(query.id)
    }
  }
  
  async create(createUserDto: CreateUserDto) {
    const email = createUserDto.email
    const password = createUserDto.password
    const password_digest = this.authService.encrypt(password)
    const user = this.usersRepository.create({
      email: email,
      password_digest: password_digest
    })
    await this.usersRepository.save(user)
    const token = this.authService.encode({user: user})
    return({...user, token: token});
  }

  findAll() {
    return this.usersRepository.find()
  }

  findById(id) {
    return this.usersRepository.findOneBy({id: id})
  }

  findByEmail(email) {
    return this.usersRepository.findOneBy({email: email})
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
