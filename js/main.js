var si = document.querySelector(".scroll-item");
var body = document.querySelector("body");
var bodyHeight = body.scrollHeight;
var singleHeight = si.clientHeight / 7;
var discoverDepth = 20;
var imageHeight = 225;
var firstClick = false;

var sourceList = ["1.wav", "2.wav", "3.wav"];
var audioList = [];
while (sourceList.length > 0) {
  let audio = new Audio(`sound/${sourceList.pop()}`);
  audioList.push(audio);
}

function r(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = r(0, i + 1);
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

window.addEventListener("scroll", function(e) {
  if (window.scrollY > (bodyHeight - window.innerHeight) / 2) {
    body.appendChild(si.cloneNode());
    bodyHeight = body.scrollHeight;
  }
  if (window.scrollY > discoverDepth) {
    discoverDepth += imageHeight;
    audioList = shuffle(audioList);
    var delay = r(50, 500);
    for (let sound of audioList) {
      window.setTimeout(function() {
        sound.currentTime = 0;
        sound.play().catch(function(e) {
          if (firstClick) {
            throw e;
          }
        });
      }, delay);
      delay += r();
    }
  }
});


window.addEventListener("click", function(e) {
  document.querySelector(".banner").remove();
  document.onclick = null;
});

