import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'

@Injectable()
export default class OwnerAuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest()
    const id = parseInt(req.params.userId)
    const { userId } = req.user

    console.log({
      id,
      userId
    })
    if (id != userId) throw new UnauthorizedException()

    return true
  }
}
