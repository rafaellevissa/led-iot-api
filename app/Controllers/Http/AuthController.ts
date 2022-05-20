import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/User'
import LoginValidator from 'App/Validators/LoginValidator'

export default class AuthController {
  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator)

    const user = await User.findBy('email', email)

    if (!user) {
      return response.badRequest('Invalid credentials')
    }

    if (!(await Hash.verify(user.password, password))) {
      return response.badRequest('Invalid credentials')
    }

    const token = await auth.use('api').generate(user, {
      expiresIn: '1h',
    })

    return response.ok(token)
  }

  public async logout({ auth, response }) {
    await auth.use('api').revoke()

    return response.ok({
      revoked: true,
    })
  }
}
