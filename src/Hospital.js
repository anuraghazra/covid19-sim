class Hospital {
  constructor(x, y) {
    this.pos = new Vector(x, y);
    this.healed = {};
    this.radius = x;
    this.timer = null;
    this.img = new Image(40, 100);
    this.img.src = './assets/hospital_small.png';
    this.imgLoaded = false;

    this.img.onload = () => {
      this.imgLoaded = true;
    }
    this.img.onerror = () => {
      this.imgLoaded = false
    }
  }

  heal(boid) {
    if (!this.isFull() && boid.isInfected) {
      boid.recover();
      this.healed[boid.id] = 1;
    } else {
      this.capacityExceeded();
    }
  }

  capacityExceeded() {
    this.timer = window.setInterval(() => {
      this.healed = {};
      window.clearInterval(this.timer);
    }, 5000);
  }

  isFull() {
    return Object.values(this.healed).length >= HOSPITAL_MAX_CAPACITY
  }

  render(ctx) {
    ctx.fillStyle = 'white';
    ctx.font = "10px Arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText("capacity : " + Object.values(this.healed).length, this.pos.x + 18, this.pos.y - 10);
    ctx.beginPath();
    if (this.imgLoaded) {
      ctx.drawImage(this.img, this.pos.x, this.pos.y, 35, 35);
    } else {
      ctx.fillStyle = '#ff5739';
      ctx.fillRect(this.pos.x, this.pos.y, 35, 35)
    }
    ctx.closePath();
  }
}