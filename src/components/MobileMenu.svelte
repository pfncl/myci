<script lang="ts">
  let open = $state(false);

  function toggle() {
    open = !open;
  }

  function close() {
    open = false;
  }
</script>

<button type="button" class="hamburger" onclick={toggle} aria-label="Menu">
  <span class="hamburger-line"></span>
  <span class="hamburger-line"></span>
  <span class="hamburger-line"></span>
</button>

{#if open}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="mobile-overlay" onclick={close} onkeydown={(e) => e.key === 'Escape' && close()}>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <nav class="mobile-menu" onclick={(e) => e.stopPropagation()}>
      <button type="button" class="mobile-close" onclick={close} aria-label="Zavřít">
        <span class="icon-cancel"></span>
      </button>

      <a href="/" class="mobile-logo">
        <img src="/images/logo_myci_web.png" alt="Myči.CZ" width="464" height="155">
      </a>

      <div class="mobile-actions">
        <button type="button" class="btn btn-primary mobile-order" data-open-modal="order-form" onclick={close}>
          <span class="icon-paper-plane-light"></span>
          OBJEDNÁVKA
        </button>

        <a href="tel:704405060" class="btn-phone">
          <span class="icon-phone"></span> David: 704 40 50 60
        </a>
        <a href="tel:608820647" class="btn-phone">
          <span class="icon-phone"></span> Daniel: 608 820 647
        </a>
      </div>

      <div class="mobile-social">
        <a href="#" class="social-link" aria-label="Facebook">
          <span class="icon-iconmonstr-facebook-1"></span>
        </a>
        <a href="#" class="social-link" aria-label="YouTube">
          <span class="icon-youtube"></span>
        </a>
      </div>
    </nav>
  </div>
{/if}

<style>
  .hamburger {
    display: flex;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
  }

  .hamburger-line {
    display: block;
    width: 28px;
    height: 3px;
    background: #333;
    border-radius: 2px;
    transition: transform 0.2s;
  }

  .mobile-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 10000;
  }

  .mobile-menu {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(300px, 80vw);
    background: #3d404f;
    color: #fff;
    padding: 2em 1.5em;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }

  .mobile-close {
    position: absolute;
    top: 1em;
    right: 1em;
    background: none;
    border: none;
    color: #fff;
    font-size: 1.5em;
    cursor: pointer;
  }

  .mobile-logo img {
    max-width: 200px;
    height: auto;
  }

  .mobile-actions {
    display: flex;
    flex-direction: column;
    gap: 0.8em;
  }

  .mobile-order {
    width: 100%;
    justify-content: center;
  }

  :global(.mobile-menu .btn-phone) {
    color: #ccc;
    background: rgba(255, 255, 255, 0.1);
    text-align: center;
    justify-content: center;
  }

  .mobile-social {
    display: flex;
    gap: 1em;
    margin-top: auto;
  }

  .social-link {
    color: #fff;
    font-size: 1.3em;
    opacity: 0.7;
    transition: opacity 0.2s;
  }

  .social-link:hover {
    opacity: 1;
  }
</style>
