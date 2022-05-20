import { test } from '@japa/runner'
import User from 'App/Models/User'
import { ClientFactory } from 'Database/factories'

test.group('Clients list', async () => {
  const user = await User.findOrFail(1)

  test('get an empty list of clients', async ({ client }) => {
    const response = await client.get('clients').loginAs(user)

    response.assertStatus(200)
    response.assertBodyContains({
      data: []
    })
  })

  test('get a list of clients', async ({ client, assert }) => {
    await ClientFactory.createMany(10)

    const response = await client.get('clients').loginAs(user)

    response.assertStatus(200)
    assert.isObject(response.body())
    assert.isArray(response.body().data)
  })

  test('get a client by id', async ({ client }) => {
    const fakeClient = await ClientFactory.create()
    const expectedOutput = fakeClient.toJSON()

    const response = await client.get(`clients/${fakeClient.id}`).loginAs(user)



    response.assertStatus(200)
    response.assertBodyContains({
      id: expectedOutput.id,
      name: expectedOutput.name,
      birthdate: expectedOutput.birthdate,
      document: expectedOutput.document,
    })
  })

  test('get a client not exists on database', async ({ client }) => {
    const response = await client.get('clients/192').loginAs(user)

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
