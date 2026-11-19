/* 结果形象：潮酷长腿怪。用零件拼出原创小怪物，输出 SVG 字符串。viewBox 0 0 200 220 */
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

  // 身体：路径 + 脸的高度 + 肩宽一半
  var SHAPE = {
    bean: { d: 'M72 36C112 26 142 48 142 90C142 130 122 142 100 142C70 142 56 122 56 90C56 60 58 40 72 36Z', fy: 80, half: 42 },
    egg: { d: 'M100 34C130 34 146 70 146 100C146 128 126 142 100 142C74 142 54 128 54 100C54 70 70 34 100 34Z', fy: 84, half: 45 },
    pill: { d: 'M100 30C128 30 136 50 136 70V112C136 132 122 142 100 142C78 142 64 132 64 112V70C64 50 72 30 100 30Z', fy: 76, half: 36 },
    tofu: { d: 'M62 46Q62 36 72 36H128Q138 36 138 46V132Q138 142 128 142H72Q62 142 62 132Z', fy: 80, half: 38 },
    blob: { d: 'M70 40Q86 28 102 38Q120 26 134 44Q150 58 142 78Q152 96 142 114Q146 136 122 140Q100 148 80 140Q56 138 58 114Q48 96 58 78Q52 54 70 40Z', fy: 82, half: 42 },
    drop: { d: 'M100 24C112 50 146 74 146 104C146 128 126 142 100 142C74 142 54 128 54 104C54 74 88 50 100 24Z', fy: 92, half: 45 },
    onigiri: { d: 'M100 34C110 34 150 108 148 124C146 140 130 142 100 142C70 142 54 140 52 124C50 108 90 34 100 34Z', fy: 96, half: 38 },
    cloud: { d: 'M66 74Q60 50 82 46Q90 30 110 36Q130 30 136 50Q156 54 148 76Q160 96 146 112Q150 136 124 138Q104 148 84 140Q58 142 56 118Q42 98 58 84Q54 78 66 74Z', fy: 84, half: 44 },
    ghost: { d: 'M100 34C130 34 146 60 146 92V138Q138 146 130 138Q122 130 114 138Q106 146 100 138Q94 130 86 138Q78 146 70 138Q62 130 54 138V92C54 60 70 34 100 34Z', fy: 82, half: 46, noLegs: true }
  };

  // 头顶特征（画在身体后面，slot / headphones 画在前面）
  var TOP = {
    none: {},
    horns: { back: function () { return P('M78 48Q70 24 80 16Q84 34 92 42Z', '#fff3d6') + P('M122 48Q130 24 120 16Q116 34 108 42Z', '#fff3d6'); } },
    antenna: { back: function () { return P('M88 42L78 14M112 42L122 14') + Ci(78, 12, 7, GOLD) + Ci(122, 12, 7, PINK); } },
    catears: { back: function (c) { return P('M62 64L62 20L94 42Z', c) + P('M138 64L138 20L106 42Z', c) + P('M68 50L68 32L82 42Z', PINK, ns()) + P('M132 50L132 32L118 42Z', PINK, ns()); } },
    bearears: { back: function (c) { return Ci(66, 44, 15, c, { 'stroke-width': 5 }) + Ci(134, 44, 15, c, { 'stroke-width': 5 }) + Ci(66, 44, 7, PINK, ns()) + Ci(134, 44, 7, PINK, ns()); } },
    bunnyears: { back: function (c) { return G('rotate(-12 84 30)', E(84, 22, 11, 28, c, { 'stroke-width': 5 }) + E(84, 24, 5, 18, PINK, ns())) + G('rotate(12 116 30)', E(116, 22, 11, 28, c, { 'stroke-width': 5 }) + E(116, 24, 5, 18, PINK, ns())); } },
    sprout: { back: function () { return P('M100 40V12', null, { stroke: '#3a9d5d' }) + G('rotate(-28 88 12)', E(88, 12, 13, 7, '#8fe08a', { stroke: '#3a9d5d', 'stroke-width': 4 })) + G('rotate(28 112 8)', E(112, 8, 13, 7, '#8fe08a', { stroke: '#3a9d5d', 'stroke-width': 4 })); } },
    spikes: { back: function () { return P('M64 56L66 24L82 40L90 12L104 36L116 14L122 40L138 26L138 58Z', INK); } },
    crest: { back: function () { return P('M84 46Q70 14 92 18Q92 32 98 42Q96 8 116 12Q108 30 106 42Q118 16 136 28Q122 36 116 48Z', GOLD); } },
    slot: { front: function () { return R(86, 40, 28, 7, 3.5, INK, ns()); } },
    headphones: { front: function (c, k, sh) { return P('M' + (100 - sh.half - 4) + ' 84Q' + (100 - sh.half - 4) + ' 20 100 20Q' + (100 + sh.half + 4) + ' 20 ' + (100 + sh.half + 4) + ' 84', null, { stroke: k, 'stroke-width': 8 }) + R(100 - sh.half - 14, 70, 18, 28, 8, k) + R(100 + sh.half - 4, 70, 18, 28, 8, k); } }
  };

  var PATTERN = {
    none: function () { return ''; },
    spots: function () { return E(74, 122, 15, 11, INK, ns({ opacity: .85 })) + E(128, 62, 11, 9, INK, ns({ opacity: .85 })) + E(136, 126, 8, 7, INK, ns({ opacity: .85 })); },
    stripes: function () { return P('M40 70L160 40M40 100L160 70M40 130L160 100M40 160L160 130', null, { stroke: WHITE, 'stroke-width': 9, opacity: .45 }); },
    belly: function () { return E(100, 132, 34, 26, WHITE, ns({ opacity: .8 })); }
  };

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

  // 胳膊：返回 { d: 线, hands: [[x,y]...], at: 道具锚点 }
  var ARMS = {
    down: function (L, R) { return { d: 'M' + L + ' 104l-12 30M' + R + ' 104l12 30', hands: [[L - 12, 134], [R + 12, 134]], at: [R + 14, 138] }; },
    hip: function (L, R) { return { d: 'M' + L + ' 104q-20 6-18 16q6 6 18 2M' + R + ' 104q20 6 18 16q-6 6-18 2', hands: [], at: [R + 14, 138] }; },
    up: function (L, R) { return { d: 'M' + L + ' 104q-20 6-18 16q6 6 18 2M' + R + ' 102l20-26', hands: [[R + 20, 76]], at: [R + 22, 70] }; },
    shrug: function (L, R) { return { d: 'M' + L + ' 102l-18-24M' + R + ' 102l18-24', hands: [[L - 18, 78], [R + 18, 78]], at: [R + 20, 70] }; },
    hold: function (L, R) { return { d: 'M' + L + ' 106q-6 24 22 30M' + R + ' 106q6 24-22 30', hands: [[L + 22, 136], [R - 22, 136]], at: [100, 132] }; },
    cross: function (L, R) { return { d: 'M' + L + ' 104Q96 132 ' + (R - 8) + ' 112M' + R + ' 104Q104 132 ' + (L + 8) + ' 112', hands: [], at: [R + 14, 138] }; }
  };
  var LEGS = {
    stand: function () { return { d: 'M90 140L86 186M112 140L118 186', l: 86, r: 118 }; },
    walk: function () { return { d: 'M90 140L74 184M112 140L124 186', l: 74, r: 124 }; },
    cross: function () { return { d: 'M92 140L112 186M110 140L88 186', l: 88, r: 112 }; }
  };
  function shoes(l, r, col, k) {
    return G('translate(' + (l - 86) + ' 0)', P('M70 184q16-6 22 2v8h-26q-6 0 4-10z', col) + P('M67 194h25', null, { stroke: k, 'stroke-width': 4 })) +
      G('translate(' + (r - 118) + ' 0)', P('M112 186q6-8 22-2q10 10 4 10h-26z', col) + P('M112 194h26', null, { stroke: k, 'stroke-width': 4 }));
  }

  // 配饰。clip=true 的会被裁在身体轮廓里
  var ACC = {
    tie: { front: function (k) { return P('M95 110h10l-3 6h-4z', k, { 'stroke-width': 4 }) + P('M97 116l-4 20 7 7 7-7-4-20z', k, { 'stroke-width': 4 }); } },
    bowtie: { front: function (k) { return P('M100 114l-15-8v16z', k, { 'stroke-width': 4 }) + P('M100 114l15-8v16z', k, { 'stroke-width': 4 }) + Ci(100, 114, 4.5, k); } },
    lanyard: { front: function (k) { return P('M78 104L100 122L122 104', null, { stroke: k, 'stroke-width': 4 }) + R(91, 120, 18, 20, 4, WHITE) + Ci(100, 128, 3, k, ns()); } },
    scarf: { front: function (k) { return P('M58 104Q100 122 142 104L142 116Q100 134 58 116Z', k) + P('M118 120l8 22 12-4-6-20Z', k); } },
    hanfu: { clip: true, front: function (k, o, sh) { var y = Math.max(sh.fy + 32, 112); return P('M40 ' + (y + 14) + 'Q100 ' + (y + 24) + ' 160 ' + (y + 14), null, { stroke: o.accent2 || GOLD, 'stroke-width': 10 }) + P('M80 ' + y + 'L100 ' + (y + 18) + 'L120 ' + y, null, { stroke: k, 'stroke-width': 8 }); } },
    apron: { clip: true, front: function (k) { return P('M74 108H126L122 150H78Z', WHITE, { 'stroke-width': 4 }) + R(88, 118, 24, 12, 3, k, { 'stroke-width': 3 }); } },
    blanket: { clip: true, front: function (k) { return P('M30 98Q100 80 170 98V160H30Z', k, { 'stroke-width': 4 }) + Ci(72, 118, 4, WHITE, ns()) + Ci(100, 128, 4, WHITE, ns()) + Ci(128, 114, 4, WHITE, ns()) + Ci(86, 136, 4, WHITE, ns()) + Ci(118, 136, 4, WHITE, ns()); } },
    jade: { front: function (k, o, sh) { var y = sh.fy + 30; return P('M86 ' + y + 'Q100 ' + (y + 10) + ' 114 ' + y, null, { 'stroke-width': 3 }) + E(100, y + 18, 7, 9, '#8fe0c0', { 'stroke-width': 4 }); } },
    locket: { front: function (k, o, sh) { var y = sh.fy + 42; return P('M86 ' + (y - 12) + 'Q100 ' + (y - 2) + ' 114 ' + (y - 12), null, { 'stroke-width': 3, stroke: GOLD }) + P('M91 ' + y + 'H109V' + (y + 12) + 'Q100 ' + (y + 17) + ' 91 ' + (y + 12) + 'Z', GOLD, { 'stroke-width': 4 }) + P('M95 ' + y + 'Q95 ' + (y - 7) + ' 100 ' + (y - 7) + 'Q105 ' + (y - 7) + ' 105 ' + y, null, { 'stroke-width': 3 }); } },
    crown: { front: function (k, o, sh) { return G('rotate(-14 100 ' + (sh.fy - 46) + ')', P('M82 ' + (sh.fy - 34) + 'L84 ' + (sh.fy - 58) + 'L94 ' + (sh.fy - 46) + 'L100 ' + (sh.fy - 62) + 'L106 ' + (sh.fy - 46) + 'L116 ' + (sh.fy - 58) + 'L118 ' + (sh.fy - 34) + 'Z', GOLD, { 'stroke-width': 4 })); } },
    headband: { front: function (k, o, sh) { var y = sh.fy - 24; return P('M' + (100 - sh.half - 6) + ' ' + (y + 6) + 'Q100 ' + (y - 10) + ' ' + (100 + sh.half + 6) + ' ' + (y + 6), null, { stroke: k, 'stroke-width': 10 }) + P('M' + (100 + sh.half + 2) + ' ' + (y + 2) + 'l20-8 2 14Z', k, { 'stroke-width': 4 }); } },
    beret: { front: function (k, o, sh) { var y = sh.fy - 46; return G('rotate(-12 106 ' + y + ')', E(106, y, 34, 11, k, { 'stroke-width': 4 }) + Ci(106, y - 12, 4, k, { 'stroke-width': 3 })); } },
    cap: { front: function (k, o, sh) { var y = sh.fy - 34; return P('M68 ' + (y + 4) + 'Q100 ' + (y - 34) + ' 132 ' + (y + 4) + 'Z', k, { 'stroke-width': 4 }) + P('M126 ' + y + 'l24-6 2 10Z', k, { 'stroke-width': 4 }); } },
    glasses: { front: function (k, o, sh) { var y = sh.fy; return Ci(86, y, 15, 'none', { 'stroke-width': 4 }) + Ci(116, y, 15, 'none', { 'stroke-width': 4 }) + P('M101 ' + y + 'h0', null, { 'stroke-width': 4 }); } },
    hairpin: { front: function (k, o, sh) { var y = sh.fy - 40; return P('M124 ' + (y + 14) + 'L150 ' + (y - 10), null, { stroke: GOLD, 'stroke-width': 5 }) + Ci(152, y - 12, 6, RED, { 'stroke-width': 3 }) + P('M142 ' + (y - 2) + 'v14M148 ' + (y - 6) + 'v12', null, { stroke: GOLD, 'stroke-width': 2.5 }) + Ci(142, y + 14, 3, RED, ns()) + Ci(148, y + 8, 3, RED, ns()); } },
    bow: { front: function (k, o, sh) { var y = sh.fy - 42; return P('M132 ' + y + 'l-16-10v20z', k, { 'stroke-width': 4 }) + P('M132 ' + y + 'l16-10v20z', k, { 'stroke-width': 4 }) + Ci(132, y, 4.5, k); } },
    cape: { back: function (k) { return P('M66 96L44 168Q100 178 156 168L134 96Z', k); } },
    ringlight: { back: function () { return Ci(100, 96, 84, 'none', { stroke: WHITE, 'stroke-width': 10 }); } }
  };

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

  function svg(o) {
    var shapeName = o.shape || 'bean';
    need(SHAPE, shapeName, 'shape');
    var sh = SHAPE[shapeName], c = o.color, k = o.accent || '#ff4f8b';
    var topName = o.top || 'none', eyes = o.eyes || 'lazy', brows = o.brows || 'none', mouth = o.mouth || 'smirk';
    var armName = o.arms || 'down', legName = o.legs || 'stand', pattern = o.pattern || 'none';
    need(TOP, topName, 'top'); need(BROWS, brows, 'brows'); need(MOUTH, mouth, 'mouth'); need(ARMS, armName, 'arms'); need(LEGS, legName, 'legs'); need(PATTERN, pattern, 'pattern');
    if (EYES.indexOf(eyes) < 0) throw new Error('unknown eyes: ' + eyes);
    var acc = o.acc || [], props = o.props || [], deco = o.deco || [];
    acc.forEach(function (n) { need(ACC, n, 'acc'); });
    props.forEach(function (p) { need(PROP, p.name, 'prop'); });
    deco.forEach(function (n) { need(DECO, n, 'deco'); });

    var top = TOP[topName], L = 100 - sh.half + 2, Rr = 100 + sh.half - 2;
    var arm = ARMS[armName](L, Rr), fy = sh.fy, lx = 86, rx = 116;
    var clipId = 'chb' + (++uid);
    function placed(p) {
      var at = p.at ? ARMS[p.at](L, Rr).at : arm.at;
      var x = p.x == null ? at[0] : p.x, y = p.y == null ? at[1] : p.y;
      return G('translate(' + x + ' ' + y + ') rotate(' + (p.r || 0) + ') scale(' + (p.s || 1) + ')', PROP[p.name](p));
    }

    var s = '<defs><clipPath id="' + clipId + '"><path d="' + sh.d + '"/></clipPath></defs>';
    s += deco.map(function (n) { return DECO[n](); }).join('');
    s += E(100, 200, 46, 6, 'rgba(43,34,51,.12)', ns());
    s += acc.map(function (n) { return ACC[n].back ? ACC[n].back(k, o, sh) : ''; }).join('');
    s += props.filter(function (p) { return p.behind; }).map(placed).join('');
    if (!sh.noLegs) { var lg = LEGS[legName](); s += P(lg.d) + shoes(lg.l, lg.r, o.shoes || WHITE, k); }
    s += top.back ? top.back(c, k, sh) : '';
    s += P(sh.d, c);
    var clipped = PATTERN[pattern]() + acc.filter(function (n) { return ACC[n].clip; }).map(function (n) { return ACC[n].front(k, o, sh); }).join('');
    if (clipped) s += '<g clip-path="url(#' + clipId + ')">' + clipped + '</g>' + P(sh.d, null);
    s += top.front ? top.front(c, k, sh) : '';
    // 脸
    if (eyes === 'shades') {
      s += R(lx - 15, fy - 10, 30, 19, 8, INK, ns()) + R(rx - 15, fy - 10, 30, 19, 8, INK, ns()) + P('M' + (lx + 15) + ' ' + (fy - 4) + 'H' + (rx - 15), null, { 'stroke-width': 4 }) +
        P('M' + (lx - 8) + ' ' + (fy - 4) + 'l6-3M' + (rx - 8) + ' ' + (fy - 4) + 'l6-3', null, { stroke: WHITE, 'stroke-width': 3 });
    } else {
      s += eye(eyes, lx, fy, c, 1) + eye(eyes, rx, fy, c, 1);
    }
    if (o.blush !== false) s += E(lx - 6, fy + 16, 8, 4.5, PINK, ns({ opacity: .75 })) + E(rx + 6, fy + 16, 8, 4.5, PINK, ns({ opacity: .75 }));
    s += BROWS[brows](lx, rx, fy) + MOUTH[mouth](101, fy + 22);
    s += acc.filter(function (n) { return ACC[n].front && !ACC[n].clip; }).map(function (n) { return ACC[n].front(k, o, sh); }).join('');
    s += P(arm.d);
    s += props.filter(function (p) { return !p.behind; }).map(placed).join('');
    s += arm.hands.map(function (h) { return Ci(h[0], h[1], 5, INK, ns()); }).join('');

    var cls = 'ch' + (o.anim ? ' ch-' + o.anim : '');
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 220" role="img"><g class="' + cls + '">' + s + '</g></svg>';
  }

  var api = {
    svg: svg,
    parts: {
      shape: Object.keys(SHAPE), top: Object.keys(TOP), eyes: EYES.slice(), brows: Object.keys(BROWS), mouth: Object.keys(MOUTH),
      arms: Object.keys(ARMS), legs: Object.keys(LEGS), pattern: Object.keys(PATTERN), acc: Object.keys(ACC), prop: Object.keys(PROP), deco: Object.keys(DECO)
    }
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.Chars = api;
})(this);
