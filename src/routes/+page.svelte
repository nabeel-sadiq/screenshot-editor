<script>
  let modal = $state();
  let canvas = $state();
  let file = $state(null);

  function openModal() {
    modal.showModal();
  }

  function imageChange(event) {
    file = URL.createObjectURL(event.target.files[0]);
  }

  function imageDrop(event) {
    event.preventDefault();
    if (event.dataTransfer.files.length > 0) {
      file = URL.createObjectURL(event.dataTransfer.files[0]);
    }
  }
</script>

<div class="flex flex-col justify-center items-center min-h-screen md:text-xl">
  <button class="btn btn-accent md:text-xl" onclick={openModal}
    >Upload Image</button
  >
  <dialog bind:this={modal} class="modal">
    <div class="modal-box">
      <!-- content here of the modal -->
      <div class="flex flex-col gap-2">
        <label class="text-2xl" for="image">Upload Image</label>
        <input
          onchange={imageChange}
          type="file"
          class="file-input w-full"
          name="image"
        />
        <div class="divider text-gray-500">OR</div>
        {#if !file}
          <div
            role="region"
            aria-label="Image drop zone"
            ondrop={imageDrop}
            ondragover={(event) => {
              event.preventDefault();
            }}
            class="bg-base-200 p-20 flex flex-col justify-center items-center skeleton"
          >
            <p>Drop your image here</p>
          </div>
        {/if}
        {#if file}
          <img src={file} alt="uploaded" class="max-w-full" accept="image/*" />
          <a
            href={`/editor?image=${encodeURIComponent(file)}`}
            class="btn btn-accent md:text-xl"
          >
            Edit Now &rarr;
          </a>
        {/if}
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</div>
