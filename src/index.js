// import app from './services/countdown-generator'
const Generator = require('./services/countdown-generator')

/**
 * testing scenario
 * if seconds > 59
 * if minutes > 59
 * \if hours > 99
 */

const generator = new Generator({
  // hours: 1,
  minutes: 1,
  seconds: 3,
  type: 'timer'
  // listener: {
  //   hour,
  //   minute,
  //   second,
  // }
})

generator.run()
