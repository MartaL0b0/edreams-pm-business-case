(function () {
  const SOURCE_MD = './PM-Business-Case.md';
  const dynamicTabList = document.getElementById('dynamic-tab-list');
  const dynamicTabPanels = document.getElementById('dynamic-tab-panels');
  const pageTitleNode = document.getElementById('page-title');
  const pageSubtitleNode = document.getElementById('page-subtitle');

  if (typeof marked !== 'undefined') {
    marked.setOptions({
      gfm: true,
      breaks: false,
      headerIds: false,
      mangle: false,
    });
  }

  function renderInlineMarkdown(text) {
    if (typeof marked === 'undefined') {
      return text;
    }

    // Parse as a block and unwrap a single paragraph for reliable inline emphasis rendering.
    const parsed = marked.parse(String(text || ''));
    const singleParagraph = parsed.match(/^\s*<p>([\s\S]*)<\/p>\s*$/i);
    return singleParagraph ? singleParagraph[1] : marked.parseInline(String(text || ''));
  }

  function cleanHeadingLabel(rawHeading) {
    return rawHeading
      .replace(/^\d+\s*[\.)-]\s*/, '')
      .replace(/^context\s*,?\s*/i, 'Context, ')
      .trim();
  }

  function parsePageHeader(markdown) {
    const h1Match = markdown.match(/^#\s+(.+)$/m);
    const title = h1Match ? h1Match[1].trim() : '';

    const beforeFirstSection = markdown.split(/^##\s+/m)[0] || '';
    const introLines = beforeFirstSection
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#'));
    const subtitle = introLines.join(' ');

    return { title, subtitle };
  }

  function applyPageHeader(markdown) {
    const { title, subtitle } = parsePageHeader(markdown);

    if (title && pageTitleNode) {
      pageTitleNode.innerHTML = renderInlineMarkdown(title);
      document.title = title;
    }

    if (subtitle && pageSubtitleNode) {
      pageSubtitleNode.innerHTML = renderInlineMarkdown(subtitle);
    }
  }

  function extractMajorSections(markdown) {
    const sectionRegex = /^##\s+(.+)$/gm;
    const matches = Array.from(markdown.matchAll(sectionRegex));
    const sections = {};
    const sectionOrder = [];

    function resolveSectionId(headingText, index) {
      const numeric = headingText.match(/^(\d+)\s*[\.)-]/);
      if (numeric) {
        return numeric[1];
      }

      if (/^context\b/i.test(headingText)) {
        return '0';
      }

      return String(index);
    }

    matches.forEach((match, index) => {
      const headingText = match[1].trim();
      const sectionId = resolveSectionId(headingText, index);
      const start = match.index || 0;
      const end = index + 1 < matches.length ? (matches[index + 1].index || markdown.length) : markdown.length;
      sections[sectionId] = markdown.slice(start, end).trim();
      sectionOrder.push({
        id: sectionId,
        heading: headingText,
      });
    });

    return {
      sections,
      sectionOrder,
    };
  }

  function buildDynamicTabs(sectionOrder) {
    if (!dynamicTabList || !dynamicTabPanels) {
      return [];
    }

    dynamicTabList.innerHTML = '';
    dynamicTabPanels.innerHTML = '';

    const sectionPairs = [];

    sectionOrder.forEach((entry, index) => {
      const tabId = `full-tab-${entry.id}`;
      const buttonId = `full-btn-${entry.id}`;

      const button = document.createElement('button');
      button.type = 'button';
      button.className = `tab-btn${index === 0 ? ' active' : ''}`;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      button.setAttribute('aria-controls', tabId);
      button.id = buttonId;
      button.dataset.tab = tabId;
      const cleanedHeading = cleanHeadingLabel(entry.heading);
      button.innerHTML = renderInlineMarkdown(cleanedHeading);

      const panel = document.createElement('article');
      panel.className = `tab-panel${index === 0 ? ' active' : ''}`;
      panel.id = tabId;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', buttonId);

      const content = document.createElement('div');
      content.className = 'full-content';
      content.dataset.mdSection = entry.id;
      content.innerHTML = '<p class="loading-note">Loading section content...</p>';
      panel.appendChild(content);

      dynamicTabList.appendChild(button);
      dynamicTabPanels.appendChild(panel);

      sectionPairs.push({
        id: entry.id,
        node: content,
      });
    });

    return sectionPairs;
  }

  function renderSections(sectionPairs, sections) {
    function normalizeTableCellBullets(rootNode) {
      const cells = Array.from(rootNode.querySelectorAll('td'));

      cells.forEach((cell) => {
        const raw = (cell.textContent || '').trim();
        if (!raw.includes('•')) {
          return;
        }

        const items = raw
          .split('•')
          .map((part) => part.trim())
          .filter(Boolean);

        if (items.length < 2 && !raw.startsWith('•')) {
          return;
        }

        const list = document.createElement('ul');
        list.className = 'table-bullet-list';

        items.forEach((item) => {
          const li = document.createElement('li');
          li.textContent = item;
          list.appendChild(li);
        });

        cell.innerHTML = '';
        cell.appendChild(list);
      });
    }

    sectionPairs.forEach((pair) => {
      const markdown = sections[pair.id];

      if (!markdown) {
        pair.node.innerHTML = '<p class="loading-note">No content found for this section.</p>';
        return;
      }

      pair.node.innerHTML = marked.parse(markdown);
      normalizeTableCellBullets(pair.node);
    });

    if (typeof window.edreamsInitTabs === 'function') {
      window.edreamsInitTabs();
    }

    if (typeof window.edreamsDeckRefresh === 'function') {
      window.edreamsDeckRefresh();
    }
  }

  async function loadMarkdown() {
    try {
      const response = await fetch(SOURCE_MD, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const markdown = await response.text();
      applyPageHeader(markdown);
      const { sections, sectionOrder } = extractMajorSections(markdown);
      const sectionPairs = buildDynamicTabs(sectionOrder);
      renderSections(sectionPairs, sections);
    } catch (error) {
      if (dynamicTabPanels) {
        dynamicTabPanels.innerHTML = `<article class="tab-panel active"><div class="full-content"><p class="loading-note">Unable to load markdown content (${error.message}).</p></div></article>`;
      }

      if (typeof window.edreamsDeckRefresh === 'function') {
        window.edreamsDeckRefresh();
      }
    }
  }

  loadMarkdown();
})();
