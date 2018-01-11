function sketchBg(backGround) {
  var grid = 25;
  var mWidth = 77; //1925
  var mHeight = 44; //1025
  var pause = [200, 400, 600];
  var colours = [];
  var randomSpawn = 0;
  var blinkShapeD = [
    { w: 25, h: 25 },
    { w: 50, h: 50 },
    { w: 25, h: 25 },
    { w: 50, h: 50 },
    { w: 25, h: 25 },
    { w: 50, h: 50 },
    { w: 25, h: 25 },
    { w: 50, h: 50 },
    { w: 25, h: 25 },
    { w: 50, h: 50 },
    { w: 25, h: 175 },
    { w: 175, h: 25 },
    { w: 25, h: 300 },
    { w: 300, h: 25 }
  ];
  var blinkShape = 0,
    blinkNow = false,
    doIBlink = 0;
  var gradientColours = [],
    gradDirection = 0,
    gLength = [200, 250, 300, 350];
  var snakeColours = [];
  var bgColours = [];
  var bgColour;
  var w,
    h,
    p,
    c,
    t,
    r,
    frames = 0,
    collide = false; //random (width height position colour delay pause radius)
  var $randBlocks = [],
    $drawShape;
  var bgBlink = 3,
    bgChanged = 0,
    frame = 0;

  backGround.rand = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  backGround.keyPressed = function() {
    backGround.createShape();
    bgBlink = backGround.rand(1, 10);
  };

  backGround.beegeeBlink = function() {
    backGround.background(bgColours[0].color);
    bgChanged = Date.now();
    bgBlink = 3;
    bgColour = bgColours[0].color;
  };

  backGround.randomBlink = function() {
    collide = false;
    blinkShape = backGround.rand(0, blinkShapeD.length - 1);
    w = blinkShapeD[blinkShape].w;
    h = blinkShapeD[blinkShape].h;
    r = 0;
    t = pause[backGround.rand(0, pause.length - 1)]; //random pause
    c = colours[backGround.rand(0, colours.length - 1)];
    p = [backGround.rand(1, mWidth) * grid, backGround.rand(1, mHeight) * grid];

    if (blinkShape == 2 || blinkShape == 3) {
      r = 1;
    }

    for (var i = 0; i < $randBlocks.length; i++) {
      if (r == 1 && backGround.collideRectCircle(p[0], p[1], w, h, $randBlocks[i].x, $randBlocks[i].y, $randBlocks[i].width * 2) == true) {
        collide = true;
      } else if (backGround.collideRectRect(p[0], p[1], w, h, $randBlocks[i].x, $randBlocks[i].y, $randBlocks[i].width, $randBlocks[i].height) == true) {
        collide = true;
      }
    }

    if (collide == false) {
      $randBlocks.push({
        width: w,
        height: h,
        x: p[0],
        y: p[1],
        colour: c,
        circle: r,
        pause: t,
        createdAt: Date.now(),
        need: true, //needs to be drawn
        cleared: false //drawn over
      });
    } else {
      backGround.randomBlink(); //retry
    }
  };

  backGround.createShape = function() {
    collide = false;
    w = 0;
    h = 0;
    r = 0;
    p = [0, 0];
    t = pause[backGround.rand(0, pause.length - 1)]; //random pause
    randomSpawn = backGround.rand(1, 4); //1=basic, 2=gradient, 3=block, 4=snake

    if (randomSpawn == 1) {
      c = colours[backGround.rand(0, colours.length - 1)];
      blinkShape = blinkShapeD[backGround.rand(0, blinkShapeD.length - 1)];
      w = blinkShape.w;
      h = blinkShape.h;

      p = [backGround.rand(1, mWidth) * grid, backGround.rand(1, mHeight) * grid];
      //p = [0,0];
      //is it a circle?
      if (w == h) {
        r = (Math.random() < 0.5) ? 1 : 0;
        if (r) {
          p[0] = p[0] - w / 2;
          p[1] = p[1] - h / 2;
        }
      }

      for (var i = 0; i < $randBlocks.length; i++) {
        if (r == 1 && backGround.collideRectCircle(p[0], p[1], w, h, $randBlocks[i].x, $randBlocks[i].y, $randBlocks[i].width * 2) == true) {
          collide = true;
        } else if (backGround.collideRectRect(p[0], p[1], w, h, $randBlocks[i].x, $randBlocks[i].y, $randBlocks[i].width, $randBlocks[i].height) == true) {
          collide = true;
        }
      }
    } else if (randomSpawn == 2 || randomSpawn == 3) {
      c = gradientColours[backGround.rand(0, gradientColours.length - 1)];

      w = 25;
      h = 25;

      gradDirection = backGround.rand(1, 4); //1=left right, 2=right left, 3=up down, 4=down up
      if (gradDirection == 1) {
        p = [backGround.rand(1, Math.floor(mWidth / 2)) * grid, backGround.rand(1, mHeight) * grid];
      }
      else if (gradDirection == 2) {
        p = [backGround.rand(1, Math.floor(mWidth * 0.75)) * grid + (mWidth / 4) * grid, backGround.rand(1, mHeight) * grid];
      }
      else if (gradDirection == 3) {
        p = [backGround.rand(1, Math.floor(mWidth)) * grid, backGround.rand(1, mHeight / 3) * grid];
      }
      else if (gradDirection == 4) {
        p = [backGround.rand(1, Math.floor(mWidth)) * grid, backGround.rand(1, mHeight / 2) * grid + (mHeight / 2) * grid];
      }
    } else if (randomSpawn == 4) {
      //c = colours[backGround.rand(0, colours.length-1)];
      c = backGround.color("#000000");
      w = 25;
      h = 25;

      gradDirection = backGround.rand(1, 4); //1=left right, 2=right left, 3=up down, 4=down up
      if (gradDirection == 1) {
        p = [backGround.rand(1, Math.floor(mWidth / 2)) * grid, backGround.rand(1, mHeight) * grid];
      }
      else if (gradDirection == 2) {
        p = [backGround.rand(1, Math.floor(mWidth * 0.75)) * grid + (mWidth / 4) * grid, backGround.rand(1, mHeight) * grid];
      }
      else if (gradDirection == 3) {
        p = [backGround.rand(1, Math.floor(mWidth)) * grid, backGround.rand(1, mHeight / 3) * grid];
      }
      else if (gradDirection == 4) {
        p = [backGround.rand(1, Math.floor(mWidth)) * grid, backGround.rand(1, mHeight / 2) * grid + (mHeight / 2) * grid];
      }
    }

    if (collide == false) {
      if (randomSpawn == 1) {
        $randBlocks.push({
          width: w,
          height: h,
          x: p[0],
          y: p[1],
          colour: c,
          circle: r,
          pause: t,
          createdAt: Date.now(),
          need: true, //needs to be drawn
          cleared: false //drawn over
        });
      } else if (randomSpawn == 2) {
        $randBlocks.push({
          width: w,
          height: h,
          x: p[0],
          y: p[1],
          colour: c.color1,
          need: true, //needs to be drawn
          cleared: false //drawn over
        });
        backGround.createGradient(p, gradDirection);
      } else if (randomSpawn == 3) {
        $randBlocks.push({
          width: w,
          height: h,
          x: p[0],
          y: p[1],
          colour: c.color1,
          need: true, //needs to be drawn
          cleared: false //drawn over
        });
        backGround.createBlock(p, gradDirection);
      } else if (randomSpawn == 4) {
        $randBlocks.push({
          width: w,
          height: h,
          x: p[0],
          y: p[1],
          colour: c,
          need: true, //needs to be drawn
          cleared: false //drawn over
        });
        backGround.createSnake(p, gradDirection);
      }
    } else {
      backGround.createShape(); //retry
    }
  };

  backGround.createGradient = function(p, gDir) {
    var x = p[0];
    var y = p[1];
    var gradLength = gLength[backGround.rand(0, gLength.length - 1)];
    var w = (gDir == 1 || gDir == 2) ? gradLength : 25;
    var h = (gDir == 1 || gDir == 2) ? 25 : gradLength;
    var p = [];
    var cgrad = c;

    if (gDir == 1) { //left right
      p = [x + 100, y];
      setTimeout(function() {
        //2nd step
        backGround.noFill();

        for (var i = p[0]; i <= p[0] + w; i++) {
          var inter = backGround.map(i, p[0], p[0] + w, 0, 1);
          var color1 = backGround.lerpColor(bgColour, cgrad.color1, inter);
          backGround.stroke(color1);
          backGround.line(i, p[1], i, p[1] + h);
        }

        backGround.fill(bgColour);
        backGround.noStroke();
        backGround.rect(p[0] - 100, p[1], 25, 25);
        setTimeout(function() {
          //3rd step
          w = 75;
          h = 25;
          p = [p[0] + gradLength, p[1]];

          backGround.fill(bgColour);
          backGround.noStroke();
          backGround.rect(p[0] - gradLength, p[1] - 2, gradLength + 10, 30);

          backGround.fill(cgrad.color1);
          backGround.rect(p[0], p[1], w, h);

          setTimeout(function() {
            //4th step
            backGround.fill(bgColour);
            backGround.noStroke();
            backGround.rect(p[0], p[1] - 2, 75, 30);

            backGround.fill(cgrad.color2);
            backGround.rect(p[0] + 75, p[1], 25, 25);

            setTimeout(function() {
              //final step
              backGround.fill(bgColour);
              backGround.noStroke();
              backGround.rect(p[0] + 75, p[1], 26, 26);
            }, 300);
          }, 100);
        }, 150);
      }, 60);
    } else if (gDir == 2) { //right left
      p = [x - 100 - gradLength + 25, y];
      setTimeout(function() {
        //2nd step
        backGround.noFill();

        for (var i = p[0]; i <= p[0] + w; i++) {
          var inter = backGround.map(i, p[0], p[0] + w, 0, 1);
          var color1 = backGround.lerpColor(cgrad.color1, bgColour, inter);
          backGround.stroke(color1);
          backGround.line(i, p[1], i, p[1] + h);
        }

        backGround.fill(bgColour);
        backGround.noStroke();
        backGround.rect(p[0] + 100 + gradLength - 26, p[1] - 1, 27, 27);

        setTimeout(function() {
          //3rd step
          w = 75;
          h = 25;
          p = [p[0] - 75, p[1]];

          backGround.fill(bgColour);
          backGround.noStroke();
          backGround.rect(p[0] + 75, p[1] - 1, gradLength + 2, 29);

          backGround.fill(cgrad.color1);
          backGround.rect(p[0], p[1], w, h);

          setTimeout(function() {
            //4th step
            backGround.fill(bgColour);
            backGround.noStroke();
            backGround.rect(p[0] - 1, p[1], 77, 25);

            backGround.fill(cgrad.color2);
            backGround.rect(p[0] - 25, p[1], 25, 25);

            setTimeout(function() {
              //final step
              backGround.fill(bgColour);
              backGround.noStroke();
              backGround.rect(p[0] - 26, p[1], 27, 27);
            }, 300);
          }, 100);
        }, 150);
      }, 60);
    } else if (gDir == 3) { //up down
      p = [x, y + 100];
      setTimeout(function() {
        //2nd step
        backGround.noFill();

        for (var i = p[1]; i <= p[1] + h; i++) {
          var inter = backGround.map(i, p[1], p[1] + h, 0, 1);
          var color1 = backGround.lerpColor(bgColour, cgrad.color1, inter);
          backGround.stroke(color1);
          backGround.line(p[0], i, p[0] + w, i);
        }

        backGround.fill(bgColour);
        backGround.noStroke();
        backGround.rect(p[0], p[1] - 100, 25, 25);
        setTimeout(function() {
          //3rd step
          w = 25;
          h = 75;
          p = [p[0], p[1] + gradLength];

          backGround.fill(bgColour);
          backGround.noStroke();
          backGround.rect(p[0] - 2, p[1] - gradLength, 30, gradLength + 10);

          backGround.fill(cgrad.color1);
          backGround.rect(p[0], p[1], w, h);

          setTimeout(function() {
            //4th step
            backGround.fill(bgColour);
            backGround.noStroke();
            backGround.rect(p[0] - 2, p[1], 30, 75);

            backGround.fill(cgrad.color2);
            backGround.rect(p[0], p[1] + 75, 25, 25);

            setTimeout(function() {
              //final step
              backGround.fill(bgColour);
              backGround.noStroke();
              backGround.rect(p[0], p[1] + 75, 26, 26);
            }, 300);
          }, 100);
        }, 150);
      }, 60);
    } else if (gDir == 4) { //down up
      p = [x, y - 100 - gradLength + 25];
      setTimeout(function() {
        //2nd step
        backGround.noFill();

        for (var i = p[1]; i <= p[1] + h; i++) {
          var inter = backGround.map(i, p[1], p[1] + h, 0, 1);
          var color1 = backGround.lerpColor(cgrad.color1, bgColour, inter);
          backGround.stroke(color1);
          backGround.line(p[0], i, p[0] + w, i);
        }

        backGround.fill(bgColour);
        backGround.noStroke();
        backGround.rect(p[0], p[1] + 100 + gradLength - 26, 25, 27);

        setTimeout(function() {
          //3rd step
          w = 25;
          h = 75;
          p = [p[0], p[1] - 75];

          backGround.fill(bgColour);
          backGround.noStroke();
          backGround.rect(p[0], p[1] + 73, 27, gradLength + 2);

          backGround.fill(cgrad.color1);
          backGround.rect(p[0], p[1], w, h);

          setTimeout(function() {
            //4th step
            backGround.fill(bgColour);
            backGround.noStroke();
            backGround.rect(p[0], p[1] - 1, 30, 77);

            backGround.fill(cgrad.color2);
            backGround.rect(p[0], p[1] - 26, 26, 27);

            setTimeout(function() {
              //final step
              backGround.fill(bgColour);
              backGround.noStroke();
              backGround.rect(p[0], p[1] - 27, 27, 30);
            }, 300);
          }, 100);
        }, 150);
      }, 60);
    }
  };

  backGround.createBlock = function(p, gDir) {
    var x = p[0];
    var y = p[1];
    var w = (gDir == 1 || gDir == 2) ? 250 : 25;
    var h = (gDir == 1 || gDir == 2) ? 25 : 250;
    var p = [];
    var cgrad = c;

    if (gDir == 1) { //left right
      p = [x + 25, y];
      setTimeout(function() {
        //2nd step
        backGround.fill(cgrad.color1);
        backGround.rect(p[0], p[1], w, h);

        backGround.fill(bgColour);
        backGround.noStroke();
        backGround.rect(p[0] - 26, p[1], 27, 26);
        setTimeout(function() {
          //3rd step
          w = 250;
          h = 25;
          p = [p[0] + 250, p[1]];

          backGround.fill(bgColour);
          backGround.noStroke();
          backGround.rect(p[0] - 250, p[1], 250, 26);

          backGround.noFill();

          for (var i = p[0]; i <= p[0] + w; i++) {
            var inter = backGround.map(i, p[0], p[0] + w, 0, 1);
            var color1 = backGround.lerpColor(cgrad.color1, cgrad.color2, inter);
            backGround.stroke(color1);
            backGround.line(i, p[1], i, p[1] + h);
          }

          setTimeout(function() {
            //4th step
            backGround.fill(bgColour);
            backGround.noStroke();
            backGround.rect(p[0] - 1, p[1] - 2, 252, 29);

            backGround.fill(cgrad.color2);
            backGround.rect(p[0] + 250, p[1], 25, 25);

            setTimeout(function() {
              //final step
              backGround.fill(bgColour);
              backGround.noStroke();
              backGround.rect(p[0] + 249, p[1], 27, 26);
            }, 300);
          }, 100);
        }, 100);
      }, 120);
    } else if (gDir == 2) { //right left
      p = [x - 250, y];
      setTimeout(function() {
        //2nd step
        backGround.fill(cgrad.color1);
        backGround.rect(p[0], p[1], w, h);

        backGround.fill(bgColour);
        backGround.noStroke();
        backGround.rect(p[0] + 250, p[1], 27, 27);

        setTimeout(function() {
          //3rd step
          w = 250;
          h = 25;
          p = [p[0] - 250, p[1]];

          backGround.fill(bgColour);
          backGround.noStroke();
          backGround.rect(p[0] + 250, p[1], 251, 27);

          backGround.noFill();

          for (var i = p[0]; i <= p[0] + w; i++) {
            var inter = backGround.map(i, p[0], p[0] + w, 0, 1);
            var color1 = backGround.lerpColor(cgrad.color2, cgrad.color1, inter);
            backGround.stroke(color1);
            backGround.line(i, p[1], i, p[1] + h);
          }

          setTimeout(function() {
            //4th step
            backGround.fill(bgColour);
            backGround.noStroke();
            backGround.rect(p[0], p[1] - 1, 252, 28);

            backGround.fill(cgrad.color2);
            backGround.rect(p[0] - 25, p[1], 25, 25);

            setTimeout(function() {
              //final step
              backGround.fill(bgColour);
              backGround.noStroke();
              backGround.rect(p[0] - 26, p[1], 27, 26);
            }, 300);
          }, 100);
        }, 100);
      }, 120);
    } else if (gDir == 3) { //up down
      p = [x, y + 25];
      setTimeout(function() {
        //2nd step
        backGround.fill(cgrad.color1);
        backGround.rect(p[0], p[1], w, h);

        backGround.fill(bgColour);
        backGround.noStroke();
        backGround.rect(p[0] - 1, p[1] - 25, 27, 25);
        setTimeout(function() {
          //3rd step
          w = 25;
          h = 250;
          p = [p[0], p[1] + 250];

          backGround.fill(bgColour);
          backGround.noStroke();
          backGround.rect(p[0] - 2, p[1] - 250, 29, 250);

          backGround.noFill();

          for (var i = p[1]; i <= p[1] + h; i++) {
            var inter = backGround.map(i, p[1], p[1] + h, 0, 1);
            var color1 = backGround.lerpColor(cgrad.color1, cgrad.color2, inter);
            backGround.stroke(color1);
            backGround.line(p[0], i, p[0] + w, i);
          }

          setTimeout(function() {
            //4th step
            backGround.fill(bgColour);
            backGround.noStroke();
            backGround.rect(p[0] - 2, p[1], 30, 250);

            backGround.fill(cgrad.color2);
            backGround.rect(p[0], p[1] + 250, 25, 25);

            setTimeout(function() {
              //final step
              backGround.fill(bgColour);
              backGround.noStroke();
              backGround.rect(p[0] - 1, p[1] + 250, 27, 26);
            }, 300);
          }, 100);
        }, 100);
      }, 120);
    } else if (gDir == 4) { //down up
      p = [x, y - 250];
      setTimeout(function() {
        //2nd step

        backGround.fill(bgColour);
        backGround.noStroke();
        backGround.rect(p[0], p[1] + 249, 25, 27);

        backGround.fill(cgrad.color1);
        backGround.rect(p[0], p[1], w, h);
        setTimeout(function() {
          //3rd step
          w = 25;
          h = 250;
          p = [p[0], p[1] - 250];

          backGround.fill(bgColour);
          backGround.noStroke();
          backGround.rect(p[0], p[1] + 250, 25, 251);

          backGround.noFill();

          for (var i = p[1]; i <= p[1] + h; i++) {
            var inter = backGround.map(i, p[1], p[1] + h, 0, 1);
            var color1 = backGround.lerpColor(cgrad.color2, cgrad.color1, inter);
            backGround.stroke(color1);
            backGround.line(p[0], i, p[0] + w, i);
          }

          setTimeout(function() {
            //4th step
            backGround.fill(bgColour);
            backGround.noStroke();
            backGround.rect(p[0] - 1, p[1] - 1, 28, 254);

            backGround.fill(cgrad.color2);
            backGround.rect(p[0], p[1] - 25, 25, 25);

            setTimeout(function() {
              //final step
              backGround.fill(bgColour);
              backGround.noStroke();
              backGround.rect(p[0], p[1] - 26, 25, 27);
            }, 300);
          }, 100);
        }, 100);
      }, 120);
    }
  };

  backGround.createSnake = function(p, gDir) {
    var x = p[0];
    var y = p[1];
    var w = 25;
    var h = 25;
    var p = [];
    var csnake = snakeColours;
    var spaceNowFirst = 0, spaceNowSecond = 0, spaceBefore = 0;

    if (gDir == 1) { //left right
      p = [x, y];
      setTimeout(function() {
        //2nd step " ---"
        spaceBefore = backGround.rand(0, 2) * grid;
        backGround.noStroke();
        backGround.fill(bgColour);
        backGround.rect(p[0], p[1], 800, h);

        backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
        backGround.rect(p[0] + 75 + spaceBefore, p[1], w, h);
        backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
        backGround.rect(p[0] + 25 + spaceBefore, p[1], w, h);
        backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
        backGround.rect(p[0] + 50 + spaceBefore, p[1], w, h);

        setTimeout(function() {
          //3rd step "-- ---"
          spaceNowFirst = backGround.rand(1, 6) * grid;
          spaceBefore = spaceBefore + backGround.rand(0, 2) * grid;
          backGround.noStroke();
          backGround.fill(bgColour);
          backGround.rect(p[0], p[1], 800, h);

          backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
          backGround.rect(p[0], p[1], w, h);
          backGround.rect(p[0] + 100 + spaceNowFirst + spaceBefore, p[1], w, h);

          backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
          backGround.rect(p[0] + 25 + spaceBefore, p[1], w, h);

          backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
          backGround.rect(p[0] + 75 + spaceNowFirst + spaceBefore, p[1], w, h);

          backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
          backGround.rect(p[0] + 125 + spaceNowFirst + spaceBefore, p[1], w, h);
          setTimeout(function() {
            //4th step "- -- ---"
            spaceNowFirst = backGround.rand(1, 6) * grid;
            spaceNowSecond = backGround.rand(1, 6) * grid + spaceNowFirst;
            spaceBefore = spaceBefore + backGround.rand(0, 2) * grid;
            backGround.noStroke();
            backGround.fill(bgColour);
            backGround.rect(p[0], p[1], 800, h);

            backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
            backGround.rect(p[0], p[1], w, h);
            backGround.rect(p[0] + 175 + spaceNowSecond + spaceBefore, p[1], w, h);

            backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
            backGround.rect(p[0] + 50 + spaceNowFirst + spaceBefore, p[1], w, h);
            backGround.rect(p[0] + 150 + spaceNowSecond + spaceBefore, p[1], w, h);

            backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
            backGround.rect(p[0] + 75 + spaceNowFirst + spaceBefore, p[1], w, h);

            backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
            backGround.rect(p[0] + 125 + spaceNowSecond + spaceBefore, p[1], w, h);

            setTimeout(function() {
              //fifth step " - -- - "
              spaceNowFirst = backGround.rand(1, 6) * grid;
              spaceNowSecond = backGround.rand(1, 6) * grid + spaceNowFirst;
              spaceBefore = spaceBefore + backGround.rand(0, 2) * grid;
              backGround.noStroke();
              backGround.fill(bgColour);
              backGround.rect(p[0], p[1], 800, h);

              backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
              backGround.rect(p[0] + 25 + spaceBefore, p[1], w, h);

              backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
              backGround.rect(p[0] + 75 + spaceNowFirst + spaceBefore, p[1], w, h);

              backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
              backGround.rect(p[0] + 100 + spaceBefore, p[1], w, h);

              backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
              backGround.rect(p[0] + 150 + spaceNowSecond + spaceBefore, p[1], w, h);
              setTimeout(function() {
                //sixth
                spaceNowFirst = backGround.rand(1, 3) * grid;
                spaceBefore = spaceBefore + backGround.rand(0, 2) * grid;
                backGround.noStroke();
                backGround.fill(bgColour);
                backGround.rect(p[0], p[1], 800, h);

                backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
                backGround.rect(p[0] + 75 + spaceBefore, p[1], w, h);

                backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
                backGround.rect(p[0] + 125 + spaceNowFirst + spaceBefore, p[1], w, h);
                setTimeout(function() {
                  backGround.fill(bgColour);
                  backGround.rect(p[0], p[1], 800, h);

                  backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
                  backGround.rect(p[0] + 125 + spaceNowFirst + spaceBefore, p[1], w, h);
                  setTimeout(function() {
                    backGround.fill(bgColour);
                    backGround.rect(p[0], p[1], 800, h);
                  }, 100);
                }, 100);
              }, 100);
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    } else if (gDir == 2) {
      p = [x, y];
      setTimeout(function() {
        //2nd step " ---"
        spaceBefore = backGround.rand(0, 2) * grid;
        backGround.noStroke();
        backGround.fill(bgColour);
        backGround.rect(p[0] - 475, p[1], 800, h);

        backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
        backGround.rect(p[0] - 75 - spaceBefore, p[1], w, h);
        backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
        backGround.rect(p[0] - 25 - spaceBefore, p[1], w, h);
        backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
        backGround.rect(p[0] - 50 - spaceBefore, p[1], w, h);

        setTimeout(function() {
          //3rd step "-- ---"
          spaceNowFirst = backGround.rand(1, 6) * grid;
          spaceBefore = spaceBefore + backGround.rand(0, 2) * grid;
          backGround.noStroke();
          backGround.fill(bgColour);
          backGround.rect(p[0] - 475, p[1], 800, h);

          backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
          backGround.rect(p[0], p[1], w, h);
          backGround.rect(p[0] - 100 - spaceNowFirst - spaceBefore, p[1], w, h);

          backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
          backGround.rect(p[0] - 25 - spaceBefore, p[1], w, h);

          backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
          backGround.rect(p[0] - 75 - spaceNowFirst - spaceBefore, p[1], w, h);

          backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
          backGround.rect(p[0] - 125 - spaceNowFirst - spaceBefore, p[1], w, h);
          setTimeout(function() {
            //4th step "- -- ---"
            spaceNowFirst = backGround.rand(1, 6) * grid;
            spaceNowSecond = backGround.rand(1, 6) * grid + spaceNowFirst;
            spaceBefore = spaceBefore + backGround.rand(0, 2) * grid;
            backGround.noStroke();
            backGround.fill(bgColour);
            backGround.rect(p[0] - 475, p[1], 800, h);

            backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
            backGround.rect(p[0], p[1], w, h);
            backGround.rect(p[0] - 175 - spaceNowSecond - spaceBefore, p[1], w, h);

            backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
            backGround.rect(p[0] - 50 - spaceNowFirst - spaceBefore, p[1], w, h);
            backGround.rect(p[0] - 150 - spaceNowSecond - spaceBefore, p[1], w, h);

            backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
            backGround.rect(p[0] - 75 - spaceNowFirst + spaceBefore, p[1], w, h);

            backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
            backGround.rect(p[0] - 125 - spaceNowSecond - spaceBefore, p[1], w, h);

            setTimeout(function() {
              //fifth step " - -- - "
              spaceNowFirst = backGround.rand(1, 6) * grid;
              spaceNowSecond = backGround.rand(1, 6) * grid + spaceNowFirst;
              spaceBefore = spaceBefore + backGround.rand(0, 2) * grid;
              backGround.noStroke();
              backGround.fill(bgColour);
              backGround.rect(p[0] - 475, p[1], 800, h);

              backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
              backGround.rect(p[0] - 25 - spaceBefore, p[1], w, h);

              backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
              backGround.rect(p[0] - 75 - spaceNowFirst - spaceBefore, p[1], w, h);

              backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
              backGround.rect(p[0] - 100 - spaceBefore, p[1], w, h);

              backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
              backGround.rect(p[0] - 150 - spaceNowSecond - spaceBefore, p[1], w, h);
              setTimeout(function() {
                //sixth
                spaceNowFirst = backGround.rand(1, 6) * grid;
                spaceBefore = spaceBefore + backGround.rand(0, 2) * grid;
                backGround.noStroke();
                backGround.fill(bgColour);
                backGround.rect(p[0] - 475, p[1], 800, h);

                backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
                backGround.rect(p[0] - 75 - spaceBefore, p[1], w, h);

                backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
                backGround.rect(p[0] - 125 - spaceNowFirst - spaceBefore, p[1], w, h);
                setTimeout(function() {
                  backGround.noStroke();
                  backGround.fill(bgColour);
                  backGround.rect(p[0] - 475, p[1], 800, h);

                  backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
                  backGround.rect(p[0] - 125 - spaceNowFirst - spaceBefore, p[1], w, h);
                  setTimeout(function() {
                    backGround.fill(bgColour);
                    backGround.rect(p[0] - 474, p[1], 800, h);
                  }, 100);
                }, 100);
              }, 100);
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    } else if (gDir == 3) { //up down
      p = [x, y];
      setTimeout(function() {
        //2nd step " ---"
        spaceBefore = backGround.rand(0, 2) * grid;
        backGround.noStroke();
        backGround.fill(bgColour);
        backGround.rect(p[0], p[1], w, 800);

        backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
        backGround.rect(p[0], p[1] + 75 + spaceBefore, w, h);
        backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
        backGround.rect(p[0], p[1] + 25 + spaceBefore, w, h);
        backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
        backGround.rect(p[0], p[1] + 50 + spaceBefore, w, h);

        setTimeout(function() {
          //3rd step "-- ---"
          spaceNowFirst = backGround.rand(1, 6) * grid;
          spaceBefore = spaceBefore + backGround.rand(0, 2) * grid;
          backGround.noStroke();
          backGround.fill(bgColour);
          backGround.rect(p[0], p[1], w, 800);

          backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
          backGround.rect(p[0], p[1], w, h);
          backGround.rect(p[0], p[1] + 100 + spaceNowFirst + spaceBefore, w, h);

          backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
          backGround.rect(p[0], p[1] + 25 + spaceBefore, w, h);

          backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
          backGround.rect(p[0], p[1] + 75 + spaceNowFirst + spaceBefore, w, h);

          backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
          backGround.rect(p[0], p[1] + 125 + spaceNowFirst + spaceBefore, w, h);
          setTimeout(function() {
            //4th step "- -- ---"
            spaceNowFirst = backGround.rand(1, 6) * grid;
            spaceNowSecond = backGround.rand(1, 6) * grid + spaceNowFirst;
            spaceBefore = spaceBefore + backGround.rand(0, 2) * grid;
            backGround.noStroke();
            backGround.fill(bgColour);
            backGround.rect(p[0], p[1], w, 800);

            backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
            backGround.rect(p[0], p[1], w, h);
            backGround.rect(p[0], p[1] + 175 + spaceNowSecond + spaceBefore, w, h);

            backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
            backGround.rect(p[0], p[1] + 50 + spaceNowFirst + spaceBefore, w, h);
            backGround.rect(p[0], p[1] + 150 + spaceNowSecond + spaceBefore, w, h);

            backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
            backGround.rect(p[0], p[1] + 75 + spaceNowFirst + spaceBefore, w, h);

            backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
            backGround.rect(p[0], p[1] + 125 + spaceNowSecond + spaceBefore, w, h);

            setTimeout(function() {
              //fifth step " - -- - "
              spaceNowFirst = backGround.rand(1, 6) * grid;
              spaceNowSecond = backGround.rand(1, 6) * grid + spaceNowFirst;
              spaceBefore = spaceBefore + backGround.rand(0, 2) * grid;
              backGround.noStroke();
              backGround.fill(bgColour);
              backGround.rect(p[0], p[1], w, 800);

              backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
              backGround.rect(p[0], p[1] + 25 + spaceBefore, w, h);

              backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
              backGround.rect(p[0], p[1] + 75 + spaceNowFirst + spaceBefore, w, h);

              backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
              backGround.rect(p[0], p[1] + 100 + spaceBefore, w, h);

              backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
              backGround.rect(p[0], p[1] + 150 + spaceNowSecond + spaceBefore, w, h);
              setTimeout(function() {
                //sixth
                spaceNowFirst = backGround.rand(1, 6) * grid;
                spaceBefore = spaceBefore + backGround.rand(0, 2) * grid;
                backGround.noStroke();
                backGround.fill(bgColour);
                backGround.rect(p[0], p[1], w, 800);

                backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
                backGround.rect(p[0], p[1] + 75 + spaceBefore, w, h);

                backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
                backGround.rect(p[0], p[1] + 125 + spaceNowFirst + spaceBefore, w, h);
                setTimeout(function() {
                  backGround.noStroke();
                  backGround.fill(bgColour);
                  backGround.rect(p[0], p[1], w, 800);

                  backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
                  backGround.rect(p[0], p[1] + 125 + spaceNowFirst + spaceBefore, w, h);
                  setTimeout(function() {
                    backGround.fill(bgColour);
                    backGround.rect(p[0], p[1], w, 800);
                  }, 100);
                }, 100);
              }, 100);
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    } else if (gDir == 4) { //down up
      p = [x, y];
      setTimeout(function() {
        //2nd step " ---"
        spaceBefore = backGround.rand(0, 2) * grid;
        backGround.noStroke();
        backGround.fill(bgColour);
        backGround.rect(p[0], p[1], w, 800);

        backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
        backGround.rect(p[0], p[1] - 75 - spaceBefore, w, h);
        backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
        backGround.rect(p[0], p[1] - 25 - spaceBefore, w, h);
        backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
        backGround.rect(p[0], p[1] - 50 - spaceBefore, w, h);

        setTimeout(function() {
          //3rd step "-- ---"
          spaceNowFirst = backGround.rand(1, 6) * grid;
          spaceBefore = spaceBefore + backGround.rand(0, 2) * grid;
          backGround.noStroke();
          backGround.fill(bgColour);
          backGround.rect(p[0], p[1] - 475, w, 800);

          backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
          backGround.rect(p[0], p[1], w, h);
          backGround.rect(p[0], p[1] - 100 - spaceNowFirst - spaceBefore, w, h);

          backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
          backGround.rect(p[0], p[1] - 25 - spaceBefore, w, h);

          backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
          backGround.rect(p[0], p[1] - 75 - spaceNowFirst - spaceBefore, w, h);

          backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
          backGround.rect(p[0], p[1] - 125 - spaceNowFirst - spaceBefore, w, h);
          setTimeout(function() {
            //4th step "- -- ---"
            spaceNowFirst = backGround.rand(1, 6) * grid;
            spaceNowSecond = backGround.rand(1, 6) * grid + spaceNowFirst;
            spaceBefore = spaceBefore + backGround.rand(0, 2) * grid;
            backGround.noStroke();
            backGround.fill(bgColour);
            backGround.rect(p[0], p[1] - 475, w, 800);

            backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
            backGround.rect(p[0], p[1], w, h);
            backGround.rect(p[0], p[1] - 175 - spaceNowSecond - spaceBefore, w, h);

            backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
            backGround.rect(p[0], p[1] - 50 - spaceNowFirst + spaceBefore, w, h);
            backGround.rect(p[0], p[1] - 150 - spaceNowSecond - spaceBefore, w, h);

            backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
            backGround.rect(p[0], p[1] - 75 - spaceNowFirst - spaceBefore, w, h);

            backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
            backGround.rect(p[0], p[1] - 125 - spaceNowSecond - spaceBefore, w, h);

            setTimeout(function() {
              //fifth step " - -- - "
              spaceNowFirst = backGround.rand(1, 6) * grid;
              spaceNowSecond = backGround.rand(1, 6) * grid + spaceNowFirst;
              spaceBefore = spaceBefore + backGround.rand(0, 2) * grid;
              backGround.noStroke();
              backGround.fill(bgColour);
              backGround.rect(p[0], p[1] - 475, w, 800);

              backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
              backGround.rect(p[0], p[1] - 25 - spaceBefore, w, h);

              backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
              backGround.rect(p[0], p[1] - 75 - spaceNowFirst - spaceBefore, w, h);

              backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
              backGround.rect(p[0], p[1] - 100 - spaceBefore, w, h);

              backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
              backGround.rect(p[0], p[1] - 150 - spaceNowSecond - spaceBefore, w, h);
              setTimeout(function() {
                //sixth
                spaceNowFirst = backGround.rand(1, 6) * grid;
                spaceBefore = spaceBefore + backGround.rand(0, 2) * grid;
                backGround.noStroke();
                backGround.fill(bgColour);
                backGround.rect(p[0], p[1] - 475, w, 800);

                backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
                backGround.rect(p[0], p[1] - 75 - spaceBefore, w, h);

                backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
                backGround.rect(p[0], p[1] - 125 - spaceNowFirst - spaceBefore, w, h);
                setTimeout(function() {
                  backGround.noStroke();
                  backGround.fill(bgColour);
                  backGround.rect(p[0], p[1] - 475, w, 800);

                  backGround.fill(csnake[backGround.rand(0, csnake.length - 1)]);
                  backGround.rect(p[0], p[1] - 125 - spaceNowFirst - spaceBefore, w, h);
                  setTimeout(function() {
                    backGround.fill(bgColour);
                    backGround.rect(p[0], p[1] - 475, w, 800);
                  }, 100);
                }, 100);
              }, 100);
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    }
  };

  backGround.setup = function() {
    bgColour = backGround.color("#fafafa");
    bgColours = [
      {
        color: backGround.color("#fafafa"),
        class: "grey"
      },
      {
        color: backGround.color("#FCE2D0"),
        class: "peach"
      },
      {
        color: backGround.color("#CBFFCA"),
        class: "mint"
      }
    ];
    colours = [backGround.color("#F8B88B"), backGround.color("#FF0036"), backGround.color("#FFDEAE"), backGround.color("#6037E4"), backGround.color("#FF9960"), backGround.color("#CBFFCA"), backGround.color("#FFDDCA"), backGround.color("#FF5447"), backGround.color("#CA1C2C"), backGround.color("#BDEFFF"), backGround.color("#FEF9F4")];
    gradientColours = [
      {
        color1: backGround.color("#FF9960"),
        color2: backGround.color("#FF5E04")
      },
      {
        color1: backGround.color("#FF5447"),
        color2: backGround.color("#CE4231")
      },
      {
        color1: backGround.color("#FF0036"),
        color2: backGround.color("#CA1C2C")
      },
      {
        color1: backGround.color("#6037E4"),
        color2: backGround.color("#421AC3")
      }
    ];
    snakeColours = [backGround.color("#000000"), backGround.color("#BDEFFF"), backGround.color("#FF5447"), backGround.color("#FFDEAE"), backGround.color("#CBFFCA")];
    backGround.createCanvas(window.innerWidth, window.innerHeight);
    backGround.noStroke();
    //frameRate(60);
    backGround.rectMode(backGround.CORNER);
    backGround.ellipseMode(backGround.CENTER);
  };

  backGround.draw = function() {
    frame++;
    frames = Date.now();

    if (frame % 10 == 0) {
      if (blinkNow) {
        // is it time to stop blinking?
        if (doIBlink == 0) {
          blinkNow = false;
          doIBlink = backGround.rand(6, 20);
          //console.log(frame, "stop blinking");
        } else {
          doIBlink--;
          //console.log(frame, "keep blinking");
        }
      } else {
        //is it time to start blinking
        if (doIBlink == 0) {
          //start blinking
          blinkNow = true;
          doIBlink = backGround.rand(4, 14);
          //console.log(frame, "start blinking");
        } else {
          doIBlink--;
          //console.log(frame, "no blinking");
        }
      }
    }

    if (frame % 6 == 0 && blinkNow) {
      backGround.randomBlink();
    }

    if (bgBlink < 2) {
      bgColour = bgColours[backGround.rand(0, bgColours.length - 1)];
      backGround.background(bgColour.color);
      bgChanged = Date.now();
      bgBlink = 3;
      bgColour = bgColour.color;

      setTimeout(backGround.beegeeBlink, 200);
    }

    //draw me
    for (var i = 0; i < $randBlocks.length; i++) {
      $drawShape = $randBlocks[i];

      //sketchy blink (redraws shape on top of current to "wipe" it)
      if (!$randBlocks[i].need && frames - $drawShape.createdAt > $drawShape.pause && $drawShape.cleared === false) {
        backGround.fill(bgColour);
        if ($drawShape.circle) {
          $randBlocks[i].cleared = true;
          backGround.ellipse($drawShape.x, $drawShape.y, $drawShape.width + 1, $drawShape.height + 1);
        } else {
          $randBlocks[i].cleared = true;
          backGround.rect($drawShape.x, $drawShape.y, $drawShape.width + 1, $drawShape.height + 1);
        }
      } else {
        backGround.fill($drawShape.colour);
        backGround.noStroke();
        if ($drawShape.circle && $drawShape.need) {
          backGround.ellipse($drawShape.x, $drawShape.y, $drawShape.width, $drawShape.height);
          $randBlocks[i].need = false;
          $randBlocks[i].createdAt = frames;
        } else if ($drawShape.need) {
          backGround.rect($drawShape.x, $drawShape.y, $drawShape.width, $drawShape.height);
          $randBlocks[i].need = false;
          $randBlocks[i].createdAt = frames;
        }
      }
    }
  };

  backGround.windowResized = function() {
    backGround.resizeCanvas(window.innerWidth, window.innerHeight);
  };
}

var p5Bg = new p5(sketchBg, "multi_bg");