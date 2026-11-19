/* 结果形象：物件成精。每个形象是一段绘图函数，用这里的工具包画，输出 SVG 字符串。viewBox 0 0 200 220 */
(function (root) {
  'use strict';
  var INK = '#2b2233', PINK = '#ff9fb4', RED = '#ff5c7a', GOLD = '#ffcf4d', WHITE = '#ffffff', BLUE = '#6ec3ff', LILAC = '#a98bff';
  var uid = 0;

  function a(o) { var s = ''; for (var k in o) if (o[k] != null && o[k] !== false) s += ' ' + k + '="' + o[k] + '"'; return s; }
  function st(o, w) { o = o || {}; if (o.stroke === false) { delete o.stroke; return o; } o.stroke = o.stroke || INK; o['stroke-width'] = o['stroke-width'] || w || 5; o['stroke-linecap'] = 'round'; o['stroke-linejoin'] = 'round'; return o; }
  function P(d, fill, o) { o = st(o); o.d = d; o.fill = fill || 'none'; return '<path' + a(o) + '/>'; }
  function E(cx, cy, rx, ry, fill, o) { o = st(o, 4); o.cx = cx; o.cy = cy; o.rx = rx; o.ry = ry; o.fill = fill; return '<ellipse' + a(o) + '/>'; }
  function Ci(cx, cy, r, fill, o) { return E(cx, cy, r, r, fill, o); }
  function R(x, y, w, h, rx, fill, o) { o = st(o, 4); o.x = x; o.y = y; o.width = w; o.height = h; o.rx = rx; o.fill = fill; return '<rect' + a(o) + '/>'; }
  function G(t, inner) { return '<g transform="' + t + '">' + inner + '</g>'; }
  function ns(extra) { var o = { stroke: false }; for (var k in extra) o[k] = extra[k]; return o; }
  function heart(x, y, s, fill) { return G('translate(' + x + ' ' + y + ') scale(' + s + ')', P('M0 7C-12-1-6-11 0-4C6-11 12-1 0 7Z', fill || RED, { 'stroke-width': 2.6 / s })); }
  function spark(x, y, s, fill) { return G('translate(' + x + ' ' + y + ') scale(' + s + ')', P('M0-11L3-3L11 0L3 3L0 11L-3 3L-11 0L-3-3Z', fill || GOLD, { 'stroke-width': 2.6 / s })); }
  function bubble(x, y, s) {
    return G('translate(' + x + ' ' + y + ') scale(' + s + ')',
      P('M-14-10H14Q20-10 20-4V4Q20 10 14 10H-2L-10 17L-8 10H-14Q-20 10-20 4V-4Q-20-10-14-10Z', WHITE, { 'stroke-width': 3.4 / s }) +
      Ci(-8, 0, 2.4, INK, ns()) + Ci(0, 0, 2.4, INK, ns()) + Ci(8, 0, 2.4, INK, ns()));
  }

  function eye(type, x, y, c, dir) {
    var lid = P('M' + (x - 13) + ' ' + (y - 1) + 'q13-8 26 0', c, { 'stroke-width': 4 });
    switch (type) {
      case 'side': return E(x, y, 11, 9, WHITE) + Ci(x + 6 * dir, y + 2, 4.6, INK, ns()) + lid;
      case 'lazy': return E(x, y, 11, 9, WHITE) + Ci(x, y + 2, 4.6, INK, ns()) + lid;
      case 'wide': return Ci(x, y, 12, WHITE) + Ci(x, y, 3.2, INK, ns());
      case 'happy': return P('M' + (x - 9) + ' ' + (y + 3) + 'q9-11 18 0');
      case 'sleepy': return P('M' + (x - 9) + ' ' + (y - 1) + 'q9 8 18 0');
      case 'dead': return P('M' + (x - 9) + ' ' + y + 'h18');
      case 'spiral': return P('M' + x + ' ' + y + 'm-1 0a1.5 1.5 0 1 1 3 0a3.5 3.5 0 1 1-6 0a5.5 5.5 0 1 1 10 0a7.5 7.5 0 1 1-14 0a9.5 9.5 0 1 1 18 0', null, { 'stroke-width': 3 });
      case 'heart': return heart(x, y, 1.4, RED);
      case 'star': return spark(x, y, 1.2, GOLD);
      case 'cry': return Ci(x, y, 12, WHITE) + Ci(x, y - 4, 5.5, INK, ns()) + Ci(x + 2, y - 6, 2, WHITE, ns()) + P('M' + (x - 4) + ' ' + (y + 12) + 'q-3 18 3 36', null, { stroke: BLUE, 'stroke-width': 6 });
      default: return '';
    }
  }
  var EYES = ['side', 'lazy', 'wide', 'happy', 'sleepy', 'dead', 'spiral', 'heart', 'star', 'cry', 'shades'];
  var BROWS = {
    none: function () { return ''; },
    raise: function (l, r, y) { return P('M' + (l - 12) + ' ' + (y - 16) + 'l18 4M' + (r - 6) + ' ' + (y - 20) + 'l18-6', null, { 'stroke-width': 4 }); },
    angry: function (l, r, y) { return P('M' + (l - 12) + ' ' + (y - 22) + 'l20 8M' + (r + 12) + ' ' + (y - 22) + 'l-20 8', null, { 'stroke-width': 4 }); },
    worried: function (l, r, y) { return P('M' + (l - 12) + ' ' + (y - 12) + 'l18-8M' + (r + 12) + ' ' + (y - 12) + 'l-18-8', null, { 'stroke-width': 4 }); }
  };
  var MOUTH = {
    smirk: function (x, y) { return P('M' + (x - 9) + ' ' + y + 'q10 4 18-5', null, { 'stroke-width': 4 }); },
    smile: function (x, y) { return P('M' + (x - 10) + ' ' + (y - 2) + 'q10 11 20 0', null, { 'stroke-width': 4 }); },
    grin: function (x, y) { return P('M' + (x - 15) + ' ' + (y - 4) + 'Q' + x + ' ' + (y + 16) + ' ' + (x + 15) + ' ' + (y - 4) + 'Z', WHITE, { 'stroke-width': 4 }) + P('M' + (x - 12) + ' ' + (y + 1) + 'h24', null, { 'stroke-width': 2.5 }); },
    open: function (x, y) { return P('M' + (x - 11) + ' ' + (y - 3) + 'q11 18 22 0Z', RED, { 'stroke-width': 4 }); },
    flat: function (x, y) { return P('M' + (x - 8) + ' ' + y + 'h16', null, { 'stroke-width': 4 }); },
    o: function (x, y) { return E(x, y + 1, 5, 6, INK, ns()); },
    wobble: function (x, y) { return P('M' + (x - 16) + ' ' + y + 'q4-5 8 0q4 5 8 0q4-5 8 0q4 5 8 0', null, { 'stroke-width': 4 }); },
    tongue: function (x, y) { return P('M' + (x - 9) + ' ' + y + 'q10 4 18-5', null, { 'stroke-width': 4 }) + P('M' + (x + 2) + ' ' + (y + 1) + 'q4 11 9 0', RED, { 'stroke-width': 3 }); },
    scream: function (x, y) { return E(x, y + 6, 11, 15, RED, { 'stroke-width': 4 }) + E(x, y + 14, 6, 4, PINK, ns()); },
    w: function (x, y) { return P('M' + (x - 10) + ' ' + y + 'q5 6 10 0q5 6 10 0', null, { 'stroke-width': 4 }); }
  };
  function shoes(l, r, col, k) {
    return G('translate(' + (l - 86) + ' 0)', P('M70 184q16-6 22 2v8h-26q-6 0 4-10z', col) + P('M67 194h25', null, { stroke: k, 'stroke-width': 4 })) +
      G('translate(' + (r - 118) + ' 0)', P('M112 186q6-8 22-2q10 10 4 10h-26z', col) + P('M112 194h26', null, { stroke: k, 'stroke-width': 4 }));
  }

  // 道具（本地坐标约 ±25）
  var PROP = {
    tablet: function () { return G('rotate(14)', R(-20, -26, 40, 52, 6, WHITE) + P('M-10 10v-8M-2 10v-16M6 10v-12M14 10v-20', null, { stroke: '#ff4f8b', 'stroke-width': 4 })); },
    pointer: function () { return P('M0 0L22-30', null, { 'stroke-width': 4 }) + heart(24, -34, 1, RED); },
    coffee: function () { return P('M-12-10H12L9 18H-9Z', WHITE) + R(-14, -16, 28, 7, 3, '#c49a7a', { 'stroke-width': 3.5 }) + R(-12, 0, 24, 8, 2, '#c49a7a', ns()) + P('M-4-22q-4-6 0-10M5-22q-4-6 0-10', null, { 'stroke-width': 3 }); },
    fish: function () { return E(0, 0, 20, 11, BLUE, { 'stroke-width': 4 }) + P('M18 0L32-11V11Z', BLUE, { 'stroke-width': 4 }) + Ci(-10, -2, 2.6, INK, ns()) + P('M-2-6q4 6 0 12', null, { 'stroke-width': 2.5 }); },
    laptop: function () { return R(-22, -26, 44, 30, 4, '#d9d4ff') + Ci(0, -11, 4, WHITE, ns()) + P('M-28 4H28L24 12H-24Z', '#b9b2f0', { 'stroke-width': 4 }); },
    folders: function () { return R(-26, 4, 52, 10, 3, '#ff9fb4') + R(-22, -6, 44, 10, 3, BLUE) + R(-26, -16, 52, 10, 3, GOLD) + R(-20, -26, 40, 10, 3, '#9be08a'); },
    clock: function () { return Ci(-12, -15, 7, GOLD) + Ci(12, -15, 7, GOLD) + Ci(0, 0, 18, WHITE) + P('M0 0V-11M0 0H8', null, { 'stroke-width': 3.5 }); },
    coin: function () { return Ci(0, 0, 17, GOLD) + Ci(0, 0, 11, 'none', { 'stroke-width': 2.5 }) + P('M-5-6L0 0L5-6M0 0V8M-5 2H5', null, { 'stroke-width': 3 }); },
    phone: function () { return R(-13, -22, 26, 44, 6, INK) + R(-9, -16, 18, 30, 3, '#ffd6e6', ns()) + heart(0, -1, 0.75, RED); },
    abacus: function () { var s = R(-26, -18, 52, 36, 4, '#e8c49a'); for (var i = 0; i < 3; i++) { var y = -8 + i * 8; s += P('M-22 ' + y + 'H22', null, { 'stroke-width': 2 }); for (var j = 0; j < 4; j++) s += Ci(-14 + j * 7 + (i % 2) * 6, y, 3, ['#ff9fb4', BLUE, GOLD][i], { 'stroke-width': 1.5 }); } return s; },
    paint: function () { return P('M-22 4C-22-18 22-22 24 0C26 10 12 8 8 14C4 22-22 22-22 4Z', '#fff6e8', { 'stroke-width': 4 }) + Ci(-10, -6, 4, '#ff9fb4', ns()) + Ci(2, -10, 4, BLUE, ns()) + Ci(12, -4, 4, GOLD, ns()) + Ci(-12, 8, 4, '#9be08a', ns()); },
    pot: function () { return P('M-16 0H16L12 22H-12Z', '#e8a07a', { 'stroke-width': 4 }) + P('M0 0V-22', null, { stroke: '#3a9d5d', 'stroke-width': 4 }) + Ci(-9, -22, 7, GOLD, { 'stroke-width': 3 }) + Ci(9, -28, 7, GOLD, { 'stroke-width': 3 }) + Ci(0, -38, 7, GOLD, { 'stroke-width': 3 }); },
    network: function () { return P('M-18 10L0-14L20 8Z', null, { 'stroke-width': 3 }) + Ci(-18, 10, 9, '#ffb3c7') + Ci(0, -14, 9, LILAC) + Ci(20, 8, 9, BLUE); },
    heartsign: function () { return P('M0 30V-4', null, { stroke: '#c4935a', 'stroke-width': 6 }) + heart(0, -16, 3, RED); },
    gift: function () { return R(-18, -10, 36, 28, 4, LILAC) + R(-21, -18, 42, 10, 3, LILAC) + P('M0-18V18', null, { stroke: RED, 'stroke-width': 5 }) + P('M0-18Q-14-32-12-20M0-18Q14-32 12-20', null, { 'stroke-width': 3.5 }); },
    mug: function () { return P('M-14-12H14V12Q14 18 8 18H-8Q-14 18-14 12Z', '#ff9fb4', { 'stroke-width': 4 }) + P('M14-6Q24-6 24 2Q24 10 14 10', null, { 'stroke-width': 4 }) + E(0, -12, 12, 4, '#a0705a', ns()) + R(-6, -18, 8, 7, 2, WHITE, { 'stroke-width': 2.5 }) + P('M-4-24q-4-6 0-10M6-24q-4-6 0-10', null, { 'stroke-width': 3 }); },
    book: function () { return P('M0-12Q-14-20-28-14V14Q-14 8 0 16Q14 8 28 14V-14Q14-20 0-12Z', WHITE, { 'stroke-width': 4 }) + P('M0-12V16', null, { 'stroke-width': 3 }); },
    pillow: function () { return heart(0, 0, 3.4, '#ffb3c7'); },
    tea: function () { return P('M-16-6H16Q16 14 0 14Q-16 14-16-6Z', '#c9f0d8', { 'stroke-width': 4 }) + E(0, 16, 12, 3, '#c9f0d8', { 'stroke-width': 3 }) + P('M-4-12q-4-6 0-10M6-12q-4-6 0-10', null, { 'stroke-width': 3 }); },
    battery: function (o) { return R(-24, -12, 44, 24, 5, WHITE) + R(20, -5, 6, 10, 2, INK, ns()) + (o && o.full ? R(-20, -8, 36, 16, 2, '#6fd38f', ns()) : R(-20, -8, 5, 16, 2, RED, ns())); },
    storm: function () { return P('M-24 6Q-30-8-16-10Q-14-24 2-20Q12-30 22-16Q34-14 28 6Z', '#bfc3d9', { 'stroke-width': 4 }) + P('M-2 8L-8 20H0L-6 32', null, { stroke: GOLD, 'stroke-width': 4 }) + P('M-18 12V18M14 12V20', null, { stroke: BLUE, 'stroke-width': 3.5 }); },
    flower: function () { var s = P('M0 30V0', null, { stroke: '#3a9d5d', 'stroke-width': 4 }); for (var i = 0; i < 5; i++) { var t = i * 72 * Math.PI / 180; s += Ci(Math.round(9 * Math.cos(t)), Math.round(-4 + 9 * Math.sin(t)), 7, '#ffb3c7', { 'stroke-width': 3 }); } return s + Ci(0, -4, 5, GOLD, { 'stroke-width': 3 }); },
    hoe: function () { return P('M-2 30L18-24', null, { stroke: '#c4935a', 'stroke-width': 5 }) + P('M10-26L28-20L22-12Z', '#d0d6e0', { 'stroke-width': 3.5 }) + Ci(-16, 18, 5, '#ffb3c7', { 'stroke-width': 2.5 }) + Ci(-8, 26, 5, '#ffb3c7', { 'stroke-width': 2.5 }); },
    roundfan: function () { return P('M0 6V32', null, { stroke: '#c4935a', 'stroke-width': 5 }) + Ci(0, -10, 20, '#fff2e0') + G('translate(0 -10)', P('M-8 4Q0-12 8 4', null, { stroke: '#ff9fb4', 'stroke-width': 3 }) + Ci(6, -6, 3, '#ff9fb4', ns())); },
    skewer: function () { return P('M-4 30L10-30', null, { stroke: '#c4935a', 'stroke-width': 4 }) + E(6, -14, 9, 7, '#c9705a') + E(3, 0, 9, 7, '#b25f4a') + E(0, 14, 9, 7, '#c9705a'); },
    scroll: function () { return R(-22, -14, 44, 28, 2, '#fff6e0') + R(-26, -18, 6, 36, 3, '#c4935a') + R(20, -18, 6, 36, 3, '#c4935a') + P('M-14-4H12M-14 4H8', null, { 'stroke-width': 2.5, opacity: .5 }); },
    tornfan: function () { return P('M0 20L-26-12Q0-30 26-12Z', '#ffe0ea', { 'stroke-width': 4 }) + P('M0 20L-13-21M0 20L0-24M0 20L13-21', null, { 'stroke-width': 2.5 }) + P('M6-24L2-14L8-10L4 0', null, { stroke: RED, 'stroke-width': 3.5 }); },
    teacup: function () { return P('M-14-4H14Q12 12 0 12Q-12 12-14-4Z', WHITE, { 'stroke-width': 4 }) + E(0, 14, 12, 3, WHITE, { 'stroke-width': 3 }) + P('M-3-10q-4-6 0-10', null, { 'stroke-width': 3 }); }
  };

  var DECO = {
    sparkles: function () { return spark(28, 44, 1) + spark(176, 54, 0.8, LILAC) + spark(180, 160, 0.9, '#ff9fb4'); },
    hearts: function () { return heart(26, 56, 1.2, '#ff8fab') + heart(174, 40, 1, RED) + heart(182, 120, 0.9, '#ff8fab') + heart(20, 132, 0.8, RED); },
    zzz: function () { return '<g fill="#7b5cff" font-family="Arial Black,Arial" font-weight="900"><text x="148" y="50" font-size="24">Z</text><text x="166" y="32" font-size="17">Z</text><text x="180" y="18" font-size="12">Z</text></g>'; },
    sweat: function () { return P('M156 50q-8 12 0 16q8-4 0-16Z', BLUE, { 'stroke-width': 3 }) + P('M168 68q-6 9 0 12q6-3 0-12Z', BLUE, { 'stroke-width': 3 }); },
    anger: function () { return G('translate(158 44)', P('M-12-4Q-4-4-4-12M4-12Q4-4 12-4M12 4Q4 4 4 12M-4 12Q-4 4-12 4', null, { stroke: RED, 'stroke-width': 4.5 })); },
    lightning: function () { return P('M34 30L22 56H36L26 82Z', GOLD, { 'stroke-width': 3.5 }) + P('M176 92L168 110H178L172 126Z', GOLD, { 'stroke-width': 3 }); },
    notes: function () { return P('M28 54V34L42 30V50', null, { 'stroke-width': 3.5 }) + Ci(24, 54, 5, LILAC, { 'stroke-width': 3 }) + Ci(38, 50, 5, LILAC, { 'stroke-width': 3 }) + P('M174 64V46', null, { 'stroke-width': 3.5 }) + Ci(170, 64, 5, '#ff9fb4', { 'stroke-width': 3 }); },
    petals: function () { return G('rotate(-30 30 50)', E(30, 50, 8, 4.5, '#ffc4d4', { 'stroke-width': 2.5 })) + G('rotate(20 174 70)', E(174, 70, 8, 4.5, '#ffc4d4', { 'stroke-width': 2.5 })) + G('rotate(50 22 150)', E(22, 150, 7, 4, '#ffc4d4', { 'stroke-width': 2.5 })) + G('rotate(-10 180 160)', E(180, 160, 7, 4, '#ffc4d4', { 'stroke-width': 2.5 })); },
    coins: function () { return Ci(26, 52, 9, GOLD, { 'stroke-width': 3.5 }) + Ci(176, 66, 7, GOLD, { 'stroke-width': 3.5 }) + Ci(182, 160, 8, GOLD, { 'stroke-width': 3.5 }); },
    thoughts: function () { return bubble(32, 38, 0.75) + bubble(168, 30, 0.8) + bubble(180, 96, 0.6) + bubble(20, 104, 0.55); },
    speed: function () { return P('M6 120H28M2 136H22M10 152H28', null, { stroke: LILAC, 'stroke-width': 4.5 }); },
    sun: function () { var s = ''; for (var i = 0; i < 8; i++) { var t = i * 45 * Math.PI / 180; s += P('M' + Math.round(32 + 15 * Math.cos(t)) + ' ' + Math.round(40 + 15 * Math.sin(t)) + 'L' + Math.round(32 + 22 * Math.cos(t)) + ' ' + Math.round(40 + 22 * Math.sin(t)), null, { stroke: GOLD, 'stroke-width': 3.5 }); } return s + Ci(32, 40, 9, GOLD, { 'stroke-width': 3.5 }); }
  };

  function need(table, key, kind) { if (!Object.prototype.hasOwnProperty.call(table, key)) throw new Error('unknown ' + kind + ': ' + key); }
  function o2(w, c) { if (w === 0) return ns(); var o = {}; if (w != null) o['stroke-width'] = w; if (c) o.stroke = c; return o; }

  // 工具包：形象绘图函数拿到的就是它。所有坐标在 200×220 画布里，鞋底约在 y=194
  var K = {
    INK: INK, PINK: PINK, RED: RED, GOLD: GOLD, WHITE: WHITE, BLUE: BLUE, LILAC: LILAC,
    P: function (d, f, w, c) { return P(d, f, o2(w, c)); },
    E: function (x, y, rx, ry, f, w, c) { return E(x, y, rx, ry, f, o2(w, c)); },
    C: function (x, y, r, f, w, c) { return Ci(x, y, r, f, o2(w, c)); },
    R: function (x, y, w, h, rx, f, sw, c) { return R(x, y, w, h, rx, f, o2(sw, c)); },
    G: G,
    op: function (v, s) { return '<g opacity="' + v + '">' + s + '</g>'; },
    T: function (x, y, size, txt, f, rot) {
      return '<text x="' + x + '" y="' + y + '" font-size="' + size + '" font-family="Arial Black,Arial,sans-serif" font-weight="900" text-anchor="middle" fill="' + (f || INK) + '"' +
        (rot ? ' transform="rotate(' + rot + ' ' + x + ' ' + y + ')"' : '') + '>' + txt + '</text>';
    },
    heart: heart, spark: spark, bubble: bubble,
    // 两只眼睛 + 腮红 + 眉毛 + 嘴。c 是眼睛周围的身体色（眼皮用）。o: {m: 嘴, my: 嘴的下移, b: 眉毛, nb: 不要腮红, d: 眼珠朝向}
    face: function (l, r, y, eyes, c, o) {
      o = o || {};
      if (EYES.indexOf(eyes) < 0) throw new Error('unknown eyes: ' + eyes);
      var s;
      if (eyes === 'shades') {
        s = R(l - 15, y - 10, 30, 19, 8, INK, ns()) + R(r - 15, y - 10, 30, 19, 8, INK, ns()) + P('M' + (l + 15) + ' ' + (y - 4) + 'H' + (r - 15), null, { 'stroke-width': 4 }) +
          P('M' + (l - 8) + ' ' + (y - 4) + 'l6-3M' + (r - 8) + ' ' + (y - 4) + 'l6-3', null, { stroke: WHITE, 'stroke-width': 3 });
      } else s = eye(eyes, l, y, c, o.d || 1) + eye(eyes, r, y, c, o.d || 1);
      if (!o.nb) s += E(l - 6, y + 16, 8, 4.5, PINK, ns({ opacity: .75 })) + E(r + 6, y + 16, 8, 4.5, PINK, ns({ opacity: .75 }));
      var b = o.b || 'none', m = o.m || 'smirk';
      need(BROWS, b, 'brows'); need(MOUTH, m, 'mouth');
      return s + BROWS[b](l, r, y) + MOUTH[m]((l + r) / 2 + 1, y + 22 + (o.my || 0));
    },
    mouth: function (m, x, y) { need(MOUTH, m, 'mouth'); return MOUTH[m](x, y); },
    // 两条长腿 + 球鞋。a/b 是两条腿在身体上的起点 x，y 是起点高度
    legs: function (a, b, y, k, t, shoe) {
      var l, r, d;
      if (t === 'walk') { l = a - 16; r = b + 12; d = 'M' + a + ' ' + y + 'L' + l + ' 184M' + b + ' ' + y + 'L' + r + ' 186'; }
      else if (t === 'cross') { l = a - 2; r = b + 2; d = 'M' + a + ' ' + y + 'L' + r + ' 186M' + b + ' ' + y + 'L' + l + ' 186'; }
      else { l = a - 4; r = b + 6; d = 'M' + a + ' ' + y + 'L' + l + ' 186M' + b + ' ' + y + 'L' + r + ' 186'; }
      return P(d) + shoes(l, r, shoe || WHITE, k);
    },
    arm: function (d) { return P(d); },
    hand: function (x, y) { return Ci(x, y, 5, INK, ns()); },
    prop: function (name, x, y, r, s, opt) { need(PROP, name, 'prop'); return G('translate(' + x + ' ' + y + ') rotate(' + (r || 0) + ') scale(' + (s || 1) + ')', PROP[name](opt)); },
    deco: function () { var s = ''; for (var i = 0; i < arguments.length; i++) { need(DECO, arguments[i], 'deco'); s += DECO[arguments[i]](); } return s; },
    // 把 inner 裁在路径 d 里面（衣领、花纹用）
    clip: function (d, inner) { var id = 'chb' + (++uid); return '<defs><clipPath id="' + id + '"><path d="' + d + '"/></clipPath></defs><g clip-path="url(#' + id + ')">' + inner + '</g>'; }
  };

  // art: [动画名, 绘图函数]
  function svg(art) {
    var anim = art[0], body = art[1](K);
    var cls = 'ch' + (anim ? ' ch-' + anim : '');
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 220" role="img"><g class="' + cls + '">' + E(100, 200, 46, 6, 'rgba(43,34,51,.12)', ns()) + body + '</g></svg>';
  }

  var api = {
    svg: svg, kit: K,
    parts: { eyes: EYES.slice(), brows: Object.keys(BROWS), mouth: Object.keys(MOUTH), prop: Object.keys(PROP), deco: Object.keys(DECO) }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Chars = api;
})(this);
