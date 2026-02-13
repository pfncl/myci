<script lang="ts">
  type ConsentState = {
    functional: boolean;
    preferences: boolean;
    statistics: boolean;
    marketing: boolean;
  };

  let showBanner = $state(false);
  let showPreferences = $state(false);

  let consent = $state<ConsentState>({
    functional: true,
    preferences: false,
    statistics: false,
    marketing: false,
  });

  $effect(() => {
    const stored = localStorage.getItem('cookie-consent');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        consent = { ...consent, ...parsed };
      } catch { /* ignore */ }
    } else {
      showBanner = true;
    }
  });

  function acceptAll() {
    consent = { functional: true, preferences: true, statistics: true, marketing: true };
    saveAndClose();
  }

  function denyAll() {
    consent = { functional: true, preferences: false, statistics: false, marketing: false };
    saveAndClose();
  }

  function savePreferences() {
    saveAndClose();
  }

  function saveAndClose() {
    localStorage.setItem('cookie-consent', JSON.stringify(consent));
    showBanner = false;
    showPreferences = false;
  }

  const categories = [
    {
      key: 'functional' as const,
      title: 'Funkční',
      description: 'Technické uložení nebo přístup je nezbytně nutný pro legitimní účel umožnění použití konkrétní služby, kterou si odběratel nebo uživatel výslovně vyžádal.',
      alwaysActive: true,
    },
    {
      key: 'preferences' as const,
      title: 'Předvolby',
      description: 'Technické uložení nebo přístup je nezbytný pro legitimní účel ukládání preferencí, které nejsou požadovány odběratelem nebo uživatelem.',
      alwaysActive: false,
    },
    {
      key: 'statistics' as const,
      title: 'Statistiky',
      description: 'Technické uložení nebo přístup, který se používá výhradně pro statistické účely.',
      alwaysActive: false,
    },
    {
      key: 'marketing' as const,
      title: 'Marketing',
      description: 'Technické uložení nebo přístup je nutný k vytvoření uživatelských profilů za účelem zasílání reklamy nebo sledování uživatele.',
      alwaysActive: false,
    },
  ];
</script>

{#if showBanner}
<div class="cookie-banner" role="dialog" aria-label="Spravovat Souhlas s cookies">
  <div class="cookie-inner">
    <div class="cookie-header">
      <h3>Spravovat Souhlas s cookies</h3>
      <button type="button" class="cookie-close" onclick={() => { showBanner = false; }} aria-label="Zavřít">
        &times;
      </button>
    </div>

    <div class="cookie-body">
      <p>Abychom poskytli co nejlepší služby, používáme k ukládání a/nebo přístupu k informacím o zařízení, technologie jako jsou soubory cookies. Souhlas s těmito technologiemi nám umožní zpracovávat údaje, jako je chování při procházení nebo jedinečná ID na tomto webu.</p>

      {#if showPreferences}
        <div class="cookie-categories">
          {#each categories as cat}
            <details class="cookie-category">
              <summary>
                <span class="category-title">{cat.title}</span>
                {#if cat.alwaysActive}
                  <span class="always-active">Vždy aktivní</span>
                {:else}
                  <label class="toggle" onclick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      bind:checked={consent[cat.key]}
                    >
                    <span class="toggle-text">{consent[cat.key] ? 'Zapnuto' : 'Vypnuto'}</span>
                  </label>
                {/if}
              </summary>
              <p class="category-desc">{cat.description}</p>
            </details>
          {/each}
        </div>
      {/if}
    </div>

    <div class="cookie-buttons">
      <button type="button" class="cbtn cbtn-accept" onclick={acceptAll}>Příjmout</button>
      <button type="button" class="cbtn cbtn-deny" onclick={denyAll}>Odmítnout</button>
      {#if showPreferences}
        <button type="button" class="cbtn cbtn-save" onclick={savePreferences}>Uložit předvolby</button>
      {:else}
        <button type="button" class="cbtn cbtn-prefs" onclick={() => showPreferences = true}>Zobrazit předvolby</button>
      {/if}
    </div>
  </div>
</div>
{/if}

<style>
  .cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100000;
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 -2px 20px rgba(0, 0, 0, 0.15);
    padding: 1.5em;
  }

  .cookie-inner {
    max-width: 900px;
    margin: 0 auto;
  }

  .cookie-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1em;
  }

  .cookie-header h3 {
    font-size: 1.1em;
    margin: 0;
  }

  .cookie-close {
    background: none;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    padding: 0;
    line-height: 1;
    color: #666;
  }

  .cookie-body p {
    font-size: 0.9em;
    color: #555;
    line-height: 1.5;
    margin-bottom: 1em;
  }

  .cookie-categories {
    margin-bottom: 1em;
  }

  .cookie-category {
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin-bottom: 0.5em;
  }

  .cookie-category summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.7em 1em;
    cursor: pointer;
    list-style: none;
  }

  .cookie-category summary::-webkit-details-marker {
    display: none;
  }

  .category-title {
    font-weight: 600;
    font-size: 0.95em;
  }

  .always-active {
    font-size: 0.85em;
    color: #4FA4DB;
    font-weight: 600;
  }

  .toggle {
    display: flex;
    align-items: center;
    gap: 0.5em;
    font-size: 0.85em;
    cursor: pointer;
  }

  .toggle input[type="checkbox"] {
    width: 18px;
    height: 18px;
  }

  .toggle-text {
    color: #666;
  }

  .category-desc {
    padding: 0 1em 0.7em;
    font-size: 0.85em;
    color: #666;
  }

  .cookie-buttons {
    display: flex;
    gap: 0.5em;
    flex-wrap: wrap;
  }

  .cbtn {
    padding: 0.7em 1.5em;
    border-radius: 4px;
    font-family: inherit;
    font-size: 0.9em;
    cursor: pointer;
    border: 1px solid #ccc;
    transition: background 0.2s;
  }

  .cbtn-accept {
    background: #4FA4DB;
    color: #fff;
    border-color: #4FA4DB;
  }

  .cbtn-accept:hover {
    background: #3d8fc4;
  }

  .cbtn-deny {
    background: #f0f0f0;
    color: #333;
  }

  .cbtn-deny:hover {
    background: #e0e0e0;
  }

  .cbtn-prefs,
  .cbtn-save {
    background: transparent;
    color: #4FA4DB;
    border-color: #4FA4DB;
  }

  .cbtn-prefs:hover,
  .cbtn-save:hover {
    background: rgba(79, 164, 219, 0.1);
  }

  @media (max-width: 600px) {
    .cookie-buttons {
      flex-direction: column;
    }
    .cbtn {
      width: 100%;
      text-align: center;
    }
  }
</style>
