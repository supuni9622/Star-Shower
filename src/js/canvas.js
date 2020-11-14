import utils from './utils'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// *****Since we don't need mouse moving events for this star shower project
// const mouse = {
//   x: innerWidth / 2,
//   y: innerHeight / 2
// }

// ******Event Listeners -- don't need for this
// addEventListener('mousemove', (event) => {
//   mouse.x = event.clientX
//   mouse.y = event.clientY
// })


const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

//================== Create blu print for star ===================
// Objects - Creating Star
function Star (x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
  }

  // Create draw and update functions -- this function determine what the circle/star looks like on the screen
 Star.prototype.draw = function() {
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }

  // Calls draw function -- prototype functions improve performance rather than normal functions
  // When we have 1000s of stars if we declare normal draw function inside star function then it create 1000s of draw functions for all stars
  // Using prototype : draw functions created only once and star function reference it as needed

 Star.prototype.update = function() {
    this.draw()
  }

//=======================================================//

// Implementation
let objects
function init() {
  objects = []

  for (let i = 0; i < 400; i++) {
    // objects.push()
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  // ******Mouse moving text
  //c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  // objects.forEach(object => {
  //  object.update()
  // })
}

init()
animate()
