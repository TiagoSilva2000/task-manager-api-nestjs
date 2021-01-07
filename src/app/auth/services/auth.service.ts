import { BadRequestException, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { ValidationDto } from '../dtos/validation.dto'
import { LoginDto } from '../dtos/login.dto'
import UserService from '../../user/services/user.service'
import TokenService from './token.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly userService: UserService
  ) {}

  async validate({ email, password }: ValidationDto): Promise<unknown> {
    try {
      if (!email || !password) throw new BadRequestException()

      const user = await this.userService.findByEmail(email)
      const success = await bcrypt.compare(password, user.password)
      if (!success) throw new BadRequestException()

      const { password: pass, ...result } = user
      return result
    } catch (e) {
      return e
    }
  }

  async loginJwt(loginData: LoginDto) {
    return this.tokenService.createJwt(loginData)
  }

  logoutJwt() {
    return { message: 'successfully logged out' }
  }

  // async revokeToken(tokenId: number) {
  //   try {
  //     const tokenRepo = getRepository(Token)
  //     const token = await tokenRepo.findOneOrFail(tokenId)
  //     token.is_revoked = true
  //     await tokenRepo.save(token)
  //   } catch(e) {
  //     throw new Error('token not found')
  //   }
  // }
}
