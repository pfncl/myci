<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    open: boolean;
    size?: 'tiny' | 'large';
    onclose?: () => void;
    children?: Snippet;
  }

  let { open = $bindable(), size = 'tiny', onclose, children }: Props = $props();

  let dialogEl: HTMLDialogElement | undefined = $state();

  $effect(() => {
    if (!dialogEl) return;
    if (open && !dialogEl.open) {
      dialogEl.showModal();
    } else if (!open && dialogEl.open) {
      dialogEl.close();
    }
  });

  function handleClose() {
    open = false;
    onclose?.();
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === dialogEl) {
      handleClose();
    }
  }

  function handleCancel(e: Event) {
    e.preventDefault();
    handleClose();
  }
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
  bind:this={dialogEl}
  class="modal {size === 'large' ? 'modal-large' : 'modal-tiny'}"
  onclick={handleBackdropClick}
  oncancel={handleCancel}
>
  <div class="modal-box">
    <button type="button" class="modal-close" onclick={handleClose} aria-label="Zavřít">
      &times;
    </button>
    <div class="modal-content">
      {#if children}
        {@render children()}
      {/if}
    </div>
  </div>
</dialog>

<style>
  /* Native <dialog> centering via showModal() — no width/height hacks */
  dialog.modal {
    border: none;
    padding: 0;
    background: transparent;
    overflow: visible;
    margin: auto;
  }

  dialog.modal::backdrop {
    background: rgba(255, 255, 255, 0.60);
  }

  /* Sizing per variant */
  dialog.modal-tiny {
    width: min(400px, calc(100vw - 40px));
  }

  dialog.modal-large {
    width: min(900px, calc(100vw - 40px));
  }

  /* The visible box */
  .modal-box {
    position: relative;
    padding: 18px;
    border-radius: 3px;
    border: 6px solid #50a3df;
    box-shadow: 0 0 30px 0 rgba(255, 255, 255, 1);
    background: #fff;
  }

  /* Close button — outside the box corner, NOT clipped */
  .modal-close {
    position: absolute;
    top: -13px;
    right: -13px;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #dd3333;
    color: #fff;
    border: 2px solid #fff;
    font-size: 20px;
    line-height: 1;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .modal-close:hover {
    background: #c02020;
  }

  /* Content — only this scrolls if needed */
  .modal-content {
    color: #000;
    font-weight: 100;
    line-height: 1.6;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
  }

  /* Mobile */
  @media (max-width: 600px) {
    dialog.modal-large {
      width: calc(100vw - 20px);
    }

    .modal-box {
      padding: 14px;
    }

    .modal-content {
      max-height: calc(100vh - 80px);
    }
  }
</style>
