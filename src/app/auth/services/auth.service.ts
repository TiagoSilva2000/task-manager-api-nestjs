import { Injectable, PreconditionFailedException } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { ValidationDto } from '../dtos/validation.dto'
import UserEntity from '../../user/models/user.entity'
import { getRepository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from 'src/app/auth/dtos/login.dto'
import Token from '../models/token.entity'


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validate({ email, password }: ValidationDto): Promise<unknown> {
    try {
      if (!email || !password)
        throw new Error('dados não definidos para validação')

      const userRepo = getRepository(UserEntity)
      const user = await userRepo.findOneOrFail({
        where: { email },
        select: ['id', 'email', 'password', 'name']
      })
      const success = await bcrypt.compare(password, user.password)
      if (success) {
        const { password, ...result } = user
        return result
      }
      throw new Error('falha')
    } catch (e) {
      return new Error(e.message)
    }
  }

  async loginJwt({ email, id }: LoginDto, authHeader: string) {
    if (authHeader) { // update checking
      throw new PreconditionFailedException
    }

    const payload = { email, sub: id }
    const tokenRepo = getRepository(Token)
    const token = tokenRepo.create({
      token: this.jwtService.sign(payload),
      token_type: 'jwt',
      user_id: id
    })
    
    await tokenRepo.save(token)

    return token
  }

  async logoutJwt(authHeader: string) {
    try {
    if (!authHeader)
      throw new Error("there's no user logged in")
      // await this.revokeToken()
      return {message: 'successfully logged out'}
    } catch(e) {
      return new Error(e.message)
    }
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
