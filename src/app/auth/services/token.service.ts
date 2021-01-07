import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { LoginDto } from '../dtos/login.dto'
import TokenRepository from '../repositories/token.repository'

@Injectable()
export default class TokenService {
  constructor(
    @InjectRepository(TokenRepository)
    private readonly tokenRepository: TokenRepository,
    private readonly jwtService: JwtService
  ) {}

  async createJwt({ email, id }: LoginDto) {
    const payload = { email, sub: id }
    const token = this.jwtService.sign(payload)
    return this.tokenRepository.createToken(id, token)
  }
}
