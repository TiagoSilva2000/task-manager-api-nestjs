import { BadRequestException, RequestTimeoutException } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

export function passwordConfirmation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { password, password_confirmation: passConf } = req.body

  if (password && passConf) {
    if (passConf === password) next()
    return res.status(400).send(new Error('passwords do not match'))
  }
  return res.status(400).send(new BadRequestException())
}
