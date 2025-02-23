<script>
  import { onMount } from "svelte";

  export let data;
  let file = data.image;
  let canvas;
  let ctx;
  let padding = 20; // Default padding
  let paddingColor = "#ffffff"; // Default padding color

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

    // Draw image in the center
    ctx.drawImage(img, padding, padding);
  }

  function updatePadding() {
    const img = new Image();
    img.src = file;
    img.onload = () => updateCanvas(img);
  }

  function saveImage() {
    const link = document.createElement("a");
    link.download = "padded-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }
</script>

  <div class="fixed w-full flex px-10 py-6 justify-end items-center">
    <button class="btn btn-accent md:text-xl scale-110" on:click={saveImage}>
      Download &downarrow;
    </button>
</div>
<div class="flex">
  <!-- Toolbar -->
  <div
    class="w-1/3 flex flex-col gap-2 text-xl justify-center py-20 bg-base-200 px-6 min-h-screen"
  >
    <h1 class="text-4xl font-bold">Editor Toolbar</h1>
    <label> Padding: </label>
    <input
      type="range"
      min="0"
      max="100"
      bind:value={padding}
      on:input={updatePadding}
      class="range"
    />
    <label> Padding Color: </label>
    <input type="color" bind:value={paddingColor} on:input={updatePadding} />
  </div>

  <!-- Canvas Section -->
  <div class="w-2/3 flex flex-col justify-center items-center min-h-screen">
    {#if file}
      <canvas bind:this={canvas} class="border border-dashed max-w-xs"></canvas>
    {/if}
  </div>
</div>
