import server from '@server/app'
import supertest from 'supertest'

const app = () => supertest(server)

const HEALTH_ENDPOINT = '/api/v1/healthcheck'

describe('Healthcheck', () => {
  it('returns 200 if server is healthy', async () => {
    const response = await app().get(HEALTH_ENDPOINT, null)
    expect(response.status).toBe(200)
  })
})
