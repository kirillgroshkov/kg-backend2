import { RequestHandler } from 'express'

export const notFoundHandler: RequestHandler = (req, res) => {
  res
    .contentType('text/plain')
    .status(404)
    .send('404 Not Found: ' + req.url)
}
