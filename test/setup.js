import { EventEmitter } from 'events'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from '../src/services/mongoose'

EventEmitter.defaultMaxListeners = Infinity
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000

global.Array = Array
global.Date = Date
global.Function = Function
global.Math = Math
global.Number = Number
global.Object = Object
global.RegExp = RegExp
global.String = String
global.Uint8Array = Uint8Array
global.WeakMap = WeakMap
global.Set = Set
global.Error = Error
global.TypeError = TypeError
global.parseInt = parseInt
global.parseFloat = parseFloat

let mongoServer

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connection.on('connected', () => {
  console.log('\x1b[32m%s \x1b[0m', 'Connected to in-memory MongoDB test environment');
});

mongoose.connection.on('disconnected', () => {
  console.log('\x1b[31m%s \x1b[0m', 'Disconnected in-memory MongoDB test environment');
});

beforeAll(async () => {
  try {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, opts);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});

afterAll(async ()=> {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  const { collections } = mongoose.connection
  const promises = []
  Object.keys(collections).forEach((collection) => {
    promises.push(collections[collection].deleteMany({}))
  })
  await Promise.all(promises)
})
