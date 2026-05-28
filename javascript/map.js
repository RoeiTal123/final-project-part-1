document.addEventListener("DOMContentLoaded", Main)

let isDragging = false
let startX = 0
let startY = 0
let mapX = 0
let mapY = 0
let clickStartTime = 0

const container = document.getElementById('map-container')
const map = document.getElementById('map-image')
const rect = container.getBoundingClientRect()

function startMapDrag(event) {
    isDragging = true
    clickStartTime = Date.now()
}

function centerMap() {
    // Math: (Container Size - Map Size) / 2 resulting in a negative offset
    mapX = (container.clientWidth - map.clientWidth) / 2
    mapY = (container.clientHeight - map.clientHeight) / 2

    map.style.transform = `translate(${mapX}px, ${mapY}px)`
}

// Triggered by onmousemove="whileMapDragging(event)"
function whileMapDragging(event) {
    if (!isDragging) return

    if (!container || !map) return // Safety check

    let targetX = mapX + event.movementX
    let targetY = mapY + event.movementY


    const minX = container.clientWidth - map.clientWidth
    const minY = container.clientHeight - map.clientHeight

    if (targetX > 0) targetX = 0
    if (targetY > 0) targetY = 0
    if (targetX < minX) targetX = minX
    if (targetY < minY) targetY = minY

    mapX = targetX
    mapY = targetY
    map.style.transform = `translate(${mapX}px, ${mapY}px)`
}

// Triggered by onmouseup and onmouseleave
function stopMapDrag() {
    if (!isDragging) return

    isDragging = false
    const clickDuration = Date.now() - clickStartTime

    // If held for less than 200ms, the user intended to CLICK, not drag!
    if (clickDuration < 200) {

        // Calculate original coordinates relative to the un-scrolled image
        const mouseXInContainer = event.clientX - rect.left
        const mouseYInContainer = event.clientY - rect.top
        const originalX = Math.round(mouseXInContainer - mapX)
        const originalY = Math.round(mouseYInContainer - mapY)

        console.log(`Original Map Target -> X: ${originalX}px, Y: ${originalY}px`)

        // You can trigger your popup window here now!
        toggleModal(originalX, originalY)
    }
}

function printMapCoordinates(event) {

    // 1. Find where the mouse clicked relative to the container box
    const mouseXInContainer = event.clientX - rect.left
    const mouseYInContainer = event.clientY - rect.top

    // 2. Subtract mapX and mapY to find the coordinate on the ORIGINAL image
    // (Since mapX/Y are negative numbers, subtracting them adds them back)
    const originalX = Math.round(mouseXInContainer - mapX)
    const originalY = Math.round(mouseYInContainer - mapY)

    // 3. Print the values to your browser console for future copy-pasting
    console.log(`Original Map Target -> X: ${originalX}px, Y: ${originalY}px`)

    // OPTIONAL: If you want to use these values right away to open your modal window
}

function toggleModal(originalX, originalY) {
    const overlay = document.getElementById('modal-overlay')

    if (overlay.style.display === 'flex') {
        overlay.style.display = 'none'
    } else {
        overlay.style.display = 'flex'
        setLocation(originalX, originalY)
    }
}

function Main() {
    centerMap();
}

function setLocation(originalX, originalY){
    const modalHeader = document.getElementById("modal-header")
    modalHeader.innerHTML =`<span>Create new location</span><span class="coords">x: ${originalX} , y: ${originalY}</span>`
}

function confirmLocation(){
    const overlay = document.getElementById('modal-overlay')

    if (overlay.style.display === 'flex') {
        overlay.style.display = 'none'
    } else {
        overlay.style.display = 'flex'
    }
    console.log("location added")
}