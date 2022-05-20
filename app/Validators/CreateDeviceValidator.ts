import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateDeviceValidator {
  constructor(protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string([
      rules.minLength(3),
      rules.maxLength(200)
    ]),
    topic: schema.string([
      rules.regex(/:/),
      rules.unique({ column: 'topic', table: 'devices' })
    ])
  })

  public messages = {}
}
