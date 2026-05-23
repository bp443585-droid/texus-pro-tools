// related-tools.js - Ultra-compact Universal Related Tools Engine

window.addEventListener('load', function() {
  const currentUrl = window.location.pathname.replace(/\/+$/, '').toLowerCase();

  // Find the master footer to inject our panel just before it
  const footer = document.querySelector('.master-footer');
  if (!footer) return;

  // Create the main panel container programmatically
  const wrapper = document.createElement('div');
  wrapper.id = 'automated_related_tools_panel';
  wrapper.style.cssText = 'display:none; max-width:800px; margin:40px auto 20px auto; padding:0 20px; font-family:"Inter",sans-serif; box-sizing:border-box;';
  
  wrapper.innerHTML = `
    <div style="font-size:1.25rem; color:#0f172a; font-weight:800; margin-bottom:20px; display:flex; align-items:center; gap:8px; border-bottom:2px solid #f1f5f9; padding-bottom:12px;">
      <span>🔗</span> Explore More Tools
    </div>
    <div id="related_tools_injection_grid" class="rel-grid-matrix"></div>
  `;

  // Inject the panel right before the footer element
  footer.parentNode.insertBefore(wrapper, footer);
  const container = document.getElementById('related_tools_injection_grid');

  // Inject CSS Styles dynamically into the head section
  const style = document.createElement('style');
  style.innerHTML = `
    .rel-grid-matrix { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; }
    .rel-item-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 18px; padding: 16px; display: flex; align-items: flex-start; gap: 14px; text-decoration: none; color: inherit; transition: all .25s ease; box-sizing: border-box; }
    .rel-item-card:hover { background: #eff6ff; border-color: #bfdbfe; transform: translateY(-3px); box-shadow: 0 10px 25px rgba(37,99,235,.08); }
    .rel-icon-frame { font-size: 1.7rem; min-width: 34px; line-height: 1; flex-shrink: 0; }
    .rel-content-frame { display: flex; flex-direction: column; gap: 5px; width: 100%; min-width: 0; }
    .rel-item-title { font-size: 1rem; font-weight: 700; color: #1e293b; margin: 0; line-height: 1.4; transition: .2s; }
    .rel-item-desc { font-size: .84rem; color: #64748b; line-height: 1.6; margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .rel-item-card:hover .rel-item-title { color: #2563eb; }
    @media(max-width:768px){
      .rel-grid-matrix { grid-template-columns: 1fr !important; gap: 10px !important; }
      .rel-item-card { padding: 14px; }
    }
  `;
  document.head.appendChild(style);

  // Cross-fetch system to crawl index pipeline smoothly
  fetch('/')
    .then(response => {
      if (!response.ok) throw new Error('Homepage fetch structural malfunction.');
      return response.text();
    })
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const cards = doc.querySelectorAll('.tool-card');

      if (!cards || cards.length === 0) return;

      const allTools = [];

      cards.forEach(card => {
        const href = card.getAttribute('href');
        if (!href) return;

        const cleanUrl = href.replace(/^https?:\/\/[^\/]+/i, '').replace(/\/+$/, '').toLowerCase();

        // Structural blacklisting filter arrays
        if (
          cleanUrl === '/' || 
          cleanUrl === '' || 
          cleanUrl.includes('privacy-policy') || 
          cleanUrl.includes('about') || 
          cleanUrl.includes('contact')
        ) {
          return;
        }

        const iconElement = card.querySelector('.tool-icon');
        const titleElement = card.querySelector('h3');
        const descElement = card.querySelector('p');

        const icon = iconElement ? iconElement.textContent.trim() : '🛠️';
        const title = titleElement ? titleElement.textContent.trim() : 'Premium Tool';
        const desc = descElement ? descElement.textContent.trim() : 'Open this premium utility tool instantly.';

        const combinedText = (title + ' ' + desc + ' ' + cleanUrl).toLowerCase();
        const keywords = combinedText.replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(word => word.length > 2);

        allTools.push({
          url: cleanUrl,
          title: title,
          desc: desc,
          icon: icon,
          keywords: keywords
        });
      });

      if (allTools.length === 0) return;

      // Locate current active payload node
      let currentTool = null;
      allTools.forEach(tool => {
        if (tool.url === currentUrl || currentUrl.includes(tool.url) || tool.url.includes(currentUrl)) {
          currentTool = tool;
        }
      });

      // Semantic weight matching architecture
      function similarityScore(toolA, toolB) {
        if (!toolA) return 0;
        let score = 0;
        toolA.keywords.forEach(word => {
          if (toolB.keywords.includes(word)) score++;
        });
        return score;
      }

      const scoredTools = [];
      allTools.forEach(tool => {
        if (tool.url === currentUrl || currentUrl.includes(tool.url) || tool.url.includes(currentUrl)) return;
        const score = similarityScore(currentTool, tool);
        scoredTools.push({ tool: tool, score: score });
      });

      if (scoredTools.length === 0) return;

      // Sort system descending matching score
      scoredTools.sort((a, b) => b.score - a.score);

      const groupedScores = {};
      scoredTools.forEach(item => {
        if (!groupedScores[item.score]) groupedScores[item.score] = [];
        groupedScores[item.score].push(item);
      });

      let sortedFinal = [];
      Object.keys(groupedScores).sort((a, b) => b - a).forEach(scoreKey => {
        const group = groupedScores[scoreKey];
        // Fisher-Yates array shuffle for organic output variety
        for (let i = group.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = group[i];
          group[i] = group[j];
          group[j] = temp;
        }
        sortedFinal = sortedFinal.concat(group);
      });

      const finalTools = sortedFinal.map(item => item.tool);
      const limit = Math.min(finalTools.length, 4);

      if (limit <= 0) return;

      let output = '';
      for (let i = 0; i < limit; i++) {
        const tool = finalTools[i];
        output += `
          <a class="rel-item-card" href="${tool.url}">
            <div class="rel-icon-frame">${tool.icon}</div>
            <div class="rel-content-frame">
              <h4 class="rel-item-title">${tool.title}</h4>
              <p class="rel-item-desc">${tool.desc}</p>
            </div>
          </a>
        `;
      }

      container.innerHTML = output;
      wrapper.style.display = 'block';
    })
    .catch(error => {
      console.log('Related tools pipeline status: inactive.');
    });
});
