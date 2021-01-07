import { BadRequestException, RequestTimeoutException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

export function passwordConfirmation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { password, password_confirmation: passConf } = req.body

  if (!password && !passConf) return next()

  if (password && passConf) {
    if (passConf === password) return next()
    return res
      .status(400)
      .send(new BadRequestException('passwords did not match'))
  }
  return res.status(400).send(new BadRequestException())
}
