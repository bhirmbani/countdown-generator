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

/**
 * testing scenario
 * if seconds > 59
 * if minutes > 59
 * if hours > 99
 * configuration only seconds
 * configuration only minutes
 * configuration only hours
 */

describe('Countdown testing', () => {
  describe('Duration', () => {
    it('countdown should end in 10 seconds', () => {
      const countdown = new App({
        seconds: 10,
      });
      countdown.run()
      expect(countdown.duration).toBe(11000)
    })
    it('countdown should end in 1 minute', () => {
      const countdown = new App({
        minutes: 10,
      });
      countdown.run()
      expect(countdown.duration).toBe(601000)
    })
    it('countdown should end in 1 hour', () => {
      const countdown = new App({
        hours: 10,
      });
      countdown.run()
      expect(countdown.duration).toBe(36001000)
    })
    it('countdown should end in 1 hour, 1 minute, 10 seconds', () => {
      const countdown = new App({
        hours: 1,
        minutes: 1,
        seconds: 10
      });
      countdown.run()
      expect(countdown.duration).toBe(3671000)
    })
  })
})