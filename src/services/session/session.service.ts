import {Injectable} from '@nestjs/common'

@Injectable()
export default class SessionService {

  async create(): Promise<string> {
    return 'a'
  }

  async delete(): Promise<string> {
    return 'b'
  }
}