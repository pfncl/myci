<script lang="ts">
  import Modal from './Modal.svelte';

  interface Props {
    title: string;
    price: string;
    popupContent: string;
  }

  let { title, price, popupContent }: Props = $props();
  let modalOpen = $state(false);
</script>

<div class="service-card">
  <div class="service-header">
    <h2 class="service-title">{title}</h2>
    <h4 class="service-price">{price}</h4>
  </div>
  <div class="service-actions">
    <button type="button" class="btn-info" onclick={() => modalOpen = true}>
      <span class="icon-paper-plane-light"></span> INFORMACE
    </button>
  </div>
</div>

<Modal bind:open={modalOpen} size="tiny">
  <p>{@html popupContent}</p>
</Modal>

<style>
  .service-card {
    background: #f5f5f5;
    border: 1px solid #e8e8e8;
    border-radius: 8px;
    padding: 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .service-title {
    font-size: 25px;
    color: #333;
    line-height: 25px;
    margin-bottom: 0.3em;
  }

  .service-price {
    font-size: 18px;
    color: #a0a0a0;
    font-family: 'Abril Fatface', serif !important;
    font-weight: 400;
    font-style: normal;
    margin-bottom: 1em;
  }

  .btn-info {
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.7em 1.5em;
    border-radius: 4em;
    background: #f0f0f0;
    color: #333;
    border: 1px solid #ddd;
    font-family: inherit;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .btn-info:hover {
    background: #e0e0e0;
  }
</style>
