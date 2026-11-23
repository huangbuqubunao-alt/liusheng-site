(function () {
  var cfg = window.LIUSHENG_SITE_CONFIG || {};

  // 1. Dual-state demo switcher
  var tabLiving = document.getElementById('tab-living');
  var tabStar = document.getElementById('tab-star');
  var previewImg = document.getElementById('showcase-image');
  var captionEl = document.getElementById('showcase-caption');

  var STATES = {
    living: {
      src: './assets/preview-living-book.png',
      alt: '留声桌面端在世长辈「人间岁月卷」示例书房界面：周伯庸（样板演示）档案扉页与 70 道年代话头共读台',
      caption:
        '<strong>样板演示 · 在世长辈「人间岁月卷」</strong>（合成音画素材 · 遵循 GB 45438-2025）：展示 1936 年生人年代校准话头、照片时间轴与原声精校入口；在世分册全栈禁止任何 AI 替身对话。',
    },
    star: {
      src: './assets/preview-star-courtyard.png',
      alt: '留声桌面端已逝亲人「星上回响卷」2.5D 星星上的茶花小院示例界面：第一顺位近亲属守护存证与防风煤油马灯/茶花树/星光邮筒锚点',
      caption:
        '<strong>样板演示 · 已逝亲人「星上回响卷」</strong>（合成音画素材 · 遵循 GB 45438-2025）：需完成《民法典》第 994 条第一顺位近亲属存证后开启；默认 2.5D 视差画卷，点击廊下竹椅与旧物触发本地原声回响，支持一键撤回冻结。',
    },
  };

  function setShowcase(mode) {
    var entry = STATES[mode] || STATES.living;
    if (previewImg) {
      previewImg.setAttribute('src', entry.src);
      previewImg.setAttribute('alt', entry.alt);
    }
    if (captionEl) {
      captionEl.innerHTML = entry.caption;
    }
    if (tabLiving && tabStar) {
      tabLiving.setAttribute('aria-selected', mode === 'living' ? 'true' : 'false');
      tabStar.setAttribute('aria-selected', mode === 'star' ? 'true' : 'false');
    }
  }

  if (tabLiving) {
    tabLiving.addEventListener('click', function () {
      setShowcase('living');
    });
  }
  if (tabStar) {
    tabStar.addEventListener('click', function () {
      setShowcase('star');
    });
  }

  // 2. Bind runtime config fields (DMG metadata, purchase URLs, notarization status)
  var versionEl = document.getElementById('cfg-version');
  var fileEl = document.getElementById('cfg-dmg-name');
  var sizeEl = document.getElementById('cfg-dmg-size');
  var shaEl = document.getElementById('cfg-dmg-sha');
  var downloadBtn = document.getElementById('dmg-download-cta');
  var downloadDrawer = document.getElementById('dmg-pending-drawer');
  var familyBtn = document.getElementById('family-buy-cta');
  var familyDrawer = document.getElementById('family-order-drawer');
  var studioBtn = document.getElementById('studio-buy-cta');
  var studioDrawer = document.getElementById('studio-order-drawer');
  var gatekeeperBox = document.getElementById('gatekeeper-notice-box');

  if (versionEl && cfg.version) versionEl.textContent = 'v' + cfg.version;
  if (fileEl && cfg.dmgFileName) fileEl.textContent = cfg.dmgFileName;
  if (sizeEl && cfg.dmgSizeLabel) sizeEl.textContent = cfg.dmgSizeLabel;
  if (shaEl && cfg.dmgSha256) shaEl.textContent = cfg.dmgSha256;

  function wireCtaOrDrawer(button, drawer, url, pendingLabel) {
    if (!button) return;
    if (url && /^https?:\/\//i.test(url)) {
      button.setAttribute('href', url);
      button.setAttribute('target', '_blank');
      button.setAttribute('rel', 'noopener noreferrer');
      if (drawer) drawer.hidden = true;
    } else {
      button.setAttribute('href', '#' + (drawer ? drawer.id : 'download'));
      button.setAttribute('aria-expanded', 'false');
      if (pendingLabel) button.textContent = pendingLabel;
      button.addEventListener('click', function (ev) {
        ev.preventDefault();
        if (!drawer) return;
        var nextHidden = !drawer.hidden;
        drawer.hidden = nextHidden;
        button.setAttribute('aria-expanded', String(!nextHidden));
      });
    }
  }

  wireCtaOrDrawer(
    downloadBtn,
    downloadDrawer,
    cfg.dmgDownloadUrl,
    '获取 v' + (cfg.version || '3.0.0') + ' 安装镜像 (.dmg)'
  );
  wireCtaOrDrawer(
    familyBtn,
    familyDrawer,
    cfg.familyBuyUrl,
    '了解传家版订购方式（¥198）'
  );
  wireCtaOrDrawer(
    studioBtn,
    studioDrawer,
    cfg.studioBuyUrl,
    '预约工作室试测（¥1,280/年）'
  );

  // 3. Notarization notice box
  if (gatekeeperBox && cfg.notarizationStatus === 'notarized') {
    gatekeeperBox.classList.add('notarized-box');
    gatekeeperBox.innerHTML =
      '<h3>已完成 Apple Developer 公证与装订</h3>' +
      '<ol>' +
      '<li>本版本已完成 Apple 官方签名与 Notary 公证票据装订，支持在 macOS 12–15 双击直接打开；</li>' +
      '<li>安装前仍建议对照左侧 SHA-256 指纹核验安装包完整性；</li>' +
      '<li>首次录音时点击「允许」授予麦克风权限，所有录音与照片均保存在本机。</li>' +
      '</ol>';
  }

  // 4. SHA-256 copy button
  var copyBtn = document.getElementById('copy-sha-btn');
  var copyStatus = document.getElementById('copy-sha-status');
  if (copyBtn && shaEl) {
    copyBtn.addEventListener('click', function () {
      var hash = (shaEl.textContent || '').trim();
      if (!hash) return;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(hash)
          .then(function () {
            if (copyStatus) copyStatus.textContent = '已复制';
            setTimeout(function () {
              if (copyStatus) copyStatus.textContent = '';
            }, 2500);
          })
          .catch(function () {
            if (copyStatus) copyStatus.textContent = '请手动选中上方校验和复制';
          });
      } else if (copyStatus) {
        copyStatus.textContent = '请手动选中上方校验和复制';
      }
    });
  }
})();
