const express = require('express')
const path = require('path')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const cookieParser = require('cookie-parser')
// const hpp = require('hpp')
const cors = require('cors')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const timerRouter = require('./routes/timerRoutes')
const userRouter = require('./routes/userRoutes')
const reportRouter = require('./routes/reportRoutes')

const app = express()
app.enable('trust proxy')
app.use(
  cors({
    origin: ['https://12hourstudy.netlify.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  })
)
app.options('*', cors())
app.set('view engine', 'ejs')
// set dir for pug views
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(helmet())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// rate limiting
const limiter = rateLimit({
  max: 5000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP; please try again in an hour.',
})
app.use('/api', limiter)

app.use(express.json({ limit: '10kb' }))
app.use(cookieParser())
app.use(mongoSanitize())
app.use(xss())
/*
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverge',
      'maxGroupSize',
      'difficulty',
      'price'
    ]
  })
);
*/
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString()
  next()
})

const APIVersion = 'v1'

app.use(`/api/${APIVersion}/users`, userRouter)
app.use(`/api/${APIVersion}/timers/`, timerRouter)
app.use(`/api/${APIVersion}/reports/`, reportRouter)

app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find URL ${req.originalUrl} on this server`, 404))
})

app.use(globalErrorHandler)

exports.APIVersion = APIVersion
module.exports = app
