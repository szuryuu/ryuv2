<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";

const props = defineProps<{
  targetRef: HTMLElement | null;
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);

let rafId: number | null = null;
let sourcePixels: Uint32Array | null = null;
let out32: Uint32Array | null = null;
let imgData: ImageData | null = null;
let ctx: CanvasRenderingContext2D | null = null;
let w = 0;
let h = 0;
let dpr = 1;
let simTime = 0;
let lastTimestamp = 0;
let reduced = false;
let resizeDebounce: ReturnType<typeof setTimeout>;

const params = {
  speed: 0.16,
  intensity: 0.07,
  size: 5, // CSS px, scaled by dpr at draw time
};

function hash(x: number, y: number, seed: number): number {
  let hh = Math.imul(x ^ y ^ seed, 0x9e3779b9);
  hh = Math.imul(hh ^ (hh >>> 16), 0x85ebca6b);
  return ((hh ^ (hh >>> 13)) >>> 0) / 4294967296;
}

function reposition() {
  const target = props.targetRef;
  const canvas = canvasRef.value;
  if (!target || !canvas) return;
  const rect = target.getBoundingClientRect();
  canvas.style.left = `${rect.left}px`;
  canvas.style.top = `${rect.top}px`;
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;
}

function captureSource() {
  const target = props.targetRef;
  const canvas = canvasRef.value;
  if (!target || !canvas) return;

  const rect = target.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  dpr = window.devicePixelRatio || 1;
  w = Math.max(1, Math.round(rect.width * dpr));
  h = Math.max(1, Math.round(rect.height * dpr));

  reposition();
  canvas.width = w;
  canvas.height = h;

  ctx = canvas.getContext("2d");
  if (!ctx) return;

  const offscreen = document.createElement("canvas");
  offscreen.width = w;
  offscreen.height = h;
  const offCtx = offscreen.getContext("2d");
  if (!offCtx) return;

  const style = getComputedStyle(target);
  offCtx.scale(dpr, dpr);
  offCtx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  offCtx.fillStyle = style.color;
  offCtx.textBaseline = "top";
  offCtx.fillText(target.textContent || "", 0, 0);

  const sourceImageData = offCtx.getImageData(0, 0, w, h);
  sourcePixels = new Uint32Array(sourceImageData.data.buffer);

  imgData = ctx.createImageData(w, h);
  out32 = new Uint32Array(imgData.data.buffer);
}

function renderFrame(timestamp: number) {
  reposition();

  if (!ctx || !sourcePixels || !out32 || !imgData) {
    rafId = requestAnimationFrame(renderFrame);
    return;
  }

  const dt = lastTimestamp === 0 ? 0 : (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;
  simTime += dt * params.speed;

  const size = Math.max(1, Math.round(params.size * dpr));
  const seed = Math.floor(simTime * 10);

  for (let y = 0; y < h; y++) {
    const blockY = Math.floor(y / size);
    for (let x = 0; x < w; x++) {
      const idx = y * w + x;
      const srcPixel = sourcePixels[idx];
      const srcAlpha = (srcPixel >>> 24) & 0xff;

      if (srcAlpha > 0) {
        const blockX = Math.floor(x / size);
        out32[idx] =
          hash(blockX, blockY, seed) < params.intensity ? 0xff000000 : srcPixel;
      } else {
        out32[idx] = 0;
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
  rafId = requestAnimationFrame(renderFrame);
}

onMounted(() => {
  if (import.meta.client) {
    reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  const stopWatch = watch(
    () => props.targetRef,
    (el) => {
      if (!el) return;
      captureSource();
      if (reduced) {
        if (ctx && sourcePixels && out32 && imgData) {
          out32.set(sourcePixels);
          ctx.putImageData(imgData, 0, 0);
        }
        return;
      }
      rafId = requestAnimationFrame(renderFrame);
    },
    { immediate: true },
  );

  const onResize = () => {
    clearTimeout(resizeDebounce);
    resizeDebounce = setTimeout(captureSource, 100);
  };
  window.addEventListener("resize", onResize);

  onUnmounted(() => {
    stopWatch();
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener("resize", onResize);
  });
});
</script>

<template>
  <ClientOnly>
    <canvas ref="canvasRef" class="dissolve-canvas" />
  </ClientOnly>
</template>

<style scoped>
.dissolve-canvas {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;
}
</style>
