const App = require('../src/services/countdown-generator')

// const countdown = new App({
//   // hours: 1,
//   // minutes: 1,
//   seconds: 10,
//   // type: "timer",
//   // listener: {
//   //   hour: setHour,
//   //   minute: setMinute,
//   //   second: setSecond
//   // },
//   // backupPlan,
//   // onFinish
//   // debug: true
// });

describe('Test', () => {
  it('given 10 as value on seconds, should end on 10 seconds', () => {
    const countdown = new App({
      // hours: 1,
      // minutes: 1,
      seconds: 10,
      // type: "timer",
      // listener: {
      //   hour: setHour,
      //   minute: setMinute,
      //   second: setSecond
      // },
      // backupPlan,
      // onFinish
      // debug: true
    });
    countdown.run()
    expect(countdown.duration).toBe(11000)
  })
})