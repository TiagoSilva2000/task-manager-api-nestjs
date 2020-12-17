import { Test, TestingModule } from '@nestjs/testing'
import { AppService } from '../../app.service'
import { AppController } from './app.controller'

const mockService = () => ({ getHello: jest.fn() })

describe('AppController', () => {
  let controller: AppController
  let service: jest.Mocked<AppService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppController,
        { provide: AppService, useFactory: mockService }
      ]
    }).compile()
    controller = module.get(AppController)
    service = module.get(AppService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
    expect(service).toBeDefined()
  })

  it('getHello', () => {
    const value = 'SpaceRocket'
    service.getHello.mockReturnValue(value)
    const result = controller.getHello()
    expect(service.getHello).toHaveBeenCalled()
    expect(result).toEqual(value)
  })
})
