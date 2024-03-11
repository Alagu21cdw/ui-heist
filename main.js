function start() {
    const start = document.getElementById("before-start")
    start.style.display = "none"
    const tools = document.getElementById("tools")
    tools.style.display = "block"
    const engine = document.getElementById("engineAudio")
    engine.play()
}