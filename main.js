const MAX_SPEED_LIMIT = 240;
const MIN_SPEED_LIMIT = 0;
const HIGH_SPEED = 80;
const START_ENGINE_VALUE = 2;
const MAX_FUEL_VALUE = 60;
const MIN_FUEL_VALUE = 0;
const DEFAULT_GREETING_TEXT = '..! Alagu & Pooja';

let isEngineStarted = false;
let engineStartCount = 0;
const isKeyPressed = {};

/**
 * @description gets the current hour and returns the greeting message based on the hour
 * @param {number} hour hour retrived from current date 
 * @returns greeting text based on the hour received
 */
const getGreetingContent = (hour) => {
    let greeting =
    hour >= 0 && hour < 12
        ? "Good Morning"
        : hour >= 12 && hour < 18
        ? "Good Afternoon"
        : "Good Evening";
    return greeting+DEFAULT_GREETING_TEXT;
}

/**
 * @description returns the current time in the format of HH: MM AM/PM
 * @returns current time based on the format of HH: MM AM/PM
 */
const timeFormatter = () => {
    const date = new Date();
    const options = {
        hour: '2-digit',
        minute: 'numeric',
        hour12: true
    };

    // gets the greeting text for the current time and updates only if the existing text changes
    const greetingText = getGreetingContent(date.getHours());
    if(exitingGreetingText !== greetingText) {
        $('.greeting-text').text(greetingText)
    }

    // to add space after the hours in HH: MM
    const result = new Intl.DateTimeFormat('en-US', options).format(date).split(":")
    result[1] = ` ${result[1]}`;
    console.log('result.join(":")', result.join(":"))
    return result.join(":");
 }

 /**
  * @description once the engine is started a time interval for fuel & date
  */
const start = () => {
    const engine = document.getElementById("engineAudio")
    engine.play()

    const date = new Date();
    let seconds = (60 - date.getSeconds())*1000;
    exitingGreetingText = $('.greeting-text').text();
    $(".time").text(timeFormatter());
    greetingInterval = setInterval(() => {

    }, )
    dateInterval = setInterval(() => {
        $(".time").text(timeFormatter());
        if(seconds!==60000) seconds = 60000;
        console.log('seconds', seconds)
    }, seconds);
    interval = setInterval(() => {
        const fuel = $(".fuel").text();
        fuel<=MIN_FUEL_VALUE ? clearInterval(interval) : $(".fuel").text(fuel-1);
    }, 5000);
}

/**
 * @description toggles the engine state by toggling hide and show classnames 
 */
const toggleEngine = () => {
    $(".before-start-wrapper").toggleClass("show hide")
    $("#tools").toggleClass("show hide")
    $(".information-panel-wrapper").toggleClass("show hide")
    
}

/**
 * @description once the speed limit is reached this function toggles content so that user is notified
 */
const notifySpeed = () => {
    $(".speed-limit-wrapper").toggleClass("hide")
}

/**
 * @description based on the action the speed is increased or decreased respectively
 * @param {string} action contains the actions to be perform 
 */
const accelerate = (action) => {
    let speed = Number($(".speed").text());
    // var decelerateInterval;
    switch(action) {
        case 'accelerate':
            clearInterval(decelerateInterval)
            $("#acc-wrap").addClass("active-tool")
            if(speed+1  === HIGH_SPEED){
                notifySpeed();
            }
            if(speed+1 < MAX_SPEED_LIMIT){
                $(".speed").text(speed+1)
            }
            break;
        case 'decelerate':
            console.log('sfef')
            $("#acc-wrap").removeClass("active-tool");
            decelerateInterval = setInterval(() => {
                console.log('speed', speed)
                if(!speed) clearInterval(decelerateInterval)
                else {
                    speed--;
                    $(".speed").text(speed);
                }
            }, 500);
            break;
        case 'break':
            clearInterval(decelerateInterval)
            $("#brake-wrap").addClass("active-tool")
            if(speed-1 >= MIN_SPEED_LIMIT){
                $(".speed").text(speed-1)
            }
            break;
    }
}

const toggleAudioSettings = (audioElement, action) => {
    if(action === 'play') {
        console.log('audioElement', audioElement)
        audioElement.play()

    } else {
        audioElement.pause()
        audioElement.currentTime = 0
    }
}

