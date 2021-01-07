import { EntityRepository, Repository } from 'typeorm'
import Token from '../models/token.entity'

@EntityRepository(Token)
export default class TokenRepository extends Repository<Token> {
  async createToken(user_id: number, tokenValue: string) {
    const token = this.create({
      token: tokenValue,
      token_type: 'jwt',
      user_id
    })
    await this.save(token)

    return token
  }
}
