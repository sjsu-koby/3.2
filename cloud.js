class Cloud {
  constructor(_cloudx, _cloudy, _size) {
    this.cloudx = _cloudx;
    this.cloudy = _cloudy;
    this.size = _size;
  }

  display() {
    push();
    translate(width * 0.4, height * 0.4);
    strokeWeight(0);
    fill(250);
    scale(this.size);
    ellipse(
      this.cloudx + width * 0.17,
      this.cloudy + height * 0.18,
      width * 0.14,
      width * 0.11
    );
    ellipse(
      this.cloudx + width * 0.22,
      this.cloudy + height * 0.22,
      width * 0.14,
      width * 0.11
    );
    ellipse(
      this.cloudx + width * 0.13,
      this.cloudy + height * 0.22,
      width * 0.14,
      width * 0.11
    );
    ellipse(
      this.cloudx + width * 0.17,
      this.cloudy + height * 0.24,
      width * 0.14,
      width * 0.11
    );
    pop();
  }

  move() {
    if (this.cloudx <= height * 2.7) {
      // this.cloudy = this cloudy +2;
      // short hand is +=
      this.cloudx += 8;
    } else {
      this.cloudx = -height * 1.5;
    }
  }
}

//function drawCloud(cloudx, cloudy) {
//  strokeWeight(0);
//  fill(250);
//  ellipse(
//    cloudx + width * 0.17,
//    cloudy + height * 0.18,
//    width * 0.14,
//    width * 0.11
//  );
//  ellipse(
//    cloudx + width * 0.22,
//    cloudy + height * 0.22,
//    width * 0.14,
//    width * 0.11
//  );
//  ellipse(
//   cloudx + width * 0.13,
//    cloudy + height * 0.22,
//    width * 0.14,
//    width * 0.11
//  );
//  ellipse(
//    cloudx + width * 0.17,
//    cloudy + height * 0.24,
//    width * 0.14,
//    width * 0.11
//  );
//}
