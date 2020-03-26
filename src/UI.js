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

  printStats(boidsCount) {
    const deadCount = Object.values(STATS.dead).length;
    const aliveCount = boidsCount - deadCount;
    const infectedCount = Object.values(STATS.infected).length;
    const recoveredCount = Object.values(STATS.recovered).length;

    this.alive.innerText = Math.max(0, aliveCount);
    this.dead.innerText = Math.max(0, deadCount);
    this.infected.innerText = Math.max(0, infectedCount - deadCount)
    this.recovered.innerText = Math.max(0, recoveredCount)
  }
}