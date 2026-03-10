const STORAGE_KEY = 'edreams.ancillary.deck.activeTab';
const FOLD_STORAGE_KEY = 'edreams.ancillary.deck.folds';
const toggleAllFoldsButton = document.getElementById('toggle-all-folds');

// When the page is loaded or refreshed we want to clear any previously
// persisted state so that we always start with the first tab selected and
// all fold sections collapsed.  This matches the new requirement to reset
// content on refresh.
function resetPersistentState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(FOLD_STORAGE_KEY);
  } catch {}
}


function getTabButtons() {
  return Array.from(document.querySelectorAll('.tab-btn[data-tab]'));
}

function getTabPanels() {
  return Array.from(document.querySelectorAll('.tab-panel[id^="full-tab-"]'));
}

function getFolds() {
  return Array.from(document.querySelectorAll('.fold[data-fold-id]'));
}

function makeFoldId(panelId, label) {
  const slug = String(label)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `${panelId}.${slug || 'section'}`;
}

function hydrateFullContentFolds() {
  const fullContents = Array.from(document.querySelectorAll('.full-content'));

  fullContents.forEach((fullContent) => {
    if (fullContent.querySelector('.fold')) {
      return;
    }

    const panel = fullContent.closest('.tab-panel');
    const panelId = panel?.id || 'panel';
    const heading = fullContent.querySelector('h2');
    const fallbackTitle = heading?.textContent?.trim() || 'Overview';
    const children = Array.from(fullContent.children).filter((node) => node !== heading);

    if (!children.length) {
      return;
    }

    const groups = [];
    const preambleNodes = [];
    let currentGroup = null;
    let hasSeenSectionHeader = false;

    children.forEach((node) => {
      if (node.tagName === 'H3') {
        if (currentGroup) {
          groups.push(currentGroup);
        }

        hasSeenSectionHeader = true;

        currentGroup = {
          title: node.textContent?.trim() || 'Section',
          nodes: [],
        };
        return;
      }

      if (!hasSeenSectionHeader) {
        preambleNodes.push(node);
        return;
      }

      if (!currentGroup) {
        currentGroup = {
          title: fallbackTitle,
          nodes: [],
        };
      }

      currentGroup.nodes.push(node);
    });

    if (currentGroup) {
      groups.push(currentGroup);
    }

    children.forEach((node) => node.remove());

    preambleNodes.forEach((node) => fullContent.appendChild(node));

    if (!groups.length) {
      return;
    }

    const foldGroup = document.createElement('div');
    foldGroup.className = 'fold-group';

    groups.forEach((group, index) => {
      const details = document.createElement('details');
      details.className = 'fold';
      // always start collapsed; we clear persistent state elsewhere so
      // nothing will override this on page refresh.
      details.open = false;
      details.dataset.foldId = makeFoldId(panelId, group.title);

      const summary = document.createElement('summary');
      summary.textContent = group.title;
      details.appendChild(summary);

      const content = document.createElement('div');
      content.className = 'fold-content';
      group.nodes.forEach((node) => content.appendChild(node));
      details.appendChild(content);
      foldGroup.appendChild(details);
    });

    fullContent.appendChild(foldGroup);
  });
}