const toggleIndicator = (action) => {
    const audio = $("#indicatorAudio")[0];
    const lever = $("#indicator")[0]
    const blickLeft = $(`#blink-left`)[0];
    const blickRight = $(`#blink-right`)[0];
    switch(action) {
        case 'left':
            toggleAudioSettings(audio, 'play')
            blickLeft.style.display = "block"
            lever.style.transform = 'rotate(-170deg)'
            lever.style.bottom = '20rem'
            break;
        case 'right':
            toggleAudioSettings(audio, 'play')
            blickRight.style.display = "block"
            lever.style.transform = 'rotate(-110deg)';
            lever.style.bottom = '17rem';
            break;
        case 'off':
            lever.style.transform = 'rotate(-150deg)'
            lever.style.bottom = '19rem'
            blickRight.style.display = "none"
            blickLeft.style.display = "none"
            toggleAudioSettings(audio, 'pause')
            break;
        default: break;
    }
}

const startRain = () => {
    $('.rain')[0].style.display = 'block';
    toggleAudioSettings($('#softRain')[0], 'play')
    toggleAudioSettings($('#rainOnCar')[0], 'play')
    const thunder = $("#thunderAudio")[0]
    setInterval(function(){
        thunder.play()
    },5000)
}

const startWiper = () => {
    const wipers = document.getElementsByClassName('wiper')
    const wiperAudio = document.getElementById('wiperAudio')
    for(let wiper of wipers) {
        if(wiper.style.display === 'block'){
            wiper.style.display = 'none'
            wiperAudio.pause()
            toggleAudioSettings(wiperAudio, 'pause');
        } else {
            wiper.style.display = 'block'
            wiperAudio.play()
            toggleAudioSettings(wiperAudio, 'play');
        }
    }
}

$(document).on({
    'keydown': function(e) {
        console.log('e', e.key, isEngineStarted)
        const steer = document.getElementById("steering");

        // enter the switch case only if the engine is started
        if(isEngineStarted || (!isEngineStarted && (e.key === 's' || e.key === 'S'))) {
            console.log('entered')
            switch(e.key) {
                case 'S':
                case 's':
                    engineStartCount++;
                    if(!isEngineStarted && engineStartCount === START_ENGINE_VALUE) {
                        toggleEngine();
                        start();
                        isEngineStarted = true;
                    }
                break;
                case 'E':
                case 'e':
                    if(isEngineStarted){
                        engineStartCount=0
                        toggleEngine();
                        isEngineStarted = false;
                        clearInterval(interval)
                        clearInterval(dateInterval)
                    }
                    break;
                case 'A':
                case 'a':
                    accelerate('accelerate');
                    break;
                case 'B':
                case 'b':
                    accelerate('break');
                    break;
                case 'R':
                case 'r':
                   $(".fuel").text(MAX_FUEL_VALUE);
                    break;
                case 'ArrowRight':
                    steer.style.transform = 'rotate(360deg)'
                    break;
                case 'ArrowLeft':
                    steer.style.transform = 'rotate(-360deg)'
                    break;
                case 'l':
                case 'L':
                    toggleIndicator('left');
                    break;
                case 'K':
                case 'k':
                    toggleIndicator('right');
                    break;
                case 'o':
                case 'O':
                    toggleIndicator('off');
                    break;
                case 'm':
                case 'M':
                    const audio = $("#lightAudio")[0]
                    console.log('audio', audio)
                    const lights = $(".light")
                    for(let light of lights){
                        console.log('light', light)
                        if(light.classList.contains('on')) {
                            light.classList.remove('on')
                            toggleAudioSettings(audio, 'pause')
                        } else {
                            console.log('else')
                            light.classList.add('on')
                            toggleAudioSettings(audio, 'play')
                        }
                    }
                    break;
                case 'g':
                case 'G':                    
                    startRain();
                    break;
                case 'w':
                case 'W':
                    startWiper();
                    break;
                default: break;
            }
        } else {
            // let user know engine is not yet started
        }
    },
    'keyup': function(e) {
        console.log('keyup e', e.key)
        if(isEngineStarted) {
            switch(e.key)  {
                case 'a':
                case 'A':
                    accelerate('decelerate');
                    break;
                case 'b':
                case 'B':
                    $("#brake-wrap").removeClass("active-tool");
                    accelerate('decelerate');
                    break;
                case 'ArrowRight':
                case 'ArrowLeft':
                    delete isKeyPressed[e.key];
                    const steer = document.getElementById("steering")
                    steer.style.transform = 'rotate(0deg)'
                    break;
                default: break;
            }
        }
    }
})

let hrElement;
let counter = 100;
const rain = document.getElementsByClassName('rain')[0]
console.log(rain)
for (let i = 0; i < counter; i++) {
  hrElement = document.createElement("HR");
  if (i == counter - 1) {
    hrElement.className = "thunder";
    console.log('thunder')
  } else {
    hrElement.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
    hrElement.style.animationDuration = 0.2 + Math.random() * 0.3 + "s";
    hrElement.style.animationDelay = Math.random() * 5 + "s";
  }
  rain.appendChild(hrElement);
}