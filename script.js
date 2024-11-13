const WIDTH = 500
const HEIGHT = 500
const COLOR = '#FF69B4'

const canvas = document.getElementById('app')
const ctx = canvas.getContext('2d')

const pool = []
const poolOut = []
let prev = new Date().getTime()
let frame = 0
let maxX = 150
const r = 10
const interpolate = [0.9, 0.92, 1, 0.92, 0.9]
const duration = [0, 500, 700, 900, 1000]

const loop = () => {
  update()
  render()
  window.requestAnimationFrame(loop)
}


const init = () => {
  generateDot()
  generateDot2()
  window.requestAnimationFrame(loop)
}

const update = () => {
  frame = (frame + (1 / 60 * 1000)) % 1000
}

const render = () => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT)
  // ctx.strokeStyle = 'white'
  // ctx.strokeRect(0, 0, WIDTH, HEIGHT)


  poolOut.forEach(dot => {
    ctx.fillStyle = COLOR
    const x = WIDTH / 2 + dot.x + Math.random() * 20 - 10
    const y = HEIGHT / 2 + dot.y + Math.random() * 20 - 10
    ctx.fillRect(x, y, 2, 2)
  })

  // draw Dot
  const cPhase = duration.findIndex(time => time > frame)
  const scale =
    ((frame - duration[cPhase - 1]) / (duration[cPhase] - duration[cPhase - 1]))
    * (interpolate[cPhase] - interpolate[cPhase - 1]) + interpolate[cPhase - 1]
  pool.forEach((dot) => {
    ctx.fillStyle = COLOR
    const x = WIDTH / 2  + scale * dot.x + dot.x * dot.z * Math.pow((scale - 0.02), 5)
    const y = HEIGHT / 2 + scale * dot.y
    ctx.fillRect(x, y, 2, 2)
  })
}

const generateDot = () => {
  // Generate dot in boundary
  for(let t = 0; t <= 60; t += 0.01) {
    let x = 0.25 * (- Math.pow(t, 2) + 40 * t + 1200) * Math.sin(Math.PI * t / 180)
    let y = -0.25 * (- Math.pow(t, 2) + 40 * t + 1200) * Math.cos(Math.PI * t / 180)
  
    const ratio = Math.pow(Math.random(), 5)
    pool.push({
      x: x - (ratio * x),
      y: y + 230 - (ratio * y * (y < 0 ? 1 : -1)),
      z: ratio
    })
  }
  // Generate dot in boundary
  for(let t = 0; t <= 60; t += 0.01) {
    let x = 0.25 * (- Math.pow(t, 2) + 40 * t + 1200) * Math.sin(Math.PI * t / 180)
    let y = -0.25 * (- Math.pow(t, 2) + 40 * t + 1200) * Math.cos(Math.PI * t / 180)
  
    const ratio = Math.pow(Math.random(), 5)
    pool.push({
      x: -x + (ratio * x),
      y: y + 230 + (ratio * y * (y > 0 ? 1 : -1)),
      z: ratio
    })
  }
}

const generateDot2 = () => {
  for(let t = 0; t <= 60; t += 0.01) {
    let x = 0.25 * (- Math.pow(t, 2) + 40 * t + 1200) * Math.sin(Math.PI * t / 180)
    let y = -0.25 * (- Math.pow(t, 2) + 40 * t + 1200) * Math.cos(Math.PI * t / 180)
  
    const ratio = Math.pow(Math.random(), 2)
    poolOut.push({
      x: x - (ratio * x),
      y: y + 230 - (ratio * y * (y < 0 ? 1 : -1)),
    })
    poolOut.push({
      x: -x + (ratio * x),
      y: y + 230 + (ratio * y * (y > 0 ? 1 : -1)),
    })
  }
}

init()