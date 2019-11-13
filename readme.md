# Countdown Generator

countdown generator is an opiniated javascript library that can be combined with any javascript lib/framework to create a timer or countdown functionality.

# How to install
`npm i @bhirmbani/countdown-generator`

# Features

- Vanilla javascript.
- No framework/library related. Can be extended to any library/UI library out there.
- Timer and countdown mode.
- Custom function to run for every interval provided.
- Custom interval.
- Custom label.

# Demo
Curious? [Simple codesandbox demo](https://codesandbox.io/s/countdown-generator-pwc6c).

# Examples
**React Hooks**
```
import CountdownGenerator from "@bhirmbani/countdown-generator";

function Component() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const backupPlan = (hour, minute, second) => {
    localStorage.setItem("hour", hour);
    localStorage.setItem("minute", minute);
    localStorage.setItem("second", second);
  };
  
  const onFinishFun = () => {
    console.log("finished!");
  };

  const countdown = new CountdownGenerator({
    hours: 1,
    minutes: 1,
    seconds: 5,
    listener: {
      hour: setHour,
      minute: setMinute,
      second: setSecond
    },
    backupPlan,
    onFinish: onFinishFun,
    customLabel: {
      hour: "hour",
      minute: "min"
      second: "sec"
    }
  });

  useEffect(() => countdown.run(), []);

  return (
    <div className="App">
      <h2>
        {hour} : {minute} : {second}
      </h2>
    </div>
  );
}
```

# API

Name | Type | Description | Default value | Example
--- | --- | --- | --- | ---
hours | string | specify duration in hour. | 0 | '1'
minutes | string | specify duration in minute. | 0 | '10'
seconds | string | specify duration in second. | 0 | '15'
onFinish | Function | a function to be called when finished. | - | -
debug | Boolean | if true, print the process to the console. | false | -
backupPlan | Function | Give you three paramaters: hour, minute and second. You can use this for keeping track every change to those parameter values. Example: store every change to localstorage or db so after user doing any state destroy activity, it will restored later. | - | `function(h,m,s){console.log(h, m ,s)}`
listener | Object | Have three keys: `hour, minute, second` | - | -
listener.hour | Function | A function that change state that related to the view in your application. It will change hour indicator for each hour passed. | - | -
listener.minute | Function | A function that change state that related to the view in your application. It will change minute indicator for each minute passed. | - | -
listener.second | Function | A function that change state that related to the view in your application. It will change second indicator for each second passed. | - | -
type | string | choose one: `timer` or `countdown`. | `countdown` | -
fun | Function | A custom function that you can provide that will be called for every interval that has been set. | - | -
every | number | an interval that you can set to the generator (in miliseconds). Choose one: `1000, 500` or greater than `1000`. | `1000` | -
loop | Boolean | if true, start again after finished. | `false` | -
customLabel | Object | Have three keys: `hour, minute, second` | - | -
customLabel.hour | string | Label that will be provided after hour value | - | 'hr' will return `${hour} hr`
customLabel.minute | string | Label that will be provided after minute value | - | 'min' will return `${minute} min`
customLabel.second | string | Label that will be provided after second value | - | 'sec' will return `${second} sec`

# Feel Free to contribute! ✨
Fork this repo and create pull request. Open for any issues!