function readFoldState() {
  try {
    const raw = localStorage.getItem(FOLD_STORAGE_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed ? parsed : {};
  } catch {
    return {};
  }
}

function writeFoldState(state) {
  localStorage.setItem(FOLD_STORAGE_KEY, JSON.stringify(state));
}

function restoreFolds() {
  const state = readFoldState();
  getFolds().forEach((fold) => {
    const id = fold.dataset.foldId;
    if (!id) {
      return;
    }

    if (Object.prototype.hasOwnProperty.call(state, id)) {
      fold.open = Boolean(state[id]);
    }
  });
}

function bindFoldPersistence() {
  getFolds().forEach((fold) => {
    if (fold.dataset.persistBound === 'true') {
      return;
    }

    fold.addEventListener('toggle', () => {
      const id = fold.dataset.foldId;
      if (!id) {
        return;
      }
      const state = readFoldState();
      state[id] = fold.open;
      writeFoldState(state);
    });

    fold.dataset.persistBound = 'true';
  });
}

function getActivePanelFolds() {
  const activePanel = document.querySelector('.tab-panel.active');
  if (!activePanel) {
    return [];
  }
  return Array.from(activePanel.querySelectorAll('.fold[data-fold-id]'));
}

function updateToggleAllLabel() {
  if (!toggleAllFoldsButton) {
    return;
  }

  const activeFolds = getActivePanelFolds();
  if (!activeFolds.length) {
    toggleAllFoldsButton.disabled = true;
    toggleAllFoldsButton.textContent = 'Expand all';
    return;
  }

  toggleAllFoldsButton.disabled = false;
  const allOpen = activeFolds.every((fold) => fold.open);
  toggleAllFoldsButton.textContent = allOpen ? 'Collapse all' : 'Expand all';
}

function toggleAllActivePanelFolds() {
  const activeFolds = getActivePanelFolds();
  if (!activeFolds.length) {
    return;
  }

  const shouldOpen = activeFolds.some((fold) => !fold.open);
  const state = readFoldState();

  activeFolds.forEach((fold) => {
    fold.open = shouldOpen;
    const id = fold.dataset.foldId;
    if (id) {
      state[id] = shouldOpen;
    }
  });

  writeFoldState(state);
  updateToggleAllLabel();
}

function isValidTabId(tabId) {
  return getTabButtons().some((btn) => btn.dataset.tab === tabId);
}

function getInitialTabId() {
  // Always ignore any external hints and fall back to the very first
  // tab.  The caller (initializeTabs) will already have cleared persistent
  // storage so we don't need to remove items here again.
  return getTabButtons()[0]?.dataset.tab || null;
}

function activateTab(tabId, trigger) {
  if (!isValidTabId(tabId)) {
    return;
  }

  const tabButtons = getTabButtons();
  const tabPanels = getTabPanels();

  tabButtons.forEach((btn) => {
    const isActive = btn.dataset.tab === tabId;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', String(isActive));
    btn.setAttribute('tabindex', isActive ? '0' : '-1');
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle('active', panel.id === tabId);
  });

  localStorage.setItem(STORAGE_KEY, tabId);
  if (window.location.hash !== `#${tabId}`) {
    history.replaceState(null, '', `#${tabId}`);
  }

  if (trigger) {
    trigger.focus();
  }

  updateToggleAllLabel();
}

function nextTabIndex(currentIndex, delta) {
  const tabButtons = getTabButtons();
  const next = currentIndex + delta;
  if (next < 0) {
    return tabButtons.length - 1;
  }
  if (next >= tabButtons.length) {
    return 0;
  }
  return next;
}

function bindTabInteractions() {
  const tabButtons = getTabButtons();

  tabButtons.forEach((btn, index) => {
    if (btn.dataset.tabBound === 'true') {
      return;
    }

    btn.addEventListener('click', () => {
      activateTab(btn.dataset.tab, btn);
    });

    btn.addEventListener('keydown', (event) => {
      const currentButtons = getTabButtons();
      const currentIndex = currentButtons.findIndex((item) => item === btn);

      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        const nextBtn = currentButtons[nextTabIndex(currentIndex, 1)];
        activateTab(nextBtn.dataset.tab, nextBtn);
        return;
      }

      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        const nextBtn = currentButtons[nextTabIndex(currentIndex, -1)];
        activateTab(nextBtn.dataset.tab, nextBtn);
        return;
      }

      if (event.key === 'Home') {
        event.preventDefault();
        activateTab(currentButtons[0].dataset.tab, currentButtons[0]);
        return;
      }

      if (event.key === 'End') {
        event.preventDefault();
        const last = currentButtons[currentButtons.length - 1];
        activateTab(last.dataset.tab, last);
      }
    });

    btn.dataset.tabBound = 'true';
  });
}

function initializeTabs() {
  // clear any previous active tab or fold state so that each page load
  // starts fresh with the first tab and all folds closed.
  resetPersistentState();
  bindTabInteractions();

  const initialTabId = getInitialTabId();
  if (initialTabId) {
    activateTab(initialTabId);
  }
}

function bindFoldToggleLabelSync() {
  getFolds().forEach((fold) => {
    if (fold.dataset.labelBound === 'true') {
      return;
    }

    fold.addEventListener('toggle', updateToggleAllLabel);
    fold.dataset.labelBound = 'true';
  });
}

function refreshDeckFolds() {
  hydrateFullContentFolds();
  restoreFolds();
  bindFoldPersistence();
  bindFoldToggleLabelSync();
  updateToggleAllLabel();
}

window.edreamsDeckRefresh = refreshDeckFolds;
window.edreamsActivateTab = activateTab;
window.edreamsInitTabs = initializeTabs;

initializeTabs();
refreshDeckFolds();

if (toggleAllFoldsButton) {
  toggleAllFoldsButton.addEventListener('click', toggleAllActivePanelFolds);
}
