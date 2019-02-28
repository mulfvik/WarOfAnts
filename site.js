const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.outerWidth;
  canvas.height = window.outerHeight;
}
resize();
window.onresize = resize;

function antswar(ctx) {
  let w = ctx.canvas.width,
    h = ctx.canvas.height,
    idata = ctx.createImageData(w, h),
    buffer32 = new Uint32Array(idata.data.buffer),
    len = buffer32.length,
    i = 0;
  for (; i < len;)
    buffer32[i++] = ((255 * Math.random()) | 0) << 24;

  ctx.putImageData(idata, 0, 0);
}

let toggle = true;

(function loop() {
  toggle = !toggle;
  if (toggle) {
    requestAnimationFrame(loop);
    return;
  }
  antswar(ctx);
  requestAnimationFrame(loop);
  // Add audio
  const noise = new Audio('site.wav');
  noise.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
  }, false);
  noise.play();
})();