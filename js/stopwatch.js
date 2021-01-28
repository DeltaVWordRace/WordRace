// https://stackoverflow.com/questions/20318822/how-to-create-a-stopwatch-using-javascript

var Stopwatch = function(elem, options) {

  var timer       = createTimer(),
    startButton = createButton('start', start),
    stopButton  = createButton('stop', stop),
    resetButton = createButton('reset', reset),
    offset,
    clock,
    interval;

  // default options
  options = options || {};
  options.delay = options.delay || 1;

  // append elements
  elem.appendChild(timer);
  elem.appendChild(startButton);
  elem.appendChild(stopButton);
  elem.appendChild(resetButton);

  // initialize
  reset();

  // private functions
  function createTimer() {
    return document.createElement('span');
  }

  function createButton(action, handler) {
    var a = document.createElement('a');
    a.href = '#' + action;
    a.innerHTML = action;
    a.addEventListener('click', function(event) {
      handler();
      event.preventDefault();
    });
    return a;
  }

  function start() {
    if (!interval) {
      offset = Date.now();
      interval = setInterval(update, options.delay);
    }
  }

  function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  function reset() {
    clock = 0;
    render();
  }

  function update() {
    clock += delta();
    render();
  }

  function render() {
    timer.innerHTML = clock/1000;
  }

  function delta() {
    var now = Date.now(),
      d   = now - offset;

    offset = now;
    return d;
  }

  // public API
  this.start = start;
  this.stop = stop;
  this.reset = reset;
};


var elem = document.getElementById("my-stopwatch");
var timer = new Stopwatch(elem, {delay: 10});

// start the timer
timer.start();

// stop the timer
timer.stop();

// reset the timer
timer.reset();