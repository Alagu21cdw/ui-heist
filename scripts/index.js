const MAX_SPEED_LIMIT = 280;
const MIN_SPEED_LIMIT = 0;
const HIGH_SPEED = 80;
const START_ENGINE_VALUE = 2;
const MAX_FUEL_VALUE = 60;
const MIN_FUEL_VALUE = 0;
const DEFAULT_GREETING_TEXT = '..! Alagu & Pooja';
  

let isEngineStarted = false;
let isFuelAvailable = true;
let engineStartCount = 0;
let videoToggle = false;
const isKeyPressed = {};
var decelerateInterval;

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
    return result.join(":");
 }

 /**
  * 
  * @param {number} value value based on which the color will be returned
  * @returns color name generated based on value
  */
 const getProgressbarColor = (value) => {
    if(value>=67 && value<100) {
        return 'green';
    } else if(value>=34 && value<67) {
        return 'orange';
    } else {
        return 'red';
    }

 }

/**
 * @description starts the counter so that fuel is emptied on every 5mins
 */
const startFuelCounter = () => {
    interval = setInterval(() => {
    const fuel = $(".fuel").text();
    if (fuel<=MIN_FUEL_VALUE) {
        clearInterval(interval); 
        isFuelAvailable = false
    } else {
        $(".fuel").text(fuel-1);
    }
    const width = (fuel-1)*1.67
    const color = getProgressbarColor((fuel-1)*1.67);
    $('.progress-value').css({
        "width": `${width}%`,
        "background-color": color,
    })
    $('g').css({
        "fill": color,
    }) 
    if(color === 'red') {
        $('svg').css({
            "border": "5px solid red",
            "box-shadow": "1px 1px 10px red, -1px -1px 10px red",
        })
        $('svg').animate({                
            "height": "5.1rem",
            "width": "5.1rem",
            
        }, 300) 
        $('svg').animate({
            "height": "5rem",
            "width": "5rem",
        }, 300) 
    }
    }, 5000);
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
    $(".current-time").text(timeFormatter());
    greetingInterval = setInterval(() => {

    }, )
    dateInterval = setInterval(() => {
        $(".current-time").text(timeFormatter());
        if(seconds!==60000) seconds = 60000;
    }, seconds);  
    startFuelCounter(); 
}

/**
 * @description toggles the engine state by toggling hide and show classnames 
 */
const toggleEngine = () => {
    $(".before-start-wrapper").toggleClass("show hide")
    $("#tools").toggleClass("show hide")
    $(".information-panel-wrapper").toggleClass("show hide")
    $(".player").toggleClass("show hide")
    
}

/**
 * @description once the speed limit is reached this function toggles content so that user is notified
 */
const notifySpeed = () => {
    $(".speed-limit-wrapper").toggleClass("hide")
}

/**
 * @description enables the cartoons elements before crash
 */
const crash = () => {
    const cheems = document.getElementsByClassName('cheems')[0]
    cheems.style.display = "block"
    const cheemsAudio = document.getElementById('cheemsAudio')
    cheemsAudio.play()
    setTimeout(() => {
        cheems.style.display = "none"
        accident()
    },3000)
}

/**
 * @description - starts the accident once the speed limit is reached
 */
const accident = () => {
    const accident = document.getElementsByClassName('accident')[0]
    accident.style.display = 'block'
    setTimeout(() => {
        accident.style.display = 'none'
        let element = document.getElementById("count")
        let count = 4
        element.style.display = 'block'
        let crash = setInterval(() => {
            if(count <= 1){
                clearInterval(crash)
                element.style.display = 'none'
                car()
            }
            element.innerHTML = --count + ' '
        },1000)
    },5000)

}

/**
 * @description - starts the car that initiates the accident
 */
const car = () =>{
    const crash = document.getElementsByClassName('crash')[0]
    crash.style.display = 'block'
    setTimeout(() => {document.getElementById('crashAudio').play()},1000)
    setTimeout(() => {
        crash.style.display = 'none'
        document.getElementById('batman').play()
        document.getElementById('siren').play()
        document.getElementById('police').play()
        document.getElementById('display').style.display = 'block'
    },4000)
    setTimeout(() => {
        document.getElementById('display').innerText = 'Drive Slow. Drive Safe.'
        document.getElementById('siren').play()
    },6000)
}

const tree = document.getElementsByClassName('tree-wrap')[0]
/**
 * @description shifts the gear based on speed received
 * @param {number} speed gets the current speed
 */
function gearShift(speed) {
    if(speed+1  === 10){
        tree.style.display = 'block'
        tree.style.animationDuration = '4s'
        setTimeout(() => { tree.style.display = 'none' },4000)
        document.getElementById("gear").play()
        document.getElementsByClassName('gear-shift')[0].style.animationName = 'gear1'
    }
    if(speed+1  === 50){
        document.getElementById("gear").play()
        document.getElementsByClassName('gear-shift')[0].style.animationName = 'gear'
    }
    if(speed+1  === 100){
        tree.style.display = 'block'
        tree.style.animationDuration = '2s'
        setTimeout(() => { tree.style.display = 'none' },2000)
    }
    if(speed+1  === 160){
        tree.style.display = 'block'
        tree.style.animationDuration = '1s'
        setTimeout(() => { tree.style.display = 'none' },1000)
    }
    if(speed+1  === 100){
        document.getElementById("gear").play()
        document.getElementsByClassName('gear-shift')[0].style.animationName = 'gear2'
    }
    if(speed  === 0){
        document.getElementById("gear").play()
        const slow = document.getElementById("slowing")
        slow.pause()
        document.getElementsByClassName('gear-shift')[0].style.animationName = 'gear0'
    }
}

/**
 * @description based on the action the speed is increased or decreased respectively
 * @param {string} action contains the actions to be perform 
 */
