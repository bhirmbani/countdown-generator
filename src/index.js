const App = require('./services/countdown-generator')

const countdown = new App({
  seconds: 5,
  debug: true,
  every: 1000,
  loop: true,
  customLabel: {
    hour: 'jam',
    // second: 'detik'
  }
});

countdown.run()

module.exports = App