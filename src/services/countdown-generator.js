class Generator {
  constructor({
    every = 1000,
    type = "countdown",
    hours = 0,
    minutes = 0,
    seconds = 0,
    fun = null,
    listener = {
      hour: () => null,
      minute: () => null,
      second: () => null
    },
    backupPlan = () => null,
    debug = false,
    onFinish = () => null,
    loop = false,
    customLabel = {
      hour: '',
      minute: '',
      second: ''
    }
  }) {
    this.every = every,
    this.type = type,
    this.hours = hours,
    this.minutes = minutes,
    this.seconds = seconds,
    this.fun = fun;
    this.duration = 0;
    this.runner = null;
    this.listener = {
      hour: listener.hour,
      minute: listener.minute,
      second: listener.second
    };
    this.backupPlan = backupPlan;
    this.debug = debug;
    this.onFinish = onFinish;
    this.loop = loop;
    this.original = {
      hour: hours,
      minute: minutes,
      second: seconds
    },
    this.customLabel = {
      hour: customLabel.hour,
      minute: customLabel.minute,
      second: customLabel.second
    }
  }

  processHour() {
    const isCustomLabel = this.customLabel.hour
    if (this.hours.toString().length === 1) {
      return isCustomLabel ? `${this.hours} ${this.customLabel.hour}` : `0${this.hours}`;
    }
    return isCustomLabel ? `${this.hours} ${this.customLabel.hour}` : this.hours;
  }

  processMinute() {
    const isCustomLabel = this.customLabel.minute
    if (this.minutes.toString().length === 1) {
      return isCustomLabel ? `${this.minutes} ${this.customLabel.minute}` : `0${this.minutes}`;
    }
    return isCustomLabel ? `${this.minutes} ${this.customLabel.minute}` : this.minutes;
  }

  processSecond() {
    const isCustomLabel = this.customLabel.second
    if (this.seconds.toString().length === 1) {
      return isCustomLabel ? `${this.seconds} ${this.customLabel.second}` : `0${this.seconds}`;
    }
    return isCustomLabel ? `${this.seconds} ${this.customLabel.second}` : this.seconds;
  }

  makeTimer() {
    if (this.type === "timer") {
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
    }
  }

  makeDuration() {
    let hours = this.hours * 3600000;
    let minutes = this.minutes * 60000;
    let seconds = this.seconds * 1000;
    const duration = hours + minutes + seconds;
    if (duration === 0) {
      throw new Error('please specify either hours, minutes or seconds.')
    }
    this.duration = duration + 1000;
  }

  decrementHour() {
    this.hours -= 1;
  }

  decrementMinute() {
    this.minutes -= 1;
  }

  decrementSecond() {
    this.seconds -= 1;
  }

  incrementMinute() {
    this.minutes += 1;
  }

  incrementSecond() {
    this.seconds += 1;
  }

  incrementHour() {
    this.hours += 1;
  }

  processCountdown() {
    if (this.hours > 0 && this.minutes === 0 && this.seconds === 0) {
      this.decrementHour();
      this.minutes = 60;
    }
    if (this.minutes > 0 && this.seconds === 0) {
      this.decrementMinute();
      this.seconds = 60;
    }
    this.decrementSecond();
  }

  processTimer() {
    if (this.minutes === 59 && this.seconds === 59) {
      this.incrementHour();
      this.decrementMinute();
    }
    if (this.seconds === 59) {
      this.incrementMinute();
      this.decrementSecond();
    }
    this.incrementSecond();
  }

  process() {
    this.backupPlan(this.hours, this.minutes, this.seconds);
    this.listener.hour(this.processHour());
    this.listener.minute(this.processMinute());
    this.listener.second(this.processSecond());
    if (this.debug) {
      console.log(
        `duration: ${this.duration}, hour: ${this.processHour()}, minute: ${
          this.processMinute()
        }, second: ${this.processSecond()}`
      );
    }
    if (this.type === "timer") {
      this.processTimer();
    } else if (this.type === "countdown") {
      this.processCountdown();
    } else {
      throw new Error("type is not available");
    }
  }

  durationReset() {
    this.hours = this.original.hour;
    this.minutes = this.original.minute;
    this.seconds = this.original.second;
  }

  stop() {
    setTimeout(() => {
      clearInterval(this.runner);
      if (this.loop) {
        this.durationReset()
        this.run()
      }
        this.onFinish();
    }, this.duration);
  }

  processRunner() {
    if (this.fun === null) {
      return setInterval(() => this.process(), this.every);
    } else {
      return setInterval(() => this.fun(), this.every);
    }
  }

  run() {
    this.makeDuration();
    this.makeTimer();
    if (this.every === 500) {
      const multiplier = this.duration / this.every
      this.duration = (this.duration * multiplier) / 20 - 500
    } else if (this.every > 1000) {
      const multiplier = this.every / 1000
      this.duration = this.duration * multiplier
    } else if (this.every < 500 || this.every < 1000) {
      throw new Error('interval not supported')
    }
    this.runner = this.processRunner()
    this.stop()
  }
}

module.exports = Generator
