import Factory from '@ioc:Adonis/Lucid/Factory'
import Device from 'App/Models/Device'


export const DeviceFactory = Factory
  .define(Device, ({ faker }) => {
    return {
      name: faker.internet.userName(),
      topic: faker.datatype.string()
    }
  })
  .build()