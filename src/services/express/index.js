import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import { errorHandler as queryErrorHandler } from 'querymen'
import { errorHandler as bodyErrorHandler } from 'bodymen'
import { env } from '../../config'

export default (apiRoot, routes) => {
  const app = express()

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors())
    app.use(compression())
    app.use(morgan('dev'))
  }

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(apiRoot, routes)

  app.use(queryErrorHandler())
  app.use(bodyErrorHandler())

  app.all('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`)
    err.status = 404
    err.code = 404
    err.statusCode = 404

    next(err)
  })

  // error handler middleware
  app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
      error: {
        code: error.code || 5,
        status: error.status || 500,
        message: error.message || 'Something went very wrong!'
      }
    })
  })

  return app
}
