import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ModelPaginatorContract } from '@ioc:Adonis/Lucid/Orm'
import Device from 'App/Models/Device'
import CreateDeviceValidator from 'App/Validators/CreateDeviceValidator'
import UpdateDeviceValidator from 'App/Validators/UpdateDeviceValidator'

export default class DevicesController {
  /**
   * Return list of devices
   * @returns Promise<ModelPaginatorContract<Device>>
   */
  public async index({ request }: HttpContextContract): Promise<ModelPaginatorContract<Device>> {
    const { page, perPage } = request.qs()

    return Device.query().paginate(page || 1, perPage || 10)
  }

  /**
   * Store a new instance of device
   * @param request RequestContract
   * @returns Promise<Device>
   */
  public async store({ request }: HttpContextContract): Promise<Device> {
    const { name, topic } = await request.validate(CreateDeviceValidator)

    return Device.create({
      name,
      topic
    })
  }

  /**
   * Find a device by its id
   * @param params Record<string, any>
   * @returns Promise<Device>
   */
  public async show({ params }: HttpContextContract): Promise<Device> {
    return Device.findOrFail(params.id)
  }

  /**
   * Update a device by its id
   * @param request RequestContract
   * @param params Record<string, any>
   * @returns Promise<Client>
   */
  public async update({ request, params }: HttpContextContract): Promise<Device> {
    const { name, topic } = await request.validate(UpdateDeviceValidator)

    const device = await Device.findOrFail(params.id)

    return device
      .merge({
        name,
        topic
      })
      .save()
  }

  /**
   * Delete an instance of device by its id
   * @param params Record<string, any>
   * @returns Promise<Device>
   */
  public async destroy({ params }: HttpContextContract): Promise<Device> {
    const device = await Device.findOrFail(params.id)

    device.delete()

    return device
  }
}
