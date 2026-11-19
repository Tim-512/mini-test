(function (root) {
  'use strict';

  // 分数最高的结果胜出；平分时，在越靠后的题里得过分的越优先；还分不出就取排在前面的
  function score(quiz, answers) {
    var totals = {}, last = {};
    quiz.results.forEach(function (r) { totals[r.id] = 0; last[r.id] = -1; });
    answers.forEach(function (optIndex, qi) {
      var s = quiz.questions[qi].options[optIndex].s;
      Object.keys(s).forEach(function (id) { totals[id] += s[id]; last[id] = qi; });
    });
    var best = quiz.results[0].id;
    quiz.results.forEach(function (r) {
      var id = r.id;
      if (totals[id] > totals[best] || (totals[id] === totals[best] && last[id] > last[best])) best = id;
    });
    return best;
  }

  function createState(quiz) {
    var st = { answers: [], done: false, locked: false };
    st.answer = function (i) {
      if (st.locked || st.done) return false;
      st.answers.push(i);
      st.locked = true;
      st.done = st.answers.length >= quiz.questions.length;
      return true;
    };
    st.unlock = function () { st.locked = false; };
    return st;
  }

  // ---------- DOM ----------
  function h(tag, cls, html) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (html != null) el.innerHTML = html;
    return el;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }
  function art(r, cls) {
    var el = h('div', cls);
    try { el.innerHTML = root.Chars.svg(r.art); } catch (e) { /* 形象画不出来时只显示文字 */ }
    return el;
  }

  function mount(rootEl, quiz) {
    var t = quiz.theme || {};
    var css = document.documentElement.style;
    if (t.bg) css.setProperty('--bg', t.bg);
    if (t.accent) css.setProperty('--accent', t.accent);
    if (t.ink) css.setProperty('--ink', t.ink);
    document.title = quiz.title;

    function show(node) {
      rootEl.innerHTML = '';
      node.classList.add('screen');
      rootEl.appendChild(node);
      window.scrollTo(0, 0);
    }

    function cover() {
      var el = h('div', 'cover');
      var row = h('div', 'cover-row');
      quiz.results.slice(0, 4).forEach(function (r) { row.appendChild(art(r, 'cover-ip')); });
      el.appendChild(row);
      el.appendChild(h('h1', 'cover-title', esc(quiz.title)));
      el.appendChild(h('p', 'cover-sub', esc(quiz.subtitle || '')));
      el.appendChild(h('p', 'cover-meta', '共 ' + quiz.questions.length + ' 题 · 约 1 分钟 · ' + quiz.results.length + ' 种结果'));
      var btn = h('button', 'btn', '开始测试');
      btn.onclick = function () { run(); };
      el.appendChild(btn);
      el.appendChild(h('p', 'foot', '凭直觉选，别想太久'));
      show(el);
    }

    function run() {
      var st = createState(quiz);
      function ask() {
        var qi = st.answers.length;
        var q = quiz.questions[qi];
        var el = h('div', 'ask');
        var bar = h('div', 'bar');
        var fill = h('div', 'bar-fill');
        fill.style.width = (qi / quiz.questions.length * 100) + '%';
        bar.appendChild(fill);
        el.appendChild(bar);
        el.appendChild(h('p', 'ask-n', (qi + 1) + ' / ' + quiz.questions.length));
        el.appendChild(h('h2', 'ask-q', esc(q.q)));
        q.options.forEach(function (o, i) {
          var b = h('button', 'opt', esc(o.t));
          b.onclick = function () {
            if (!st.answer(i)) return;
            b.classList.add('picked');
            setTimeout(function () {
              st.unlock();
              if (st.done) reveal(score(quiz, st.answers)); else ask();
            }, 260);
          };
          el.appendChild(b);
        });
        show(el);
      }
      ask();
    }

    function reveal(id) {
      var el = h('div', 'loading', '<div class="spin"></div><p>正在生成你的专属结果…</p>');
      show(el);
      setTimeout(function () { result(id); }, 1200);
    }

    function result(id) {
      var r = quiz.results.filter(function (x) { return x.id === id; })[0];
      var el = h('div', 'result');
      var card = h('div', 'card');
      card.appendChild(h('p', 'card-from', esc(quiz.title)));
      card.appendChild(art(r, 'card-ip'));
      card.appendChild(h('p', 'card-you', '你是'));
      var nm = h('h1', 'card-name', esc(r.name));
      nm.style.fontSize = Math.min(36, Math.floor(264 / r.name.length)) + 'px';
      card.appendChild(nm);
      card.appendChild(h('p', 'card-tag', esc(r.tag)));
      card.appendChild(h('div', 'tags', r.keywords.map(function (k) { return '<span>#' + esc(k) + '</span>'; }).join('')));
      card.appendChild(h('div', 'stats', r.stats.map(function (s) {
        return '<div class="stat"><span>' + esc(s[0]) + '</span><i><em style="width:' + s[1] + '%"></em></i><b>' + s[1] + '%</b></div>';
      }).join('')));
      card.appendChild(h('p', 'card-desc', esc(r.desc)));
      var gb = h('div', 'gb');
      gb.appendChild(h('div', 'gb-box', '<b>闪光点</b><p>' + esc(r.good) + '</p>'));
      gb.appendChild(h('div', 'gb-box', '<b>小雷区</b><p>' + esc(r.bad) + '</p>'));
      card.appendChild(gb);
      card.appendChild(h('p', 'quote', '口头禅：「' + esc(r.catch) + '」'));
      var m = quiz.results.filter(function (x) { return x.id === r.match; })[0];
      if (m) {
        var mt = h('div', 'match');
        mt.appendChild(art(m, 'match-ip'));
        mt.appendChild(h('p', 'match-txt', '<span>最佳搭子</span><b>' + esc(m.name) + '</b><small>快去 @ 你身边的 TA</small>'));
        card.appendChild(mt);
      }
      el.appendChild(card);
      el.appendChild(h('p', 'foot', '长按截图，发给最懂你的朋友 · 结果仅供娱乐'));
      var again = h('button', 'btn ghost', '再测一次');
      again.onclick = cover;
      el.appendChild(again);
      show(el);
    }

    var local = location.protocol === 'file:' || /^(localhost|127\.0\.0\.1)$/.test(location.hostname);
    var m = /[?&]r=([^&]+)/.exec(location.search);
    if (local && m && quiz.results.some(function (x) { return x.id === m[1]; })) result(m[1]);
    else cover();
  }

  var api = { score: score, createState: createState, mount: mount };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.QuizEngine = api;
})(this);
