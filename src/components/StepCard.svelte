<script lang="ts">
  import Modal from './Modal.svelte';

  interface Props {
    title: string;
    subtitle: string;
    image: string;
    popupContent: string;
  }

  let { title, subtitle, image, popupContent }: Props = $props();
  let modalOpen = $state(false);
</script>

<div class="step-card">
  <h3 class="step-title">{title}</h3>
  <button class="step-image-btn" onclick={() => modalOpen = true} type="button">
    <img src={image} alt={title} width="333" height="285" loading="lazy">
  </button>
  <h4 class="step-subtitle">{subtitle}</h4>
</div>

<Modal bind:open={modalOpen} size="tiny">
  <p>{@html popupContent}</p>
</Modal>

<style>
  .step-card {
    text-align: center;
  }

  .step-title {
    color: #fff;
    font-size: 19px;
    font-weight: 500;
    text-transform: uppercase;
    margin-bottom: 0.5em;
  }

  .step-image-btn {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: block;
    width: 100%;
    transition: transform 0.2s;
  }

  .step-image-btn:hover {
    transform: scale(1.03);
  }

  .step-image-btn img {
    width: 100%;
    height: auto;
  }

  .step-subtitle {
    font-weight: 300;
    color: #fff;
    font-size: 18px;
    text-transform: none;
    margin-top: 5px;
  }

  @media (max-width: 600px) {
    .step-title {
      font-size: 14px;
      margin-bottom: 0.3em;
      white-space: nowrap;
    }
    .step-image-btn img {
      width: 70%;
      margin: 0 auto;
    }
    .step-subtitle {
      font-size: 12px;
      margin-top: 3px;
      line-height: 1.3;
    }
  }
</style>
