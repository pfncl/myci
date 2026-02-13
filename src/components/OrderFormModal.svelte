<script lang="ts">
  import Modal from './Modal.svelte';
  import OrderForm from './OrderForm.svelte';

  let open = $state(false);

  $effect(() => {
    function handleClick(e: Event) {
      const target = e.target as HTMLElement;
      if (target.closest?.('[data-open-modal="order-form"]')) {
        e.preventDefault();
        open = true;
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });
</script>

<Modal bind:open size="large">
  <OrderForm />
</Modal>
