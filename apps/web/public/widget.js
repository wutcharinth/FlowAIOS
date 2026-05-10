/**
 * FlowAIOS Web Chat — embed loader
 *
 * Drop this on any merchant website to get a bottom-right chat bubble
 * that opens an iframe to the FlowAIOS widget.
 *
 * Usage:
 *   <script src="https://flowaios.vercel.app/widget.js"
 *           data-org="acme"
 *           data-brand="Acme Co"
 *           data-greeting="Hi! How can we help?"
 *           defer></script>
 *
 * No bundler. ~2 KB. Works on any HTML page.
 */
(function () {
  if (window.__FLOWAIOS_WIDGET_LOADED__) return;
  window.__FLOWAIOS_WIDGET_LOADED__ = true;

  var script = document.currentScript;
  var origin = (function () {
    try {
      return new URL(script.src).origin;
    } catch {
      return 'https://flowaios.vercel.app';
    }
  })();

  var org = (script && script.getAttribute('data-org')) || 'demo';
  var brand = (script && script.getAttribute('data-brand')) || 'Web chat';
  var greeting = (script && script.getAttribute('data-greeting')) || '';
  var accent = (script && script.getAttribute('data-accent')) || '#B8632A';

  var iframeSrc =
    origin +
    '/widget?org=' + encodeURIComponent(org) +
    '&brand=' + encodeURIComponent(brand) +
    (greeting ? '&greeting=' + encodeURIComponent(greeting) : '');

  // Bubble button
  var btn = document.createElement('button');
  btn.setAttribute('aria-label', 'Open chat');
  btn.style.cssText = [
    'position:fixed', 'bottom:24px', 'right:24px', 'z-index:2147483646',
    'width:60px', 'height:60px', 'border-radius:50%',
    'border:none', 'cursor:pointer',
    'background:' + accent, 'color:#fff',
    'box-shadow:0 10px 28px rgba(20,24,26,.18), 0 4px 8px rgba(20,24,26,.10)',
    'display:flex', 'align-items:center', 'justify-content:center',
    'font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif',
    'transition:transform .2s ease, box-shadow .2s ease'
  ].join(';');
  btn.innerHTML =
    '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
  btn.onmouseover = function () {
    btn.style.transform = 'translateY(-2px)';
  };
  btn.onmouseout = function () {
    btn.style.transform = 'translateY(0)';
  };

  // Iframe panel
  var frame = document.createElement('iframe');
  frame.src = iframeSrc;
  frame.title = 'FlowAIOS web chat';
  frame.allow = 'clipboard-write';
  frame.style.cssText = [
    'position:fixed', 'bottom:96px', 'right:24px', 'z-index:2147483647',
    'width:380px', 'height:600px', 'max-width:calc(100vw - 32px)', 'max-height:calc(100vh - 120px)',
    'border:none', 'border-radius:16px', 'background:#fff',
    'box-shadow:0 28px 70px rgba(20,24,26,.18), 0 8px 22px rgba(20,24,26,.10)',
    'display:none',
    'overflow:hidden'
  ].join(';');

  function open() {
    frame.style.display = 'block';
    btn.style.display = 'none';
  }
  function close() {
    frame.style.display = 'none';
    btn.style.display = 'flex';
  }

  btn.onclick = open;

  window.addEventListener('message', function (e) {
    if (e.origin !== origin) return;
    var data = e.data;
    if (data && data.source === 'flowaios-widget' && data.type === 'close') {
      close();
    }
  });

  // Inject when DOM is ready
  function inject() {
    document.body.appendChild(btn);
    document.body.appendChild(frame);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