const accelerate = (action) => {
    let speed = Number($(".speed").text());
    const speedAudio = document.getElementById("speeding")
    const slow = document.getElementById("slowing")
    const brake = document.getElementById("brake")
    switch(action) {
        case 'accelerate':
            clearInterval(decelerateInterval)
            $("#acc-wrap").addClass("active-tool")
            speedAudio.play()
            $(".road").addClass("moving")
            $(".depth").addClass("moving-first")
            if(speed+1 === HIGH_SPEED)
                notifySpeed();
            gearShift(speed)
            if(speed+1 < MAX_SPEED_LIMIT){
                $(".speed").text(speed+1)
            }
            if(speed+1 === 250){
                crash()
            }
            break;
        case 'decelerate':
            speedAudio.pause()
            speedAudio.currentTime = 0
            slow.play()
            $("#acc-wrap").removeClass("active-tool");
            decelerateInterval = setInterval(() => {
                gearShift(speed)
                if(!speed) {
                    clearInterval(decelerateInterval)
                    $(".road").removeClass("moving")
                    $(".depth").removeClass("moving-first")
                }
                else {
                    speed--;
                    $(".speed").text(speed);
                }
                if(speed === HIGH_SPEED)
                    notifySpeed();
            }, 500);
            // clearInterval(decelerateInterval)
            break;
        case 'break':
            clearInterval(decelerateInterval)
            gearShift(speed)
            brake.play()
            $("#brake-wrap").addClass("active-tool")
            if(speed-1 >= MIN_SPEED_LIMIT){
                $(".speed").text(speed-1)
                if(speed-1 === HIGH_SPEED)
                    notifySpeed();
            }
            break;
    }
}

$(document).on({
    'keydown': function(e) {
        const steer = document.getElementById("steering");

        // enter the switch case only if the engine is started
        if(isEngineStarted || (!isEngineStarted && (e.key === 's' || e.key === 'S'))) {
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
                        document.getElementById('off').play()
                        engineStartCount=0
                        toggleEngine();
                        isEngineStarted = false;
                        clearInterval(interval)
                        clearInterval(dateInterval)
                    }
                    break;
                case 'A':
                case 'a':
                    if(isFuelAvailable)
                        accelerate('accelerate');
                    break;
                case 'B':
                case 'b':
                    accelerate('break');
                    break;
                case 'R':
                case 'r':
                   $(".fuel").text(MAX_FUEL_VALUE);
                   $('.progress-value').css({
                        "width": '100%',
                        "background-color": 'green',
                    })
                    $('svg').css({
                        "border": "5px solid #7194a2",
                        "box-shadow": "none",
                    })
                    $('g').css({
                        "fill": "green",
                    }) 
                    isFuelAvailable = true;
                    startFuelCounter();
                    break;
                case 'ArrowRight':
                    steer.style.transform = 'rotate(360deg)';
                    $('#right-wrap').addClass('active-tool')
                    break;
                case 'ArrowLeft':
                    steer.style.transform = 'rotate(-360deg)'
                    $('#left-wrap').addClass('active-tool')
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
                    const lights = $(".light")
                    for(let light of lights){
                        if(light.classList.contains('on')) {
                            light.classList.remove('on')
                            document.getElementById("lightoff").play()
                            toggleAudioSettings(audio, 'pause')
                        } else {
                            light.classList.add('on')
                            toggleAudioSettings(audio, 'play')
                        }
                    }
                    break;
                case 'g':
                case 'G':                    
                    toggleRain();
                    break;
                case 'w':
                case 'W':
                    toggleWiper();
                    break;
                case 'h':
                case 'H':
                    document.getElementById('horn').play()
                    $("#speaker-wrap").addClass('active-tool')
                    setInterval(() => {
                        $("#speaker-wrap").removeClass('active-tool')
                    }, 1000)

                    break;
                case 'c':
                case 'C':
                    ('video')
                    const video = document.getElementsByClassName('mirror')[0]
                    !videoToggle? video.style.display='block':video.style.display='none' 
                    videoToggle = !videoToggle
                    $('.wrap').toggleClass('active-tool')
                    break;
                default: break;
            }
        } else {
            // let user know engine is not yet started
        }
    },
    'keyup': function(e) {
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
                    $('#left-wrap').removeClass('active-tool')
                    $('#right-wrap').removeClass('active-tool')
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
for (let i = 0; i < counter; i++) {
  hrElement = document.createElement("HR");
  if (i == counter - 1) {
    hrElement.className = "thunder";
  } else {
    hrElement.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
    hrElement.style.animationDuration = 0.2 + Math.random() * 0.3 + "s";
    hrElement.style.animationDelay = Math.random() * 5 + "s";
  }
  rain.appendChild(hrElement);
}

var stop = function () { 
    ('video')
    var stream = video.srcObject; 
    var tracks = stream.getTracks(); 
    for (var i = 0; i < tracks.length; i++) { 
        var track = tracks[i]; 
        track.stop(); 
    } 
    video.srcObject = null; 
} 
var video = function () { 
    var video = document.getElementById('video'), 
        vendorUrl = window.URL || window.webkitURL; 
    if (navigator.mediaDevices.getUserMedia) { 
        navigator.mediaDevices.getUserMedia({ video: true }) 
            .then(function (stream) { 
                video.srcObject = stream; 
            }).catch(function (error) { 
                console.log("Something went wrong!"); 
            }); 
    } 
}  

const truck = document.getElementsByClassName('truck')[0]
setTimeout(() => {
    setTimeout(() => {document.getElementById('truck').play()},2000)
    truck.style.display = 'block'
},10000)
setTimeout(() => {
    truck.style.display = 'none'
},13000)
$(function () { 
    video(); 
});   