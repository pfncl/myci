<script lang="ts">
  import { t, type Locale } from '../i18n/translations';

  interface Props {
    lang?: Locale;
  }

  let { lang = 'cs' }: Props = $props();
  const i18n = $derived(t(lang));

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
  <div class="mobile-overlay" onclick={(e) => { if (e.target === e.currentTarget) close(); }} onkeydown={(e) => e.key === 'Escape' && close()}>
    <nav class="mobile-menu">
      <button type="button" class="mobile-close" onclick={close} aria-label={i18n.close}>
        <span class="icon-cancel"></span>
      </button>

      <a href={lang === 'cs' ? '/' : '/en/'} class="mobile-logo">
        <img src="/images/logo_myci_web.png" alt="Myči.CZ" width="464" height="155">
      </a>

      <div class="mobile-actions">
        <button type="button" class="btn btn-primary mobile-order" data-open-modal="order-form" onclick={close}>
          <span class="icon-paper-plane-light"></span>
          {i18n.orderButton}
        </button>

        <a href="tel:704405060" class="btn-phone">
          <span class="icon-phone"></span> David: 704 40 50 60
        </a>
        <a href="tel:608820647" class="btn-phone">
          <span class="icon-phone"></span> Daniel: 608 820 647
        </a>
      </div>

      <div class="mobile-social">
        <a href="https://www.facebook.com/mycicz/" class="social-link fb-link" aria-label="Facebook" target="_blank" rel="noopener">
          <span class="icon-iconmonstr-facebook-1"></span>
        </a>
        <span class="social-divider"></span>
        <a href="/" class="social-link flag-link" class:active={lang === 'cs'} aria-label="Česky">
          <svg viewBox="0 0 32 32" width="22" height="22"><clipPath id="mcz"><circle cx="16" cy="16" r="16"/></clipPath><g clip-path="url(#mcz)"><rect y="0" width="32" height="16" fill="#fff"/><rect y="16" width="32" height="16" fill="#d7141a"/><polygon points="0,0 16,16 0,32" fill="#11457e"/></g></svg>
        </a>
        <a href="/en/" class="social-link flag-link" class:active={lang === 'en'} aria-label="English">
          <svg viewBox="0 0 32 32" width="22" height="22"><clipPath id="mgb"><circle cx="16" cy="16" r="16"/></clipPath><g clip-path="url(#mgb)"><rect width="32" height="32" fill="#012169"/><path d="M0,0 L32,32 M32,0 L0,32" stroke="#fff" stroke-width="5.3"/><path d="M0,0 L32,32" stroke="#C8102E" stroke-width="3.5" clip-path="polygon(16 0, 32 0, 16 16, 32 32, 16 32, 16 16, 0 0)"/><path d="M32,0 L0,32" stroke="#C8102E" stroke-width="3.5" clip-path="polygon(0 0, 16 0, 16 16, 32 32, 16 32, 16 16)"/><rect x="12" width="8" height="32" fill="#fff"/><rect y="12" width="32" height="8" fill="#fff"/><rect x="13.5" width="5" height="32" fill="#C8102E"/><rect y="13.5" width="32" height="5" fill="#C8102E"/></g></svg>
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

  .fb-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #1877F2;
    color: #fff;
    font-size: 14px;
    opacity: 0.9;
  }

  .social-divider {
    width: 1px;
    height: 1.2em;
    background: rgba(255, 255, 255, 0.25);
    align-self: center;
  }

  .flag-link {
    display: flex;
    align-items: center;
    opacity: 0.9;
    font-size: 1em;
  }

  .flag-link.active {
    opacity: 0.35;
  }
</style>
