import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  googleLogin(req) {
    if (!req.user) {
      return {
        message:'Ha ocurrido un error con tu correo.'
      }
    }
    return {
      user: req.user
    }
  }
}
