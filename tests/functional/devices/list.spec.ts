import { test } from '@japa/runner'
import { DeviceFactory } from 'Database/factories'
import User from 'App/Models/User'

test.group('Devices list', async () => {
  const user = await User.findOrFail(1)

  test('get an empty list of devices', async ({ client }) => {
    const response = await client.get('devices').loginAs(user)

    response.assertStatus(200)
    response.assertBodyContains({
      data: []
    })
  })

  test('get a list of devices', async ({ client, assert }) => {
    await DeviceFactory.createMany(10)

    const response = await client.get('devices').loginAs(user)

    response.assertStatus(200)
    assert.isObject(response.body())
    assert.isArray(response.body().data)
  })

  test('get a device by id', async ({ client }) => {
    const fakeClient = await DeviceFactory.create()
    const expectedOutput = fakeClient.toJSON()

    const response = await client.get(`devices/${fakeClient.id}`).loginAs(user)



    response.assertStatus(200)
    response.assertBodyContains({
      id: expectedOutput.id,
      name: expectedOutput.name,
      topic: expectedOutput.topic,
    })
  })

  test('get a device not exists on database', async ({ client }) => {
    const response = await client.get('devices/192').loginAs(user)

    response.assertStatus(404)
    response.assertBodyContains({
      errors: [
        {
          message: 'Entity not found'
        }
      ]
    })
  })
})
