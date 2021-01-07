import { InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import UserService from '../../user/services/user.service'
import { jwtConstants } from '../constants'
import { AuthService } from './auth.service'
import * as bcrypt from 'bcrypt'
import TokenService from './token.service'
import TokenRepository from '../repositories/token.repository'

const mockUserService = () => ({
  findByEmail: jest.fn()
})

const mockTokenService = () => ({
  createJwt: jest.fn()
})

describe('AuthService', () => {
  let authService: AuthService
  let userService
  let jwtService
  let data
  let tokenService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: jwtConstants.secretKey,
          signOptions: { expiresIn: '1d' }
        })
      ],
      providers: [
        AuthService,
        TokenRepository,
        { provide: TokenService, useFactory: mockTokenService },
        { provide: UserService, useFactory: mockUserService }
      ]
    }).compile()

    tokenService = module.get<TokenService>(TokenService)
    jwtService = module.get<JwtService>(JwtService)
    userService = module.get<UserService>(UserService)
    authService = module.get<AuthService>(AuthService)
  })
  it('should be defined', () => {
    expect(authService).toBeDefined()
    expect(userService).toBeDefined()
    expect(jwtService).toBeDefined()
    expect(tokenService).toBeDefined()
    // expect(userRepo).toBeDefined()
  })

  describe('validate', () => {
    // it('should throw error, if enough data was not provided', async () => {
    //   const data = {
    //     email: 'mail@mail.com',
    //     password: undefined
    //   }
    //   try {
    //     await authService.validate(data)
    //  } catch(e) {
    //     expect(e).toBeInstanceOf(BadRequestException)
    //   }

    it('should throws error if the user does not exist', async () => {
      data = {
        email: 'mail@mail.com',
        password: 'pass'
      }
      userService.findByEmail.mockResolvedValue(null)
      try {
        await authService.validate(data)
      } catch (e) {
        expect(userService.findByEmail).toHaveBeenCalled()
        expect(e).toBeInstanceOf(NotFoundException)
      }
    })

    it('should throws error when passwords did not match', async () => {
      data = {
        email: 'mail@mail.com',
        password: 'pass'
      }
      userService.findByEmail.mockResolvedValue({
        email: data.email,
        name: 'name',
        id: 1,
        password: 'passw'
      })

      try {
        await authService.validate(data)
      } catch (e) {
        expect(userService.findByEmail).toHaveBeenCalled()
        expect(e).toBeInstanceOf(InternalServerErrorException)
      }
    })

    it('should return the user data when everything goes well', async () => {
      const input_data = {
        email: 'mail@mail.com',
        password: 'password123'
      }
      data = {
        email: 'mail@mail.com',
        id: 1,
        name: 'name'
      }
      const stored_pass = bcrypt.hashSync('password123', 10)
      userService.findByEmail.mockResolvedValue({
        ...data,
        password: stored_pass
      })
      const results = await authService.validate(input_data)
      expect(userService.findByEmail).toHaveBeenCalled()
      expect(results).toEqual(data)
    })
  })

  describe('loginJwt', () => {
    it('should return a token if goes wells', async () => {
      const data = {
        email: 'mail@mail.com',
        id: 1
      }
      const token = {
        token: jwtService.sign(data),
        token_type: 'jwt',
        user_id: data.id
      }
      tokenService.createJwt.mockResolvedValue(token)

      const result = await authService.loginJwt(data)
      expect(tokenService.createJwt).toHaveBeenCalled()
      expect(result).toEqual(token)
    })
  })

  describe('logoutJwt', () => {
    it('should return a success message', () => {
      expect(authService.logoutJwt()).toEqual({
        message: 'successfully logged out'
      })
    })
  })
})
