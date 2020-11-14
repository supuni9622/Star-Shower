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

//================== Create blue print for star ===================
// Objects - Creating Star
function Star (x, y, radius, color) {
    this.x = x
    this.y = y
    this.radius = radius
    this.color = color
    this.velocity = {
      x : utils.randomIntFromRange(-4,4),
      y: 3
    }
    this.friction = 0.8
    this.gravity = 1.2
  }

  // Create draw and update functions -- this function determine what the circle/star looks like on the screen
 Star.prototype.draw = function() {
    c.save()
    c.beginPath()
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = this.color
    c.shadowColor = '#e3e1ef'
    c.shadowBlur = 20
    c.fill()
    c.closePath()
    c.restore()
  }

  // Calls draw function -- prototype functions improve performance rather than normal functions
  // When we have 1000s of stars if we declare normal draw function inside star function then it create 1000s of draw functions for all stars
  // Using prototype : draw functions created only once and star function reference it as needed

 Star.prototype.update = function() {
    this.draw()

    // Create animating through gravitation and add conditions 
    // When ball hits bottom of the screen
    if(this.y + this.radius + this.velocity.y > canvas.height - groundHeight){
      this.velocity.y = -this.velocity.y * this.friction
      // Call a ministar function
      this.shatter()
    }else {
      this.velocity.y += this.gravity
    }

    // Hits side screen 
    if(this.x + this.radius + this.velocity.x > canvas.width || this.x - this.radius <= 0){
      this.velocity.x = -this.velocity.x * this.friction
      this.shatter()
    }

    this.x += this.velocity.x
    this.y += this.velocity.y

  }

  Star.prototype.shatter = function() {
    // When the ball hits the bottom of the screen it should srink
    this.radius -= 3
    for(let i=0;i<8; i++){
      ministars.push(new MiniStar(this.x, this.y, 2))
    }
    console.log(ministars)
  }

  // Create MiniStar function
  function MiniStar(x,y,radius,color) {

    // Inherit from Star
    Star.call(this, x, y, radius, color)

    // Randomise the x,y coordinates
    this.velocity = {
      x : utils.randomIntFromRange(-5,5),
      y : utils.randomIntFromRange(-15,15)
    }
    this.friction = 0.8
    this.gravity = 0.4
    this.ttl = 200
    this.opacity = 1
  }

// Draw and update funcions for MiniStar
MiniStar.prototype.draw = function() {
  c.save()
  c.beginPath()
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  c.fillStyle = `rgba(227,234,239, ${this.opacity})`
  c.shadowColor = '#e3e1ef'
  c.shadowBlur = 20
  c.fill()
  c.closePath()
  c.restore()
}

MiniStar.prototype.update = function() {
  this.draw()

  if(this.y + this.radius + this.velocity.y > canvas.height - groundHeight){
    this.velocity.y = -this.velocity.y * this.friction
  }else {
    this.velocity.y += this.gravity
  }

  this.x += this.velocity.x
  this.y += this.velocity.y
  // Time to leave --> ttl
  this.ttl -= 1
  this.opacity -= 1 / this.ttl

}

//=======================================================

// Create mountain range function for create mountain dynamically
function createMountainRange(mountainAmount, height, color) {
    for(let i =0; i< mountainAmount; i++){

      const mountainWidth = canvas.width / mountainAmount
      c.beginPath()
      // Create mountain using rectrangles
      c.moveTo(i * mountainWidth, canvas.height)
      c.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height)
      c.lineTo(i * mountainWidth + mountainWidth /2 , canvas.height - height)
      c.lineTo(i * mountainWidth - 325, canvas.height)
      c.fillStyle = color
      c.fill()
      c.closePath()
    }
}

//======================================================= 

// Implementation 

// Create Background object
const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height)
//Start color of the background
backgroundGradient.addColorStop(0, '#171e26')
//End color of the background
backgroundGradient.addColorStop(1, '#3f586b')

// Create background stars
let backgroundStars

// creating multiple stars using Star blue print
let stars
let ministars

// Create timer to spawing multiple stars
let ticker = 0
let randomSpawnRate = 75
let groundHeight = 100

function init() {
  // Create containers for ministar and star objects
  stars = []
  ministars = []
  backgroundStars = []

  for (let i = 0; i < 1; i++) {
    // Creating stars by passing arguments
     stars.push(new Star(canvas.width/2, 30, 30, '#e3eaef'))
  }

  for (let i =0; i< 150; i++){

    const x = Math.random() * canvas.width
    const y = Math.random() * canvas.height
    const radius = Math.random() * 3
    backgroundStars.push(new Star(x, y, radius, 'white'))
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = backgroundGradient
  c.fillRect(0, 0, canvas.width, canvas.height)

  backgroundStars.forEach(backgroundStar => {
    backgroundStar.draw()
  })

  //Call mountain range function
  // First call arguments in the behind 
  createMountainRange(1, canvas.height - 50, '#384551')
  createMountainRange(2, canvas.height - 100, '#283843')
  createMountainRange(3, canvas.height - 300, '#26333e')
  c.fillStyle = '#182028'
  c.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight)

  // Reference stars array
  stars.forEach((star,index) => {
    star.update()

    // If the ball radius == 0 it removes from array
    if(star.radius == 0){
      stars.splice(index, 1)
    }

   })

  // Reference ministars array
  ministars.forEach((ministar,index) => {
    ministar.update()
    if(ministar.ttl == 0){
      ministars.splice(index, 1)
    }
  })

  ticker++

  if(ticker % randomSpawnRate == 0){
    const radius = 18
    const x = Math.max(Math.random() * canvas.width - radius)
    stars.push(new Star(x, -100 ,radius, 'white'))
    randomSpawnRate = utils.randomIntFromRange(75,200)
  }

  // ******Mouse moving text
  //c.fillText('HTML CANVAS BOILERPLATE', mouse.x, mouse.y)
  
}

init()
animate()
