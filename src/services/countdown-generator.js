class Generator {
  constructor({
    every = 1000,
    type = "countdown",
    hours = 0,
    minutes = 0,
    seconds = 0,
    fun = null,
    listener = {},
    backupPlan = null,
    debug = false,
    onFinish = null
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
  }

  processHour() {
    if (this.hours.toString().length === 1) {
      return `0${this.hours}`;
    }
    return this.hours;
  }

  processMinute() {
    if (this.minutes.toString().length === 1) {
      return `0${this.minutes}`;
    }
    return this.minutes;
  }

  processSecond() {
    if (this.seconds.toString().length === 1) {
      return `0${this.seconds}`;
    }
    return this.seconds;
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
    this.duration = hours + minutes + seconds + 1000;
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
        `duration: ${this.duration}, hour: ${this.hours}, minute: ${
          this.minutes
        }, second: ${this.seconds}`
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

  run() {
    this.makeDuration();
    this.makeTimer();
    if (this.fun === null) {
      this.runner = setInterval(() => this.process(), this.every);
    } else {
      this.runner = setInterval(() => this.fun(), this.every);
    }
    setTimeout(() => {
      clearInterval(this.runner);
      this.onFinish();
    }, this.duration);
  }
}

module.exports = Generator
