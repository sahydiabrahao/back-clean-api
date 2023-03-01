export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://mongo:27017/back-clean-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || 'tj670==5H'
}
