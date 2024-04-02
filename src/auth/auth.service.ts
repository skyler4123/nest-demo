import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { sign, decode, verify } from 'jsonwebtoken'

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService
  ) {}

  auth() {
    return 'This action for test auth';
  }

  encrypt(password: string|number) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const password_digest = hash
    return password_digest
  }

  payloadForEncode({user}) {
    return {
      id: user.id,
      email: user.email
    }
  }
  encode({user}) {
    const payload = this.payloadForEncode({user: user})
    const token = sign(payload, 'secret', { algorithm: 'HS256', expiresIn: 5 * 60 });
    return token
  }

  isValidatedToken({token}) {
    return !!verify(token, 'secret', { algorithms: ['HS256'] })
  }

  async signin({query}) {
    const user = await this.usersService.findByEmail(query.email)
    const isCorrectUser = bcrypt.compareSync(query.password, user.password_digest);
    if (isCorrectUser) {
      const token = this.encode({user: user})
      return {...user, token: token }
    }
  }

  async signup({body}) {
    const user = this.usersService.create({
      email: body.email,
      password: body.password
    })
    return user
  }
}
