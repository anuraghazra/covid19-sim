class UI {
  constructor() {
    this.infected = null;
    this.dead = null;
    this.alive = null;
    this.recovered = null;
    this.keepDistanceCheckbox = null;
    this.dontListenGovCheckbox = null;
    this.addInfectedButton = null;
  }

  init() {
    window.addEventListener('load', () => {
      this.infected = document.querySelector('#infected');
      this.dead = document.querySelector('#dead');
      this.alive = document.querySelector('#alive');
      this.recovered = document.querySelector('#recovered');
      this.keepDistanceCheckbox = document.querySelector('#keep-distance');
      this.dontListenGovCheckbox = document.querySelector('#dont-listen');
      this.addInfectedButton = document.querySelector('#add-infected');

      this.keepDistanceCheckbox.addEventListener('input', function () {
        GLOBAL_MULTIPLIER.separateRadius = this.checked ? 10 : 4;
      })
      this.dontListenGovCheckbox.addEventListener('input', function () {
        GLOBAL_MULTIPLIER.separateRadius = this.checked ? 2 : 4;
        GLOBAL_MULTIPLIER.maxSpeed = this.checked ? 5 : 1.8;
      })
    })
  }

  printStats() {
    const deadCount = Object.values(STATS.dead).filter(e => e === 1).length;
    const aliveCount = BOIDS_COUNT - deadCount;
    const infectedCount = Object.values(STATS.infected).filter(e => e === 1).length;
    const recoveredCount = Object.values(STATS.recovered).length;

    this.alive.innerText = aliveCount;
    this.dead.innerText = deadCount;
    this.infected.innerText = infectedCount - deadCount
    this.recovered.innerText = recoveredCount
  }
}