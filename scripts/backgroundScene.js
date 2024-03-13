const toggleAudioSettings = (audioElement, action) => {
    if(action === 'play') {
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

const toggleRain = () => {
    const rain = $('.rain')[0];
    if(rain.style.display === 'block') {
        rain.style.display = 'none';
        toggleAudioSettings($('#softRain')[0], 'pause')
        toggleAudioSettings($('#rainOnCar')[0], 'pause')
        clearInterval(thunderInterval)
    } else {
        rain.style.display = 'block';
        toggleAudioSettings($('#softRain')[0], 'play')
        toggleAudioSettings($('#rainOnCar')[0], 'play')
        const thunder = $("#thunderAudio")[0]
        thunderInterval = setInterval(function(){
            thunder.play()
        },5000)

    }
}

const toggleWiper = () => {
    const wipers = $('.wiper')
    const wiperAudio = $('#wiperAudio')[0]
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