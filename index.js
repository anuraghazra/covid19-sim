/**
 * @name covid19-sim
 * @author <hazru.anurag@gmail.com>
 * @site https://anuraghazra.github.io/
 */
let width = window.innerWidth;
let height = window.innerHeight;

const FLEE_RADIUS = 100;
const BOIDS_COUNT = 200;
const HOSPITALS_COUNT = 5;
const HOSPITAL_MAX_CAPACITY = 10;
const GLOBAL_MULTIPLIER = {
  separateRadius: 4,
  separate: 1.2,
  align: 0.8,
  cohesion: 0.3,
  wander: 0.5,
  maxSpeed: 1.8
}
// map of boid ids
const STATS = {
  dead: {},
  infected: {},
  recovered: {}
}

const ui = new UI();
ui.init();

window.onload = function () {
  // stats 
  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  const boids = [];
  const hospitals = [];
  const addInfectedBoid = () => {
    let infectedBoid = new Boid(width / 2, height / 2);
    infectedBoid.isInfected = true;
    boids.push(infectedBoid);
  }

  for (let i = 0; i < BOIDS_COUNT; i++) {
    boids.push(new Boid(random(width), random(height)))
  }

  for (let i = 0; i < HOSPITALS_COUNT; i++) {
    hospitals.push(new Hospital(random(width), random(height)))
  }

  // start the cycle with 3 infected boids
  boids[0].isInfected = true;
  boids[2].isInfected = true;
  boids[3].isInfected = true;

  // click to place hospitals
  canvas.addEventListener('click', (e) => {
    hospitals.push(new Hospital(e.offsetX, e.offsetY))
  })
  ui.addInfectedButton.addEventListener('click', function () {
    addInfectedBoid();
    addInfectedBoid();
  })

  function animate() {
    ctx.fillStyle = '#151515'; // '#f6f6f6';
    ctx.fillRect(0, 0, width, height);

    for (let i = boids.length - 1; i >= 0; i--) {
      const boid = boids[i];
      boid.update()
      boid.applyFlock(boids);
      boid.boundaries();
      boid.spreadInfection(boids);
      boid.visitHospital(hospitals)
      boid.setMaxSpeed(GLOBAL_MULTIPLIER.maxSpeed)
      boid.render(ctx);

      if (boid.isDead) STATS.dead[boid.id] = 1;
    }

    hospitals.forEach(h => h.render(ctx))

    ui.printStats(boids.length);

    requestAnimationFrame(animate);
  }
  animate();

}