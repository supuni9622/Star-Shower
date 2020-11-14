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
  // First need to declare width and height for our canvas. Here we get Width and height of our browser
  // Canvas coordinates starts from top- left coner of the browser (0,0)
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
    this.velocity = {
      x : 0,
      y: 3
    }
    this.friction = 0.8
    this.gravity = 1
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

    // Create animating through gravitation and add conditions 
    // When ball hits bottom of the screen
    if(this.y + this.radius + this.velocity.y > canvas.height){
      this.velocity.y = -this.velocity.y * this.friction
    }else {
      this.velocity.y += this.gravity
    }

    this.y += this.velocity.y

  }

  // Create MiniStar function
  function MiniStar(x,y,radius,color) {

    // Inherit from Star
    Star.call(this, x, y, radius, color)
    this.velocity = {
      x : 0,
      y: 3
    }
    this.friction = 0.8
    this.gravity = 1
  }

// Draw and update funcions for MiniStar
MiniStar.prototype.draw = function() {
  c.beginPath()
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  c.fillStyle = this.color
  c.fill()
  c.closePath()
}

MiniStar.prototype.update = function() {
  this.draw()

  if(this.y + this.radius + this.velocity.y > canvas.height){
    this.velocity.y = -this.velocity.y * this.friction
  }else {
    this.velocity.y += this.gravity
  }

  this.y += this.velocity.y

}

//=======================================================//

// Implementation  -- creating multiple stars using Star blue print
let stars
function init() {
  stars = []

  for (let i = 0; i < 1; i++) {
    // Creating stars by passing arguments
     stars.push(new Star(canvas.width/2, 30, 30, 'blue'))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)

  stars.forEach(star => {
    star.update()
   })

  // ******Mouse moving text
  //c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  
}

init()
animate()
