/* 精神状态：12 个物件成精。每项 [动画, 绘图函数] */
(function (K) {
  var P = K.P, E = K.E, C = K.C, R = K.R, G = K.G, T = K.T, F = K.face, L = K.legs, A = K.arm, H = K.hand;
  var INK = K.INK, W = K.WHITE, GOLD = K.GOLD, RED = K.RED, PINK = K.PINK, k = '#7b5cff';
  // 几块形状拼成一个轮廓：先画粗描边，再盖上不描边的填充，接缝就消失了
  function merge(ds, c) { return ds.map(function (d) { return P(d, c, 10); }).join('') + ds.map(function (d) { return P(d, c, 0); }).join(''); }
  var ART = {
    // 尖叫鸡（发疯文学大师）
    fafeng: ['shake', function () {
      var c = '#ffd84d';
      return T(40, 64, 15, '啊啊啊', RED, -14) + K.deco('lightning') + L(86, 108, 146, k, 'walk') +
        P('M86 34L92 18L100 30L108 12L116 28L126 18L124 40Z', RED, 4) +
        merge(['M54 126A42 26 0 1 0 138 126A42 26 0 1 0 54 126Z', 'M84 122L92 64H120L118 122Z', 'M80 54A26 26 0 1 0 132 54A26 26 0 1 0 80 54Z'], c) +
        P('M66 118q12 10 24 4', null, 3.5, '#f0b82e') +
        F(96, 118, 48, 'spiral', c, { m: 'o', my: -12, nb: true }) +
        P('M130 50L162 40L158 58L130 64Z', '#ff9a2e', 4) + P('M132 57L158 50', null, 3) +
        A('M58 116l-20-24M136 116l22-22') + H(38, 92) + H(158, 94);
    }],
    // 荷包蛋（佛系躺平）
    foxi: ['sway', function () {
      return K.deco('zzz') + L(88, 112, 136, k, 'cross') +
        P('M50 70Q46 36 86 36Q110 20 134 40Q166 44 160 80Q172 112 144 128Q120 150 90 140Q50 146 46 116Q30 94 50 70Z', W) +
        C(102, 86, 32, '#ffb52e') + P('M82 70q6-10 16-12', null, 4, '#ffd98a') +
        F(90, 114, 82, 'sleepy', '#ffb52e', { m: 'smile', my: -2 }) +
        A('M156 98l14 14') + K.prop('tea', 176, 118, 0, .7) + H(170, 112);
    }],
    // 爆米花桶 + 弹幕（脑内弹幕选手）
    danmu: ['wobble', function () {
      var b = 'M56 64H144L132 152H68Z';
      function dm(x, y, w, t, c) { return R(x, y, w, 16, 8, c, 3) + T(x + w / 2, y + 12, 9, t, INK); }
      return L(88, 112, 150, k, 'walk') +
        C(68, 58, 13, '#fff3c4', 4) + C(88, 48, 14, '#fff3c4', 4) + C(110, 46, 14, W, 4) + C(130, 56, 13, '#fff3c4', 4) + C(100, 60, 12, W, 4) +
        P(b, W) + K.clip(b, R(50, 60, 20, 100, 0, '#ff5c7a', 0) + R(130, 60, 20, 100, 0, '#ff5c7a', 0)) + P(b) +
        F(86, 114, 96, 'side', W, { b: 'raise', m: 'o' }) +
        dm(4, 18, 54, '前方高能', '#ffe27a') + dm(142, 84, 52, '？？？', '#c9f0d8') + dm(2, 112, 48, '哈哈哈', '#ffd6e6') +
        A('M140 110l16 12') + H(156, 122);
    }],
    // 快没电的电池（电量 1%）
    dianliang: ['shake', function () {
      return P('M156 50q-8 12 0 16q8-4 0-16Z', K.BLUE, 3) + '<g fill="#7b5cff" font-family="Arial Black,Arial" font-weight="900"><text x="150" y="40" font-size="22">Z</text><text x="168" y="24" font-size="15">Z</text></g>' +
        G('rotate(6 100 190)', L(90, 112, 150, k, 'cross') +
          R(87, 12, 26, 14, 4, '#9a8cff', 5) + R(64, 22, 72, 132, 18, '#c7bcff', 5) +
          R(76, 96, 48, 48, 9, W, 4) + R(81, 134, 38, 6, 2, RED, 0) + T(100, 124, 20, '1%') +
          P('M76 52q9 7 18 0M106 52q9 7 18 0', null, 4) + P('M77 62q8 5 16 0M107 62q8 5 16 0', null, 3, '#8a7ae6') +
          P('M86 80q4-4 8 0q4 4 8 0q4-4 8 0q4 4 8 0', null, 4) +
          A('M64 72q-14 22-12 44') + H(52, 116) + A('M136 72q14 22 12 44') + H(148, 116));
    }],
    // 太阳（满血元气王）
    yuanqi: ['bounce', function () {
      var s = '';
      for (var i = 0; i < 12; i++) { var t = (i * 30 + 15) * Math.PI / 180, x = 100 + 50 * Math.cos(t), y = 84 + 50 * Math.sin(t), a = t + .22, b = t - .22;
        s += P('M' + Math.round(100 + 46 * Math.cos(a)) + ' ' + Math.round(84 + 46 * Math.sin(a)) + 'L' + Math.round(100 + 70 * Math.cos(t)) + ' ' + Math.round(84 + 70 * Math.sin(t)) + 'L' + Math.round(100 + 46 * Math.cos(b)) + ' ' + Math.round(84 + 46 * Math.sin(b)) + 'Z', '#ffd84d', 4); }
      return s + L(90, 112, 126, k, 'walk') + C(100, 84, 46, '#ffb52e') + P('M70 62q8-14 24-16', null, 5, '#ffd98a') +
        F(86, 114, 80, 'happy', '#ffb52e', { m: 'grin' }) +
        A('M60 104l-26-14M140 104l26-14') + H(34, 90) + H(166, 90);
    }],
    // 一杯水，里面在起海啸（表面平静内心海啸）
    haixiao: ['float', function () {
      var g = 'M58 30H142L132 150H68Z';
      return L(88, 112, 148, k, 'stand') +
        P(g, '#eef8ff') + K.clip(g, R(40, 98, 120, 60, 0, '#7cc7ff', 0) + P('M48 128Q66 98 88 118Q100 130 112 112Q128 92 160 120V160H48Z', '#3d9be9', 0) +
          P('M66 110q8-12 18-2M118 104q10-10 18 0', null, 3, W) + G('rotate(-24 116 102)', P('M104 104h22l-5 7h-12z', W, 2.5) + P('M114 104V92l8 8z', '#ff9fb4', 2))) +
        P('M58 98H142', null, 3, '#4aa8f0') + P(g) + P('M66 40q-2 30 4 50', null, 4, W) +
        F(86, 114, 66, 'lazy', '#eef8ff', { m: 'smile', my: -4 }) +
        A('M62 92l-16 22M138 92l16 22') + H(46, 114) + H(154, 114);
    }],
    // 弯月亮（深夜 emo 选手）
    emo: ['sway', function () {
      return K.spark(150, 40, .9, '#fff1a8') + K.spark(170, 120, .7, '#fff1a8') + K.spark(30, 30, .6, '#fff1a8') + K.deco('notes') +
        L(78, 98, 134, k, 'cross') +
        P('M118 34A56 56 0 1 0 118 142A80 80 0 0 1 118 34Z', '#ffe9a8') + P('M58 76q4-18 18-26', null, 4, W) +
        F(58, 80, 86, 'sleepy', '#ffe9a8', { m: 'wobble', my: -2 }) + P('M80 92q-3 10 0 14q3-4 0-14Z', K.BLUE, 2.5) +
        A('M50 112l-14 16') + H(36, 128);
    }],
    // 打结的毛线团（精神内耗王）
    neihao: ['wobble', function () {
      var c = '#ff9fbf', b = 'M52 88A48 48 0 1 0 148 88A48 48 0 1 0 52 88Z';
      return P('M70 50L46 12', null, 5, '#c4935a') + C(46, 12, 5, GOLD, 3) + P('M128 46L150 14', null, 5, '#c4935a') + C(150, 14, 5, GOLD, 3) +
        L(88, 112, 132, k, 'cross') + P('M140 112Q176 118 164 150Q152 176 120 168Q96 162 106 176', null, 4, '#ff7aa8') +
        P(b, c) + K.clip(b, P('M50 70Q100 40 150 66M50 116Q100 140 150 112M66 48Q50 90 68 130M134 48Q150 90 132 130M52 92Q60 60 90 44', null, 3, '#ff7aa8')) + P(b) +
        F(86, 114, 86, 'spiral', c, { b: 'worried', m: 'wobble' }) +
        A('M54 104l-18 16') + H(36, 120);
    }],
    // 朋克保温杯，泡着枸杞（朋克养生家）
    yangsheng: ['bounce', function () {
      var c = '#8fe0c0';
      return P('M86 14q-6-8 0-12M116 14q-6-8 0-12', null, 3, '#b9c2d8') + L(88, 112, 146, k, 'stand') +
        P('M74 26L80 8L88 22L96 4L104 22L112 6L118 22L126 10L126 28Z', '#ff4f8b', 4) +
        R(68, 22, 64, 18, 6, '#ff7aa8') + R(66, 38, 68, 112, 16, c) + P('M76 50v80', null, 5, '#c9f5e4') +
        E(100, 124, 22, 14, '#fff4e8', 3) + E(92, 122, 4, 2.5, '#e84a4a', 0) + E(104, 126, 4, 2.5, '#e84a4a', 0) + E(110, 119, 4, 2.5, '#e84a4a', 0) + E(98, 129, 3.5, 2, '#e84a4a', 0) +
        F(86, 114, 74, 'sleepy', c, { m: 'smirk', my: -2 }) + P('M77 84q8 5 16 0M107 84q8 5 16 0', null, 3, '#6a5acd') +
        A('M66 100l-16 18') + K.prop('phone', 40, 124, -12, .6) + H(50, 118) + A('M134 100l14 18') + H(148, 118);
    }],
    // 贝壳，只敢露出眼睛（社恐本恐）
    shekong: ['shake', function () {
      var c = '#ffb3c7';
      return K.deco('sweat') + L(88, 112, 150, k, 'cross') +
        P('M44 90H156V118H44Z', '#4a3a5a', 0) +
        E(84, 104, 10, 8, W, 3) + C(79, 106, 4.5, INK, 0) + E(112, 104, 10, 8, W, 3) + C(107, 106, 4.5, INK, 0) +
        P('M40 114Q40 152 100 152Q160 152 160 114Z', c) + P('M64 118Q66 140 80 148M100 118V150M136 118Q134 140 120 148', null, 3, '#ff8fab') +
        P('M40 92Q44 34 100 32Q156 34 160 92Z', '#ffc4d4') + P('M100 88V38M100 88L64 46M100 88L136 46M100 88L48 70M100 88L152 70', null, 3, '#ff9fb4') +
        E(150, 100, 7, 6, INK, 0) + P('M146 96q4-6 8 0', null, 2.5, W);
    }],
    // 一碗米饭（干饭续命人）
    ganfan: ['jelly', function () {
      var c = '#9ad7ff';
      return P('M80 32q-6-8 0-14M100 28q-6-8 0-14M120 32q-6-8 0-14', null, 3, '#b9c2d8') + L(88, 112, 152, k, 'walk') +
        P('M50 92Q50 50 100 48Q150 50 150 92Z', W) +
        E(78, 70, 3, 5, '#f0ead8', 0) + E(98, 60, 3, 5, '#f0ead8', 0) + E(120, 68, 3, 5, '#f0ead8', 0) + E(108, 80, 3, 5, '#f0ead8', 0) + E(66, 84, 3, 5, '#f0ead8', 0) +
        P('M42 92H158Q154 146 100 148Q46 146 42 92Z', c) + P('M52 102q12 6 24 0t24 0 24 0 24 0', null, 3, '#5aa8e6') +
        R(78, 144, 44, 9, 3, '#5aa8e6') +
        F(84, 116, 112, 'happy', c, { m: 'tongue', my: -2 }) +
        A('M150 112l18-14') + P('M156 110L190 76M162 114L194 84', null, 4, '#c4935a') + H(168, 98);
    }],
    // 弹簧，举着 flag（间歇性踌躇满志）
    tanhuang: ['bounce', function () {
      function coil(y) { return E(100, y, 44, 9, 'none', 11) + E(100, y, 44, 9, 'none', 5, '#c7b6ff'); }
      return K.deco('lightning') + L(88, 112, 138, k, 'walk') +
        coil(132) + coil(116) + coil(100) +
        E(100, 62, 54, 32, '#d8ceff') + P('M60 52q8-14 24-16', null, 4, W) +
        F(86, 114, 56, 'wide', '#d8ceff', { b: 'angry', m: 'grin', my: -4 }) +
        A('M152 58l14-16') + P('M168 46V6', null, 4) + P('M168 8L196 16L168 26Z', RED, 3) + H(166, 42) +
        A('M48 66q-18 8-12 22q8 4 14-4');
    }]
  };
  window.QUIZ.results.forEach(function (r) { r.art = ART[r.id]; });
})(window.Chars.kit);
