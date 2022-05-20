import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UpdateDeviceValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string([
      rules.minLength(3),
      rules.maxLength(200)
    ]),
    topic: schema.string([
      rules.alpha(),
      rules.unique({
        column: 'topic',
        table: 'devices',
        whereNot: {
          id: this.ctx.params.id
        }
      })
    ])
  })

  public messages = {}
}
