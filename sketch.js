
let table, font;
let totalRows;

let angle=0;
let growth=1;
let daisiesX, daisiesY;
let circlesX, circlesY;
let dots = [];

var DescButton, SongButton, KeyButton, song;
var d = -1;
var legend = false;
var songtitle = false;

var can, logo, flowerlegend;

function preload() {
  table = loadTable("NEEDYDATA.csv", "csv", "header");
  font = loadFont("RecoletaAlt-Medium.ttf");
  song = loadSound('needySong.mp3');
  can = loadImage('water-can-cursor.png');
  logo = loadImage('logo-small.png');
  flowerlegend = loadImage('flowerlegend.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  smooth();

  DescButton = createButton('READ');
  DescButton.position(width/2-140, height-100);
  DescButton.style("font-family", "recoleta");
  DescButton.mousePressed(showDesc);
  SongButton = createButton('HEAR');
  SongButton.position(width/2-20, height-100);
  SongButton.mousePressed(togglePlaying);
  SongButton.style("font-family", "recoleta");
  KeyButton = createButton('SEE');
  KeyButton.position(width/2+100, height-100);
  KeyButton.style("font-family", "recoleta");
  KeyButton.mousePressed(showLegend);

  angleMode(DEGREES);
  imageMode(CENTER);

  let tabletest = table.getArray();
  totalRows = table.getRowCount();

  for (let i = 0; i < totalRows; i++) {
    var dot = {
    x:
    random(100, width-100),
    y:
    random(50, height-100),
    r:
    8
  };
dots.push(dot);
}

}

//BUTTON FUNCTIONS
function togglePlaying() {

  songtitle = !songtitle;

  if (!song.isPlaying()) {
    song.play();
    song.setVolume(1);
    textSize(7.5);
    SongButton.html("UNHEAR");
  } else {
    song.pause();
    SongButton.html("HEAR");
  }
}

function showDesc() {
  d = d + 1;
  if (d >= 4) {
    d = -1;
  }
}

function showLegend() {
  legend = !legend;
}

function draw() {
  //background(0);

  background('#f2f2e6');


  for (let i = 0; i < dots.length; i++) {

    //WHITE DAISIES - EXCLAMATION POINTS
    let exc = table.getString(i, "!");
    if (exc != 0) {
      daisy(dots[i].x, dots[i].y, exc, 1.5, "green", '#f2f2e6');
    }

    //PINK ROSES - LOVE EMOJIS
    let love = table.getString(i, "LOVE");
    if (love != 0) {
      daisy(dots[i].x, dots[i].y, love, 1.5, "#f85084", '#f2f2e6');
    }

    //APRICOT FLOWERS - MISC EMOJIS
    let emos = table.getString(i, "EMOS");
    if (emos !=0) {
      daisy(dots[i].x, dots[i].y, emos, 1.5, "orange", '#f2f2e6');
    }

    //BLUE FLOWERS - AN ALL CAPS TEXT
    let caps = table.getString(i, "CAPS");
    if (caps == 'TRUE') {
      daisy(dots[i].x, dots[i].y, 9, 1.5, "#58cced", '#f2f2e6');
    }

    //GREY FLOWERS - A PHONE CALL
    let calls = table.getString(i, "CALL");
    if (calls == 'TRUE') {
      daisy(dots[i].x, dots[i].y, 12, 0.4, "grey", '#f2f2e6');
    }

    //DOT COLOURS
    let sender = table.getString(i, "SENDER");
    if (sender == "Mom") {
      fill("#e3b778");
    } else if (sender =="Me.M"||sender=="Me.H"||sender=="Me.B") {
      fill(255);
    } else if (sender == "Housies1" || sender == "Housies2") {
      fill("orange");
    } else if (sender == "Besties1" || sender == "Besties2" || sender == "Besties3") {
      fill("yellow");
    }
    strokeWeight(0.15);
    ellipse(dots[i].x, dots[i].y, dots[i].r, dots[i].r);

    //WHAT APPEARS ON HOVER
    
    if (mouseX >= dots[i].x-10 && mouseX <= dots[i].x + 10 && mouseY >= dots[i].y-10 && mouseY <= dots[i].y + 10) {
      //rotate(-45);
      image(can, mouseX+15, mouseY-30, 36, 36);
    }
  
    
  }

  push();
  // TITLE & SUBHEADINGS
  rectMode(CENTER);
  fill(255);
  noStroke();
  //rect(width/2, height/2, 400, 200);
  textFont('recoleta');
  textSize(36);
  fill(0);
  textAlign(CENTER);
  text("we are all needy", width/2, height/2-30);
  textFont('arial');
  textSize(15);
  text("a garden of human emotions.", width/2, height/2);
  textSize(9);
  let subtitle = "Hover your mouse around for a surprise (or hold down if you're on mobile). But careful! Clicking makes them shy.";
  text(subtitle, width/2, height-100, 300, 120);
  image(logo, 75, 50, 36, 36);
  pop();
  // 'READ' BUTTON TOGGLES DESCRIPTION
  if (d >= 0) {
  var desc1 = "Around the time the world entered the digital era, we started to teach ourselves that being ‘cool’ was about being nonchalant. We wait hours before we text back. We don’t want to say too much, show too much. Don’t show too much effort. In other words, don’t come off as ‘needy’.";
  var desc2 = "It tells us that we crave affection, yet we keep each other at arm’s length. We become unfazed or stoic in an effort to be adult, sensible, guarded, if not a little bit mysterious. It’s a challenge I have failed many many times. I over-text. I put smile emojis in work emails. I ask questions one too many times. In-person or online, I’m either saying the wrong thing or too many things.";
  var desc3 = "Who is this garden for? I guess I dedicate it to anyone who has ever felt like they were “too much”. Like they were somehow 'a lot to handle'. and especially if they’ve ever thought it makes them flawed or less likely to be loved. In a similar vein I too worry about blunders and ‘much’-ness: phrasing an awkward sentence to a colleague, sharing an obscure deeper fact about myself a second too soon…";
  var desc4 = "If I may suggest: It’s human to be needy. To want our friendships & relationships to be felt, embraced, validated. It's okay to let our collective need for each other show (and grow). We might realise that after all, it’s not lame to care. And that caring, needing, asking, reaching out, unashamedly being, is what leads to colourful, messy, beautiful, unexpected growth.";
  var descs = [desc1, desc2, desc3, desc4];
    push();
    fill(255);
    translate(width/2, height/2);
    rect(0,0, width/2+50, height/3+10);
    fill(0);
    textSize(10.5);
    textFont('arial');
    textAlign(LEFT);
    textWrap(WORD);
    text(descs[d], 0, 20, width/2-15, height/3);
    pop();
  }

  // 'SEE' BUTTON TOGGLES LEGEND
  if (legend) {
    textAlign(CENTER);
    fill(255);
    rect(width/2, height/2, width*3/4, height/2);
    let leg = image(flowerlegend, width/2, height/2-24, width*2/5, (width*2/5)*795/900); 
    textSize(9);
    fill(0);
    text("This data was taken in September 2021. Based on text messages between me and my closest loved ones.", width/2, height*4/5-10, width/2-12, height/4);
}

  // 'HEAR' BUTTON TOGGLES SONG
  if (songtitle) {
    fill(0);
    textAlign(CENTER);
    text("Playing: 'Days Aren't Long Enough' by Thomas Dybdahl and Lera Lynn.", width/2, height-120);
  }

  //END OF DRAW
}

function mouseClicked() {
  if (mouseY <= height-100) {
    growth = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function daisy(x, y, petals, strokeW, strokeCol, fillC) {

  push();

  beginShape();
  fill(255);
  translate(x, y);
  rotate(angle);

  if (mouseX>=x-10 && mouseX<=x+10 && mouseY >= y-10 && mouseY <= y+10) {
    growth = growth + 1;
  }

  for (var a = 0; a < 360; a+=1) {
    let r = growth* cos(petals*a);
    let x = r * cos(a);
    let y = r * sin(a);
    strokeWeight(strokeW);
    stroke(strokeCol);
    fill(fillC);
    if (fillC == '#f2f2e6') {
      noFill();
    }
    vertex(x, y);
  }
  endShape(CLOSE);

  angle = angle+0.05;
  pop();
}
