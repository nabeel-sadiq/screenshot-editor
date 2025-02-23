<script>
  import { onMount } from "svelte";

  export let data;
  let file = data.image;
  let canvas;
  let ctx;
  let padding = 20; // Default padding
  let paddingColor = "#ffffff"; // Default padding color
  let borderRadius = 0; // Default border radius (applies to both image & canvas)

  onMount(() => {
    if (!file) return;

    const img = new Image();
    img.src = file;
    img.onload = () => {
      updateCanvas(img);
    };
  });

  function updateCanvas(img) {
    const newWidth = img.width + padding * 2;
    const newHeight = img.height + padding * 2;

    canvas.width = newWidth;
    canvas.height = newHeight;
    ctx = canvas.getContext("2d");

    // Fill background with padding color
    ctx.fillStyle = paddingColor;
    ctx.fillRect(0, 0, newWidth, newHeight);

    // Clip for rounded corners
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(padding + borderRadius, padding);
    ctx.lineTo(newWidth - padding - borderRadius, padding);
    ctx.quadraticCurveTo(
      newWidth - padding,
      padding,
      newWidth - padding,
      padding + borderRadius
    );
    ctx.lineTo(newWidth - padding, newHeight - padding - borderRadius);
    ctx.quadraticCurveTo(
      newWidth - padding,
      newHeight - padding,
      newWidth - padding - borderRadius,
      newHeight - padding
    );
    ctx.lineTo(padding + borderRadius, newHeight - padding);
    ctx.quadraticCurveTo(
      padding,
      newHeight - padding,
      padding,
      newHeight - padding - borderRadius
    );
    ctx.lineTo(padding, padding + borderRadius);
    ctx.quadraticCurveTo(padding, padding, padding + borderRadius, padding);
    ctx.closePath();
    ctx.clip();

    // Draw image inside the rounded clipping area
    ctx.drawImage(img, padding, padding);

    ctx.restore();

    // Apply border-radius to the canvas element itself
    canvas.style.borderRadius = `${borderRadius}px`;
  }

  function updatePadding() {
    const img = new Image();
    img.src = file;
    img.onload = () => updateCanvas(img);
  }

  function updateBorderRadius() {
    updatePadding();
  }

  function saveImage() {
    const link = document.createElement("a");
    link.download = "padded-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }
</script>

<!-- Download Button -->
<div class="fixed w-full flex px-10 py-6 justify-end items-center">
  <button class="btn btn-accent md:text-xl scale-110" on:click={saveImage}>
    Download &downarrow;
  </button>
</div>

<div class="flex">
  <!-- Toolbar -->
  <div
    class="w-1/3 flex flex-col gap-4 text-xl justify-center py-20 bg-base-200 px-6 min-h-screen"
  >
    <h1 class="text-4xl font-bold">Editor Toolbar</h1>

    <!-- Padding Slider -->
    <label for="padding">Padding:</label>
    <input
      id="padding"
      type="range"
      min="0"
      max="100"
      bind:value={padding}
      on:input={updatePadding}
      class="range"
    />

    <!-- Padding Color Picker -->
    <label for="paddingColor">Padding Color:</label>
    <input
      id="paddingColor"
      type="color"
      bind:value={paddingColor}
      on:input={updatePadding}
    />

    <!-- Rounded Corners Slider -->
    <label for="borderRadius">Rounded Corners:</label>
    <input
      id="borderRadius"
      type="range"
      min="0"
      max="100"
      bind:value={borderRadius}
      on:input={updateBorderRadius}
      class="range"
    />
  </div>

  <!-- Canvas Section -->
  <div class="w-2/3 flex flex-col justify-center items-center min-h-screen">
    {#if file}
      <canvas
        bind:this={canvas}
        class="border border-dashed max-w-xs transition-all"
        style="border-radius: {borderRadius}px;"
      ></canvas>
    {/if}
  </div>
</div>
