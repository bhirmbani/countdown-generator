class Generator {
  constructor({ every = 1000, type = 'countdown', hours = 0, minutes = 0, seconds = 0, fun = null }) {
    this.every = every,
    this.type = type,
    this.hours = hours,
    this.minutes = minutes,
    this.seconds = seconds,
    this.fun = fun
    this.duration = 0
    this.runner = null
  }

  // hour() {

  // }

  // minute() {
    
  // }

  // second() {

  // }

  makeTimer() {
    if (this.type === 'timer') {
      this.hours = 0
      this.minutes = 0
      this.seconds = 0
    }
  }

  makeDuration() {
    let hours = this.hours * 3600000
    let minutes = this.minutes * 60000
    let seconds = this.seconds * 1000
    this.duration = hours + minutes + seconds
  }

  processHour() {
    this.hours -= 1
  }

  processMinute() {
    this.minutes -= 1
  }

  processSecond() {
    this.seconds -= 1
  }

  processCountdown() {
    if (this.hours > 0 && this.minutes === 0 && this.seconds === 0) {
      this.processHour()
      this.minutes = 60
    }
    if (this.minutes > 0 && this.seconds === 0) {
      this.processMinute()
      this.seconds = 60
    }
    this.processSecond()
  }

  processTimer() {
    // if (this.hours > 0 && this.minutes === 0 && this.seconds === 0) {
    //   this.processHour()
    //   this.minutes = 60
    // }
    // if (this.minutes > 0 && this.seconds === 0) {
    //   this.processMinute()
    //   this.seconds = 60
    // }
    this.seconds += 1
  }

  process() {
    console.log(this.duration, this.hours, this.minutes, this.seconds)
    if (this.type === 'timer') {
      this.processTimer()
    } else if (this.type === 'countdown') {
      this.processCountdown()
    } else {
      throw new Error('type is not available')
    }
    // let hour = 0
    // let minute = 0
    // let second = 0
    
    // if (this.type === 'countdown') {
    //   this.processCountdown()
    // } else if (this.type === 'timer') {
      
    // } else {
    //   throw new Error('type is not available')
    // }
    // type timer
    
  }

  run() {
    this.makeDuration()
    this.makeTimer()
    if(this.fun === null) {
      this.runner = setInterval(() => this.process(), this.every)
    } else {
      this.runner = setInterval(() => this.fun(), this.every)
    }
    setTimeout(() => clearInterval(this.runner), this.duration);
    return this
  }

}

module.exports = Generator