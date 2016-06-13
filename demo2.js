// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

/* VARIABLES */  
var canvas, ctx, toggle;
var t_init = new Date().getTime(), t_new, t_old, dt;

var img = new Image();
    img.src = 'abdomen.gif';

var bg = new Image();
    bg.src = 'paysage.jpg';

var pic1 = new Image();
    pic1.src = 'html5.gif';

var clickpos = {};

var showpic = false;

Init();
Loop();

function Init() {
    canvas = document.createElement('canvas');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    window.addEventListener('resize', ResizeCanvas, false);
    canvas.addEventListener('mouseup', ShowExplanation,true);

}

function Loop() {
    requestAnimFrame(Loop);
    Draw();
}

function Draw() {
  /* Process */
  var t = new Date().getTime() - t_init;
  var x = (Math.sin(t*0.002)*0.5+0.5);
  var y = (Math.cos(t*0.9*0.002)*0.5+0.5);
  var r = 1/50;
  
  t_new = t;
  dt    = t_new - t_old;
  t_old = t_new;

  toggle = !toggle;
  
  /* Render */
  //ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background
  ctx.drawImage(bg,
                0,
                0,
                canvas.width,
                canvas.height);

  // Draw sprites
  ctx.drawImage(img,
                y*canvas.width,
                x*canvas.height,
                0.1*canvas.width, 
                0.1*canvas.height);

  if(showpic) {
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.drawImage(pic1,
                  0*canvas.width,
                  0*canvas.height,
                  0.2*canvas.width, 
                  0.2*canvas.height);
    ctx.restore();
  }

  ctx.font = 0.04*canvas.height+"px Arial";
  ctx.fillStyle = "white";
  ctx.textAlign = "left";

  //ctx.fillText(dt, 0.5*canvas.width, 0.05*canvas.height);
  ctx.fillText(clickpos.x, 0.5*canvas.width, 0.05*canvas.height);
  ctx.fillText(clickpos.y, 0.5*canvas.width, 2*0.05*canvas.height);

  //ctx.fillStyle = toggle ?'rgb(200,200,200)':'rgb(100,100,100)';
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.beginPath();
  ctx.arc(x*canvas.width, y*canvas.height, r*canvas.width, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}

/* Events handler */
function ResizeCanvas() {
  /*if(window.innerWidth >= window.innerHeight) {
    canvas.width = window.innerHeight;
    canvas.height = window.innerHeight;
  }
  else {
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth;
  }*/
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight;
}

function ShowExplanation(evt) {
   var box = canvas.getBoundingClientRect();

   clickpos.x = (evt.clientX - box.left)/canvas.width;
   clickpos.y = (evt.clientY - box.top)/canvas.height;

   showpic = !showpic;
}
