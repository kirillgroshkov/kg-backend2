import { Application } from 'express'
import { Server } from 'http'

/**
 * Right now it just promisifies the server api.
 */
class ServerService {
  async startServer (app: Application, port: number): Promise<Server> {
    return new Promise<Server>((resolve, reject) => {
      const server = app.listen(port, (err: Error) => {
        if (err) return reject(err)
        resolve(server)
      })
    })
  }

  async stopServer (server: Server): Promise<void> {
    await new Promise(r => server.close(r))
  }
}

export const serverService = new ServerService()
