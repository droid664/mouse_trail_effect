import './style.css'

document.addEventListener('DOMContentLoaded', () => {
	const mouse = {
		x: 0,
		y: 0,
	}

	window.addEventListener('mousemove', (e) => {
		mouse.x = e.clientX
		mouse.y = e.clientY
	})

	class TrailEffect {
		constructor() {
			this.canvas = document.getElementById('canvas')
			this.context = this.canvas.getContext('2d')
			this.particles = []
			this.colors = [
				'rgba(255, 0, 0, 0.5)',
				'rgba(0, 255, 0, 0.5)',
				'rgba(0, 0, 255, 0.5)',
				'rgba(255, 255, 0, 0.5)',
				'rgba(255, 0, 255, 0.5)',
				'rgba(0, 255, 255, 0.5)',
				'rgba(128, 0, 0, 0.5)',
				'rgba(0, 128, 0, 0.5)',
				'rgba(0, 0, 128, 0.5',
			]

			this.init()

			window.addEventListener('resize', () => {
				this.clear()
				this.init()
			})
		}
		clear() {
			this.context.clearRect(0, 0, this.width, this.height)
		}
		init() {
			this.width = window.innerWidth
			this.height = window.innerHeight
			this.canvas.width = this.width
			this.canvas.height = this.height
		}
		createParticle() {
			this.particles.push({
				x: mouse.x + getRandomInt(-30, 30),
				y: mouse.y + getRandomInt(-30, 30),
				radius: getRandomInt(5, 20),
				color: this.colors[getRandomInt(1, this.colors.length - 1)],
				size: 1,
			})
		}
		draw() {
			this.clear()
			this.particles.forEach((particle, index) => {
				this.context.beginPath()
				this.context.fillStyle = particle.color
				this.context.arc(particle.x, particle.y, particle.radius * particle.size, 0, 2 * Math.PI)
				this.context.fill()
				this.context.closePath()

				this.particles[index].size -= 0.01
			})
			this.particles = this.particles.filter((item) => item.size > 0)
		}
	}

	const trailEffect = new TrailEffect()

	function tick() {
		trailEffect.createParticle()
		trailEffect.draw()

		requestAnimationFrame(tick)
	}
	tick()
})

function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}
