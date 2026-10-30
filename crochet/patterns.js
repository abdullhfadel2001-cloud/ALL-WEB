// ===== خيوط وغرز | ملف بيانات الباترونات والمصطلحات المحدث والآمن 100% =====
// جميع الرسوم والنسيج كروشيه نقي (خيوط، سنارات، غرز فقط) خالية تماماً من أي صور عشوائية أو أشخاص

// ═══════════════════════════════════════════════════════
//  1. الرسوم التوضيحية الدقيقة لحركة السنارة (STITCH_SVGS)
// ═══════════════════════════════════════════════════════
const STITCH_SVGS = {
  magicRing: `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mr_grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#8b5cf6"/><stop offset="100%" stop-color="#5b21b6"/>
      </linearGradient>
      <filter id="mr_glow"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#7c3aed" flood-opacity="0.25"/></filter>
    </defs>
    <rect width="160" height="160" rx="14" fill="#faf5ff"/>
    <!-- Circular loop -->
    <circle cx="80" cy="80" r="50" fill="none" stroke="#ddd6fe" stroke-width="8" stroke-dasharray="10 6"/>
    <circle cx="80" cy="80" r="34" fill="none" stroke="url(#mr_grad)" stroke-width="6" filter="url(#mr_glow)"/>
    <!-- Arrow direction -->
    <path d="M80 40 Q105 55 105 80 Q105 105 80 114 Q55 105 55 80" fill="none" stroke="#f59e0b" stroke-width="4" stroke-linecap="round" stroke-dasharray="6 4"/>
    <!-- Hook insertion point -->
    <circle cx="80" cy="40" r="8" fill="#10b981"/>
    <circle cx="80" cy="40" r="3.5" fill="#fff"/>
    <!-- Tail to pull -->
    <path d="M55 80 Q40 100 25 120" fill="none" stroke="#7c3aed" stroke-width="5" stroke-linecap="round"/>
    <text x="32" y="140" font-family="Cairo,sans-serif" font-size="10" font-weight="800" fill="#7c3aed">اسحبي الخيط</text>
    <text x="80" y="24" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#4c1d95">الدائرة السحرية (MR)</text>
  </svg>`,

  chainStitch: `<svg viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ch_grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#6d28d9"/><stop offset="100%" stop-color="#a855f7"/>
      </linearGradient>
    </defs>
    <rect width="220" height="120" rx="14" fill="#faf5ff"/>
    <!-- Chain loops interlocking -->
    <g transform="translate(15, 30)">
      <ellipse cx="25" cy="30" rx="20" ry="14" fill="none" stroke="url(#ch_grad)" stroke-width="5"/>
      <ellipse cx="62" cy="30" rx="20" ry="14" fill="none" stroke="url(#ch_grad)" stroke-width="5"/>
      <ellipse cx="99" cy="30" rx="20" ry="14" fill="none" stroke="url(#ch_grad)" stroke-width="5"/>
      <ellipse cx="136" cy="30" rx="20" ry="14" fill="none" stroke="url(#ch_grad)" stroke-width="5"/>
      <ellipse cx="173" cy="30" rx="20" ry="14" fill="none" stroke="#f59e0b" stroke-width="5" stroke-dasharray="6 3"/>
      <!-- Inner knots -->
      <circle cx="25" cy="30" r="5" fill="#c084fc"/>
      <circle cx="62" cy="30" r="5" fill="#c084fc"/>
      <circle cx="99" cy="30" r="5" fill="#c084fc"/>
      <circle cx="136" cy="30" r="5" fill="#c084fc"/>
    </g>
    <text x="110" y="102" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#4c1d95">غرزة السلسلة المتشابكة (ch)</text>
  </svg>`,

  singleCrochet: `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <rect width="160" height="160" rx="14" fill="#faf5ff"/>
    <!-- Base stitch loop -->
    <ellipse cx="80" cy="115" rx="35" ry="14" fill="none" stroke="#a78bfa" stroke-width="4"/>
    <!-- Vertical post -->
    <line x1="80" y1="45" x2="80" y2="105" stroke="#7c3aed" stroke-width="6" stroke-linecap="round"/>
    <!-- Crossbar -->
    <line x1="60" y1="80" x2="100" y2="80" stroke="#7c3aed" stroke-width="5" stroke-linecap="round"/>
    <!-- Top loop V -->
    <path d="M60 45 Q80 65 100 45" fill="none" stroke="#f59e0b" stroke-width="5" stroke-linecap="round"/>
    <circle cx="80" cy="45" r="6" fill="#10b981"/>
    <!-- Arrow -->
    <path d="M115 65 L135 65 L125 50 Z" fill="#7c3aed"/>
    <text x="80" y="26" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#4c1d95">غرزة الحشو (Single Crochet - sc)</text>
    <text x="80" y="146" text-anchor="middle" font-family="Cairo,sans-serif" font-size="10" font-weight="700" fill="#6d28d9">ادخلي، لفي، اسحبي من الحلقتين</text>
  </svg>`,

  doubleCrochet: `<svg viewBox="0 0 160 170" xmlns="http://www.w3.org/2000/svg">
    <rect width="160" height="170" rx="14" fill="#faf5ff"/>
    <!-- Base -->
    <ellipse cx="80" cy="130" rx="36" ry="14" fill="none" stroke="#a78bfa" stroke-width="4"/>
    <!-- Long vertical column -->
    <line x1="80" y1="35" x2="80" y2="120" stroke="#7c3aed" stroke-width="6" stroke-linecap="round"/>
    <!-- Two bars for double crochet twist -->
    <line x1="58" y1="65" x2="102" y2="65" stroke="#7c3aed" stroke-width="5" stroke-linecap="round"/>
    <line x1="58" y1="90" x2="102" y2="90" stroke="#7c3aed" stroke-width="5" stroke-linecap="round"/>
    <!-- Top V loop -->
    <path d="M58 35 Q80 55 102 35" fill="none" stroke="#f59e0b" stroke-width="5" stroke-linecap="round"/>
    <text x="80" y="24" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#4c1d95">غرزة العمود بلفة (dc)</text>
    <text x="80" y="156" text-anchor="middle" font-family="Cairo,sans-serif" font-size="10" font-weight="700" fill="#6d28d9">لفة أولى + سحب حلقتين مرتين</text>
  </svg>`,

  increase: `<svg viewBox="0 0 180 160" xmlns="http://www.w3.org/2000/svg">
    <rect width="180" height="160" rx="14" fill="#faf5ff"/>
    <!-- Base single hole -->
    <ellipse cx="90" cy="125" rx="18" ry="10" fill="#ede9fe" stroke="#7c3aed" stroke-width="4"/>
    <circle cx="90" cy="125" r="5" fill="#f59e0b"/>
    <!-- Two stems branching up from same spot -->
    <line x1="85" y1="120" x2="55" y2="50" stroke="#10b981" stroke-width="6" stroke-linecap="round"/>
    <line x1="95" y1="120" x2="125" y2="50" stroke="#10b981" stroke-width="6" stroke-linecap="round"/>
    <!-- Top two loops -->
    <circle cx="55" cy="45" r="14" fill="#ecfdf5" stroke="#10b981" stroke-width="4"/>
    <circle cx="125" cy="45" r="14" fill="#ecfdf5" stroke="#10b981" stroke-width="4"/>
    <text x="55" y="49" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#059669">1</text>
    <text x="125" y="49" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#059669">2</text>
    <text x="90" y="24" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#059669">الزيادة (inc): غرزتان في نفس المكان</text>
    <text x="90" y="150" text-anchor="middle" font-family="Cairo,sans-serif" font-size="10" font-weight="700" fill="#6d28d9">توسع محيط الشغل وتزيده</text>
  </svg>`,

  decrease: `<svg viewBox="0 0 180 160" xmlns="http://www.w3.org/2000/svg">
    <rect width="180" height="160" rx="14" fill="#faf5ff"/>
    <!-- Two base stitches -->
    <ellipse cx="55" cy="125" rx="16" ry="10" fill="#ede9fe" stroke="#7c3aed" stroke-width="3"/>
    <ellipse cx="125" cy="125" rx="16" ry="10" fill="#ede9fe" stroke="#7c3aed" stroke-width="3"/>
    <!-- Converging stems into one -->
    <line x1="55" y1="115" x2="90" y2="55" stroke="#ef4444" stroke-width="6" stroke-linecap="round"/>
    <line x1="125" y1="115" x2="90" y2="55" stroke="#ef4444" stroke-width="6" stroke-linecap="round"/>
    <!-- Single top merged loop -->
    <circle cx="90" cy="45" r="16" fill="#fef2f2" stroke="#ef4444" stroke-width="4"/>
    <text x="90" y="50" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#dc2626">1</text>
    <text x="90" y="24" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#dc2626">النقصان (dec): دمج غرزتين في واحدة</text>
    <text x="90" y="150" text-anchor="middle" font-family="Cairo,sans-serif" font-size="10" font-weight="700" fill="#6d28d9">تضييق الحجم وإغلاق الفتحات</text>
  </svg>`,

  slipStitch: `<svg viewBox="0 0 170 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="170" height="140" rx="14" fill="#faf5ff"/>
    <path d="M25 85 Q65 35 105 75 Q135 105 145 60" fill="none" stroke="#7c3aed" stroke-width="6" stroke-linecap="round"/>
    <circle cx="25" cy="85" r="9" fill="#f59e0b"/>
    <circle cx="145" cy="60" r="9" fill="#10b981"/>
    <!-- Direct pass through arrow -->
    <path d="M90 75 Q120 75 135 62" fill="none" stroke="#10b981" stroke-width="3" stroke-dasharray="4 3"/>
    <text x="85" y="24" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#4c1d95">غرزة الانزلاق / المنزلقة (sl st)</text>
    <text x="85" y="125" text-anchor="middle" font-family="Cairo,sans-serif" font-size="10" font-weight="700" fill="#6d28d9">سحب مباشر بدون زيادة في الارتفاع</text>
  </svg>`,

  granny: `<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
    <rect width="160" height="160" rx="14" fill="#faf5ff"/>
    <!-- Granny square corner groups -->
    <rect x="25" y="25" width="110" height="110" rx="8" fill="none" stroke="#ddd6fe" stroke-width="3"/>
    <circle cx="80" cy="80" r="16" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/>
    <!-- 4 clusters of 3 dc -->
    <g fill="#7c3aed">
      <rect x="72" y="32" width="16" height="24" rx="4"/>
      <rect x="72" y="104" width="16" height="24" rx="4"/>
      <rect x="32" y="72" width="24" height="16" rx="4"/>
      <rect x="104" y="72" width="24" height="16" rx="4"/>
    </g>
    <!-- Corners -->
    <circle cx="44" cy="44" r="8" fill="#10b981"/>
    <circle cx="116" cy="44" r="8" fill="#10b981"/>
    <circle cx="44" cy="116" r="8" fill="#10b981"/>
    <circle cx="116" cy="116" r="8" fill="#10b981"/>
    <text x="80" y="20" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#4c1d95">مربع الجدة (Granny Square)</text>
  </svg>`,

  rowWork: `<svg viewBox="0 0 180 130" xmlns="http://www.w3.org/2000/svg">
    <rect width="180" height="130" rx="14" fill="#faf5ff"/>
    <!-- Foundation line -->
    <line x1="20" y1="95" x2="160" y2="95" stroke="#ddd6fe" stroke-width="5" stroke-linecap="round"/>
    <!-- Row of vertical stitches -->
    <g stroke="#7c3aed" stroke-width="4.5" stroke-linecap="round">
      <line x1="35" y1="95" x2="35" y2="50"/><path d="M28 55 Q35 45 42 55" fill="none"/>
      <line x1="65" y1="95" x2="65" y2="50"/><path d="M58 55 Q65 45 72 55" fill="none"/>
      <line x1="95" y1="95" x2="95" y2="50"/><path d="M88 55 Q95 45 102 55" fill="none"/>
      <line x1="125" y1="95" x2="125" y2="50"/><path d="M118 55 Q125 45 132 55" fill="none"/>
      <line x1="150" y1="95" x2="150" y2="50"/>
    </g>
    <text x="90" y="26" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#4c1d95">حياكة سطر مستوٍ منتظم</text>
    <text x="90" y="118" text-anchor="middle" font-family="Cairo,sans-serif" font-size="10" font-weight="700" fill="#6d28d9">غرز متساوية بنفس الارتفاع والشد</text>
  </svg>`,

  stuffingFill: `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="160" height="140" rx="14" fill="#faf5ff"/>
    <!-- Doll head shell -->
    <path d="M35 85 C35 35 125 35 125 85" fill="#f3e8ff" stroke="#7c3aed" stroke-width="4.5"/>
    <!-- Fluffy cloud fiberfill inside -->
    <path d="M55 75 Q65 55 80 65 Q95 50 105 70 Q115 80 100 85 Q80 90 60 85 Z" fill="#ffffff" stroke="#c084fc" stroke-width="3"/>
    <circle cx="70" cy="70" r="4" fill="#e9d5ff"/>
    <circle cx="90" cy="68" r="5" fill="#e9d5ff"/>
    <text x="80" y="24" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#4c1d95">حشو فايبر السوليقان للدمى</text>
    <text x="80" y="122" text-anchor="middle" font-family="Cairo,sans-serif" font-size="10" font-weight="700" fill="#6d28d9">احشي تدريجياً ليبقى القوام مشدوداً</text>
  </svg>`,

  yarnTail: `<svg viewBox="0 0 170 130" xmlns="http://www.w3.org/2000/svg">
    <rect width="170" height="130" rx="14" fill="#faf5ff"/>
    <!-- Crocheted fabric row -->
    <rect x="20" y="60" width="130" height="30" rx="6" fill="#ede9fe" stroke="#7c3aed" stroke-width="3"/>
    <!-- Weaving needle & thread path -->
    <path d="M35 75 Q50 65 65 75 Q80 85 95 75 Q110 65 125 75" fill="none" stroke="#f59e0b" stroke-width="4.5" stroke-linecap="round"/>
    <!-- Wool needle eye -->
    <line x1="125" y1="75" x2="150" y2="70" stroke="#64748b" stroke-width="4" stroke-linecap="round"/>
    <circle cx="147" cy="71" r="2.5" fill="#fff"/>
    <text x="85" y="26" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#4c1d95">إخفاء وتنظيف ذيل الخيط</text>
    <text x="85" y="116" text-anchor="middle" font-family="Cairo,sans-serif" font-size="10" font-weight="700" fill="#6d28d9">مرري الإبرة داخل جسم الغرز ذهاباً وإياباً</text>
  </svg>`,

  assembly: `<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg">
    <rect width="160" height="140" rx="14" fill="#faf5ff"/>
    <!-- Two parts meeting -->
    <circle cx="55" cy="70" r="32" fill="#ede9fe" stroke="#7c3aed" stroke-width="4"/>
    <circle cx="105" cy="70" r="24" fill="#fef3c7" stroke="#f59e0b" stroke-width="4"/>
    <!-- Sewing stitch dashes -->
    <g stroke="#10b981" stroke-width="3.5" stroke-linecap="round">
      <line x1="80" y1="52" x2="84" y2="58"/>
      <line x1="79" y1="64" x2="83" y2="70"/>
      <line x1="80" y1="76" x2="84" y2="82"/>
      <line x1="81" y1="88" x2="85" y2="94"/>
    </g>
    <text x="80" y="24" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#4c1d95">تجميع وخياطة الأجزاء معاً</text>
    <text x="80" y="125" text-anchor="middle" font-family="Cairo,sans-serif" font-size="10" font-weight="700" fill="#6d28d9">خياطة متينة وثابتة بإبرة الصوف</text>
  </svg>`,

  closeOpening: `<svg viewBox="0 0 160 130" xmlns="http://www.w3.org/2000/svg">
    <rect width="160" height="130" rx="14" fill="#faf5ff"/>
    <ellipse cx="80" cy="65" rx="45" ry="32" fill="none" stroke="#7c3aed" stroke-width="5" stroke-dasharray="8 5"/>
    <!-- Arrow pulling tight -->
    <path d="M40 65 Q60 85 80 85 Q100 85 120 65" fill="none" stroke="#f59e0b" stroke-width="4"/>
    <circle cx="80" cy="85" r="7" fill="#ef4444"/>
    <text x="80" y="24" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#4c1d95">إغلاق الفتحة الدائرية تماماً</text>
    <text x="80" y="116" text-anchor="middle" font-family="Cairo,sans-serif" font-size="10" font-weight="700" fill="#6d28d9">سحب الخيط في الحلقات الأمامية وزمها</text>
  </svg>`
};

// ═══════════════════════════════════════════════════════
//  2. الرسوم الواقعية عالية الدقة للغرز بالخيط الحقيقي (STITCH_REAL_TEXTURES)
//  (تقتصر تماماً على نسيج خيوط الصوف والسنارات بدون أي صور بشرية)
// ═══════════════════════════════════════════════════════
const STITCH_REAL_TEXTURES = {
  chainStitch: `<svg viewBox="0 0 170 130" xmlns="http://www.w3.org/2000/svg">
    <rect width="170" height="130" rx="10" fill="#2e1065"/>
    <defs>
      <linearGradient id="wool_purple" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#c084fc"/><stop offset="50%" stop-color="#9333ea"/><stop offset="100%" stop-color="#6b21a8"/>
      </linearGradient>
    </defs>
    <!-- Realistic twisted wool chain rope -->
    <g transform="translate(15, 35)">
      <path d="M10 25 C10 10, 35 10, 35 25 C35 40, 10 40, 10 25 Z" fill="none" stroke="url(#wool_purple)" stroke-width="11" stroke-linecap="round"/>
      <path d="M30 25 C30 10, 55 10, 55 25 C55 40, 30 40, 30 25 Z" fill="none" stroke="url(#wool_purple)" stroke-width="11" stroke-linecap="round"/>
      <path d="M50 25 C50 10, 75 10, 75 25 C50 40, 50 40, 50 25 Z" fill="none" stroke="url(#wool_purple)" stroke-width="11" stroke-linecap="round"/>
      <path d="M70 25 C70 10, 95 10, 95 25 C70 40, 70 40, 70 25 Z" fill="none" stroke="url(#wool_purple)" stroke-width="11" stroke-linecap="round"/>
      <path d="M90 25 C90 10, 115 10, 115 25 C90 40, 90 40, 90 25 Z" fill="none" stroke="url(#wool_purple)" stroke-width="11" stroke-linecap="round"/>
      <path d="M110 25 C110 10, 135 10, 135 25 C110 40, 110 40, 110 25 Z" fill="none" stroke="url(#wool_purple)" stroke-width="11" stroke-linecap="round"/>
    </g>
    <text x="85" y="112" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#fbbf24">نسيج خيط السلسلة الحقيقي 🧶</text>
  </svg>`,

  singleCrochet: `<svg viewBox="0 0 170 130" xmlns="http://www.w3.org/2000/svg">
    <rect width="170" height="130" rx="10" fill="#1e1b4b"/>
    <!-- Dense interlocking V stitches in real wool texture -->
    <g fill="#818cf8" stroke="#312e81" stroke-width="1.5">
      <!-- Row 1 -->
      <path d="M15 30 L25 45 L35 30 L25 20 Z"/><path d="M35 30 L45 45 L55 30 L45 20 Z"/><path d="M55 30 L65 45 L75 30 L65 20 Z"/>
      <path d="M75 30 L85 45 L95 30 L85 20 Z"/><path d="M95 30 L105 45 L115 30 L105 20 Z"/><path d="M115 30 L125 45 L135 30 L125 20 Z"/>
      <!-- Row 2 -->
      <path d="M25 50 L35 65 L45 50 L35 40 Z"/><path d="M45 50 L55 65 L65 50 L55 40 Z"/><path d="M65 50 L75 65 L85 50 L75 40 Z"/>
      <path d="M85 50 L95 65 L105 50 L95 40 Z"/><path d="M105 50 L115 65 L125 50 L115 40 Z"/><path d="M125 50 L135 65 L145 50 L135 40 Z"/>
      <!-- Row 3 -->
      <path d="M15 70 L25 85 L35 70 L25 60 Z"/><path d="M35 70 L45 85 L55 70 L45 60 Z"/><path d="M55 70 L65 85 L75 70 L65 60 Z"/>
      <path d="M75 70 L85 85 L95 70 L85 60 Z"/><path d="M95 70 L105 85 L115 70 L105 60 Z"/><path d="M115 70 L125 85 L135 70 L125 60 Z"/>
    </g>
    <text x="85" y="112" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#a5b4fc">نسيج غرزة الحشو المتماسكة (sc) 🧶</text>
  </svg>`,

  doubleCrochet: `<svg viewBox="0 0 170 130" xmlns="http://www.w3.org/2000/svg">
    <rect width="170" height="130" rx="10" fill="#0f172a"/>
    <!-- Tall airy double crochet vertical ribs -->
    <g stroke="#38bdf8" stroke-width="5" stroke-linecap="round">
      <line x1="25" y1="25" x2="25" y2="85"/><line x1="22" y1="50" x2="28" y2="50"/><line x1="22" y1="65" x2="28" y2="65"/>
      <line x1="48" y1="25" x2="48" y2="85"/><line x1="45" y1="50" x2="51" y2="50"/><line x1="45" y1="65" x2="51" y2="65"/>
      <line x1="71" y1="25" x2="71" y2="85"/><line x1="68" y1="50" x2="74" y2="50"/><line x1="68" y1="65" x2="74" y2="65"/>
      <line x1="94" y1="25" x2="94" y2="85"/><line x1="91" y1="50" x2="97" y2="50"/><line x1="91" y1="65" x2="97" y2="65"/>
      <line x1="117" y1="25" x2="117" y2="85"/><line x1="114" y1="50" x2="120" y2="50"/><line x1="114" y1="65" x2="120" y2="65"/>
      <line x1="140" y1="25" x2="140" y2="85"/><line x1="137" y1="50" x2="143" y2="50"/><line x1="137" y1="65" x2="143" y2="65"/>
    </g>
    <text x="85" y="112" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#7dd3fc">نسيج أعمدة الكروشيه المفرغة (dc) 🧶</text>
  </svg>`,

  magicRing: `<svg viewBox="0 0 170 130" xmlns="http://www.w3.org/2000/svg">
    <rect width="170" height="130" rx="10" fill="#140d24"/>
    <defs>
      <radialGradient id="ring_grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#fbbf24"/><stop offset="100%" stop-color="#b45309"/>
      </radialGradient>
    </defs>
    <!-- Tight closed concentric yarn rosette -->
    <circle cx="85" cy="55" r="42" fill="none" stroke="#7c3aed" stroke-width="8" stroke-dasharray="8 4"/>
    <circle cx="85" cy="55" r="28" fill="none" stroke="#c084fc" stroke-width="7"/>
    <circle cx="85" cy="55" r="14" fill="url(#ring_grad)" stroke="#f59e0b" stroke-width="5"/>
    <circle cx="85" cy="55" r="4" fill="#140d24"/>
    <!-- Pull tail -->
    <path d="M85 55 Q70 85 45 100" fill="none" stroke="#fbbf24" stroke-width="6" stroke-linecap="round"/>
    <text x="85" y="118" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#fef08a">الدائرة السحرية المغلقة 100% 🧶</text>
  </svg>`,

  increase: `<svg viewBox="0 0 170 130" xmlns="http://www.w3.org/2000/svg">
    <rect width="170" height="130" rx="10" fill="#064e3b"/>
    <!-- Two woolen stitches emerging from single stitch -->
    <g stroke="#34d399" stroke-width="7" stroke-linecap="round">
      <line x1="85" y1="85" x2="50" y2="35"/>
      <line x1="85" y1="85" x2="120" y2="35"/>
    </g>
    <circle cx="85" cy="85" r="9" fill="#fbbf24"/>
    <circle cx="50" cy="35" r="8" fill="#a7f3d0"/>
    <circle cx="120" cy="35" r="8" fill="#a7f3d0"/>
    <text x="85" y="114" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#6ee7b7">غرزتان متفرعتان بالصوف (inc) 🧶</text>
  </svg>`,

  decrease: `<svg viewBox="0 0 170 130" xmlns="http://www.w3.org/2000/svg">
    <rect width="170" height="130" rx="10" fill="#450a0a"/>
    <!-- Two stems converging to one top -->
    <g stroke="#f87171" stroke-width="7" stroke-linecap="round">
      <line x1="50" y1="85" x2="85" y2="35"/>
      <line x1="120" y1="85" x2="85" y2="35"/>
    </g>
    <circle cx="50" cy="85" r="8" fill="#fca5a5"/>
    <circle cx="120" cy="85" r="8" fill="#fca5a5"/>
    <circle cx="85" cy="35" r="10" fill="#fef08a"/>
    <text x="85" y="114" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="900" fill="#fca5a5">دمج غرزتين بالصوف (dec) 🧶</text>
  </svg>`
};

// ═══════════════════════════════════════════════════════
//  3. رسوم الباترونات المطابقة بنسبة 100% لكافة المشاريع
//  (خالية تماماً من صور الأشخاص وتحاكي شكل منتج الكروشيه الفعلي)
// ═══════════════════════════════════════════════════════
const PATTERN_COVERS = {
  'ami-bear': `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="220" rx="16" fill="#451a03"/>
    <g transform="translate(150, 115)">
      <!-- Bear Body -->
      <ellipse cx="0" cy="45" rx="46" ry="52" fill="#92400e" stroke="#78350f" stroke-width="4"/>
      <!-- Bear Head -->
      <circle cx="0" cy="-25" r="48" fill="#b45309" stroke="#78350f" stroke-width="4"/>
      <!-- Ears with crochet stitches -->
      <circle cx="-42" cy="-60" r="18" fill="#92400e" stroke="#78350f" stroke-width="3"/>
      <circle cx="-42" cy="-60" r="10" fill="#fde68a"/>
      <circle cx="42" cy="-60" r="18" fill="#92400e" stroke="#78350f" stroke-width="3"/>
      <circle cx="42" cy="-60" r="10" fill="#fde68a"/>
      <!-- Muzzle -->
      <ellipse cx="0" cy="-15" rx="20" ry="15" fill="#fde68a"/>
      <!-- Nose & Mouth -->
      <ellipse cx="0" cy="-19" rx="6" ry="4" fill="#451a03"/>
      <path d="M0 -15 L0 -10 M-5 -10 Q0 -6 5 -10" stroke="#451a03" stroke-width="2.5" fill="none"/>
      <!-- Safety Eyes -->
      <circle cx="-16" cy="-30" r="5" fill="#0f172a"/><circle cx="-15" cy="-32" r="1.5" fill="#fff"/>
      <circle cx="16" cy="-30" r="5" fill="#0f172a"/><circle cx="17" cy="-32" r="1.5" fill="#fff"/>
      <!-- Arms -->
      <ellipse cx="-44" cy="30" rx="14" ry="26" fill="#b45309" transform="rotate(20 -44 30)"/>
      <ellipse cx="44" cy="30" rx="14" ry="26" fill="#b45309" transform="rotate(-20 44 30)"/>
    </g>
    <rect x="15" y="15" width="100" height="26" rx="13" fill="rgba(0,0,0,0.6)"/>
    <text x="65" y="32" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="800" fill="#fde68a">دمية كروشيه 100%</text>
  </svg>`,

  'ami-bunny': `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="220" rx="16" fill="#1e1b4b"/>
    <g transform="translate(150, 125)">
      <!-- Bunny Body -->
      <ellipse cx="0" cy="40" rx="42" ry="46" fill="#f8fafc" stroke="#cbd5e1" stroke-width="4"/>
      <!-- Bunny Head -->
      <circle cx="0" cy="-15" r="42" fill="#ffffff" stroke="#cbd5e1" stroke-width="4"/>
      <!-- Long Crochet Ears -->
      <ellipse cx="-26" cy="-75" rx="13" ry="40" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
      <ellipse cx="-26" cy="-75" rx="7" ry="30" fill="#fbcfe8"/>
      <ellipse cx="26" cy="-75" rx="13" ry="40" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
      <ellipse cx="26" cy="-75" rx="7" ry="30" fill="#fbcfe8"/>
      <!-- Face -->
      <ellipse cx="-14" cy="-18" rx="4" ry="5" fill="#0f172a"/>
      <ellipse cx="14" cy="-18" rx="4" ry="5" fill="#0f172a"/>
      <!-- Pink Nose -->
      <polygon points="0,-8 -4,-12 4,-12" fill="#f43f5e"/>
      <path d="M-4 -6 Q0 -3 4 -6" stroke="#475569" stroke-width="2" fill="none"/>
      <!-- Blushing Cheeks -->
      <circle cx="-25" cy="-8" r="6" fill="#fbcfe8" opacity="0.6"/>
      <circle cx="25" cy="-8" r="6" fill="#fbcfe8" opacity="0.6"/>
    </g>
    <rect x="15" y="15" width="100" height="26" rx="13" fill="rgba(0,0,0,0.6)"/>
    <text x="65" y="32" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="800" fill="#fbcfe8">دمية كروشيه 100%</text>
  </svg>`,

  'ami-elephant': `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="220" rx="16" fill="#1e293b"/>
    <g transform="translate(150, 115)">
      <!-- Giant Ears -->
      <circle cx="-55" cy="-15" r="32" fill="#94a3b8" stroke="#475569" stroke-width="3"/>
      <circle cx="-55" cy="-15" r="20" fill="#fbcfe8"/>
      <circle cx="55" cy="-15" r="32" fill="#94a3b8" stroke="#475569" stroke-width="3"/>
      <circle cx="55" cy="-15" r="20" fill="#fbcfe8"/>
      <!-- Body -->
      <ellipse cx="0" cy="35" rx="44" ry="46" fill="#64748b"/>
      <!-- Head -->
      <circle cx="0" cy="-15" r="40" fill="#94a3b8" stroke="#475569" stroke-width="4"/>
      <!-- Trunk curved up -->
      <path d="M0 -5 Q0 25 15 25 Q25 25 25 10" fill="none" stroke="#94a3b8" stroke-width="14" stroke-linecap="round"/>
      <circle cx="-15" cy="-22" r="4.5" fill="#0f172a"/>
      <circle cx="15" cy="-22" r="4.5" fill="#0f172a"/>
    </g>
    <rect x="15" y="15" width="100" height="26" rx="13" fill="rgba(0,0,0,0.6)"/>
    <text x="65" y="32" text-anchor="middle" font-family="Cairo,sans-serif" font-size="11" font-weight="800" fill="#93c5fd">دمية كروشيه 100%</text>
  </svg>`,

  'shawl-granny': `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="220" rx="16" fill="#2e1065"/>
    <!-- Patchwork granny squares in rich purple, gold, teal -->
    <g transform="translate(25, 25)">
      <!-- 4 big motif blocks -->
      <rect x="0" y="0" width="80" height="80" rx="8" fill="#4c1d95" stroke="#a78bfa" stroke-width="3"/>
      <circle cx="40" cy="40" r="16" fill="#f59e0b"/>
      
      <rect x="85" y="0" width="80" height="80" rx="8" fill="#065f46" stroke="#34d399" stroke-width="3"/>
      <circle cx="125" cy="40" r="16" fill="#ec4899"/>

      <rect x="170" y="0" width="80" height="80" rx="8" fill="#831843" stroke="#f472b6" stroke-width="3"/>
      <circle cx="210" cy="40" r="16" fill="#38bdf8"/>

      <rect x="0" y="85" width="80" height="80" rx="8" fill="#065f46" stroke="#34d399" stroke-width="3"/>
      <circle cx="40" cy="125" r="16" fill="#f59e0b"/>

      <rect x="85" y="85" width="80" height="80" rx="8" fill="#4c1d95" stroke="#a78bfa" stroke-width="3"/>
      <circle cx="125" cy="125" r="16" fill="#fbbf24"/>

      <rect x="170" y="85" width="80" height="80" rx="8" fill="#1e1b4b" stroke="#818cf8" stroke-width="3"/>
      <circle cx="210" cy="125" r="16" fill="#34d399"/>
    </g>
    <!-- Fringes -->
    <g stroke="#f59e0b" stroke-width="2.5">
      <line x1="40" y1="190" x2="40" y2="210"/><line x1="80" y1="190" x2="80" y2="210"/>
      <line x1="120" y1="190" x2="120" y2="210"/><line x1="160" y1="190" x2="160" y2="210"/>
      <line x1="200" y1="190" x2="200" y2="210"/><line x1="240" y1="190" x2="240" y2="210"/>
    </g>
  </svg>`,

  'shawl-triangle': `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="220" rx="16" fill="#140d24"/>
    <!-- Triangle Shawl Mesh -->
    <polygon points="150,25 25,180 275,180" fill="#3b0764" stroke="#c084fc" stroke-width="4"/>
    <g stroke="#e9d5ff" stroke-width="2" stroke-dasharray="6 4" opacity="0.7">
      <line x1="150" y1="25" x2="150" y2="180"/>
      <line x1="120" y1="65" x2="180" y2="65"/>
      <line x1="90" y1="105" x2="210" y2="105"/>
      <line x1="60" y1="145" x2="240" y2="145"/>
    </g>
    <!-- Bohemian Tassels -->
    <circle cx="150" cy="180" r="6" fill="#f59e0b"/>
    <circle cx="25" cy="180" r="6" fill="#f59e0b"/>
    <circle cx="275" cy="180" r="6" fill="#f59e0b"/>
  </svg>`,

  'mandala-doily': `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="220" rx="16" fill="#0f172a"/>
    <!-- Concentric intricate lace mandala rings -->
    <g transform="translate(150, 110)">
      <circle cx="0" cy="0" r="85" fill="none" stroke="#f1f5f9" stroke-width="2.5" stroke-dasharray="8 4"/>
      <circle cx="0" cy="0" r="65" fill="none" stroke="#38bdf8" stroke-width="3"/>
      <circle cx="0" cy="0" r="45" fill="none" stroke="#e0e7ff" stroke-width="2" stroke-dasharray="6 3"/>
      <circle cx="0" cy="0" r="28" fill="none" stroke="#f8fafc" stroke-width="3.5"/>
      <circle cx="0" cy="0" r="10" fill="#38bdf8"/>
      <!-- Petal spokes -->
      <g stroke="#f8fafc" stroke-width="2">
        <line x1="0" y1="-85" x2="0" y2="85"/><line x1="-85" y1="0" x2="85" y2="0"/>
        <line x1="-60" y1="-60" x2="60" y2="60"/><line x1="60" y1="-60" x2="-60" y2="60"/>
      </g>
    </g>
  </svg>`,

  'basket-home': `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="220" rx="16" fill="#451a03"/>
    <g transform="translate(150, 125)">
      <!-- Chunky basket body -->
      <ellipse cx="0" cy="40" rx="80" ry="24" fill="#78350f" stroke="#b45309" stroke-width="4"/>
      <path d="M-80 0 L-75 40 Q0 65 75 40 L80 0 Z" fill="#92400e" stroke="#b45309" stroke-width="4"/>
      <ellipse cx="0" cy="0" rx="80" ry="24" fill="#b45309" stroke="#d97706" stroke-width="4"/>
      <!-- Cutout handles -->
      <rect x="-45" y="10" width="28" height="10" rx="5" fill="#451a03"/>
      <rect x="17" y="10" width="28" height="10" rx="5" fill="#451a03"/>
    </g>
  </svg>`,

  'bag-raffia': `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="220" rx="16" fill="#1c1917"/>
    <g transform="translate(150, 125)">
      <!-- Round handles -->
      <circle cx="0" cy="-45" r="32" fill="none" stroke="#78350f" stroke-width="7"/>
      <!-- Bag body trapezoid -->
      <polygon points="-75,55 75,55 65,-10 -65,-10" fill="#d97706" stroke="#92400e" stroke-width="4"/>
      <!-- Raffia woven texture lines -->
      <g stroke="#fef3c7" stroke-width="2" opacity="0.6">
        <line x1="-60" y1="5" x2="60" y2="5"/><line x1="-65" y1="20" x2="65" y2="20"/><line x1="-70" y1="35" x2="70" y2="35"/>
      </g>
    </g>
  </svg>`,

  'bag-market': `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="220" rx="16" fill="#042f2e"/>
    <g transform="translate(150, 115)">
      <!-- Long handles -->
      <path d="M-40 -40 Q-40 -85 0 -85 Q40 -85 40 -40" fill="none" stroke="#2dd4bf" stroke-width="6"/>
      <!-- Mesh body -->
      <path d="M-55 -40 L-60 45 Q0 75 60 45 L55 -40 Z" fill="#0d9488" stroke="#2dd4bf" stroke-width="4"/>
      <!-- Diamond net lines -->
      <g stroke="#99f6e4" stroke-width="2" opacity="0.7">
        <line x1="-50" y1="-20" x2="50" y2="30"/><line x1="-50" y1="10" x2="30" y2="50"/>
        <line x1="50" y1="-20" x2="-50" y2="30"/><line x1="50" y1="10" x2="-30" y2="50"/>
      </g>
    </g>
  </svg>`,

  'beanie-hat': `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="220" rx="16" fill="#18181b"/>
    <g transform="translate(150, 120)">
      <!-- Top fluffy pom-pom -->
      <circle cx="0" cy="-65" r="22" fill="#f43f5e" stroke="#be123c" stroke-width="3"/>
      <!-- Dome ribbed beanie -->
      <path d="M-60 25 C-60 -45 60 -45 60 25 Z" fill="#e11d48" stroke="#be123c" stroke-width="4"/>
      <!-- Ribbed vertical lines -->
      <g stroke="#fda4af" stroke-width="3">
        <line x1="-40" y1="25" x2="-25" y2="-30"/>
        <line x1="-15" y1="25" x2="-8" y2="-45"/>
        <line x1="15" y1="25" x2="8" y2="-45"/>
        <line x1="40" y1="25" x2="25" y2="-30"/>
      </g>
      <!-- Folded brim -->
      <rect x="-66" y="22" width="132" height="26" rx="6" fill="#be123c" stroke="#9f1239" stroke-width="3"/>
    </g>
  </svg>`,

  'socks-warm': `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="220" rx="16" fill="#172554"/>
    <g transform="translate(145, 110)">
      <!-- Sock shape -->
      <path d="M-25 -60 L15 -60 L15 10 Q20 35 45 40 L65 40 Q80 40 80 55 Q80 70 65 70 L5 70 Q-25 70 -25 35 Z" 
            fill="#3b82f6" stroke="#1d4ed8" stroke-width="5"/>
      <!-- Heel & toe accent -->
      <path d="M-25 35 Q-25 70 5 70 Z" fill="#f59e0b"/>
      <path d="M65 40 Q80 40 80 55 Q80 70 65 70 Z" fill="#f59e0b"/>
      <!-- Ribbed cuff -->
      <rect x="-26" y="-62" width="42" height="15" rx="3" fill="#1e40af"/>
    </g>
  </svg>`,

  'headband': `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="220" rx="16" fill="#3b0764"/>
    <g transform="translate(150, 110)">
      <!-- Wide oval headband -->
      <ellipse cx="0" cy="0" rx="85" ry="32" fill="none" stroke="#a855f7" stroke-width="26"/>
      <!-- Front twist knot -->
      <circle cx="0" cy="0" r="22" fill="#7c3aed" stroke="#c084fc" stroke-width="4"/>
      <path d="M-12 -12 L12 12 M-12 12 L12 -12" stroke="#f59e0b" stroke-width="4"/>
    </g>
  </svg>`,

  'baby-shoes': `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="220" rx="16" fill="#1e1b4b"/>
    <g transform="translate(150, 115)">
      <!-- Bootie sole -->
      <ellipse cx="0" cy="30" rx="55" ry="18" fill="#e2e8f0" stroke="#94a3b8" stroke-width="4"/>
      <!-- Upper shoe -->
      <path d="M-45 30 L-35 -15 L10 -15 L45 30 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="4"/>
      <!-- Ankle strap with wooden button -->
      <rect x="-20" y="-12" width="48" height="12" rx="6" fill="#0284c7"/>
      <circle cx="20" cy="-6" r="6" fill="#f59e0b" stroke="#78350f" stroke-width="2"/>
    </g>
  </svg>`,

  'baby-blanket': `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="220" rx="16" fill="#0c4a6e"/>
    <!-- Waffle texture grid blanket -->
    <rect x="35" y="25" width="230" height="170" rx="12" fill="#7dd3fc" stroke="#38bdf8" stroke-width="5"/>
    <g stroke="#0284c7" stroke-width="3" opacity="0.6">
      <line x1="82" y1="25" x2="82" y2="195"/><line x1="130" y1="25" x2="130" y2="195"/>
      <line x1="178" y1="25" x2="178" y2="195"/><line x1="226" y1="25" x2="226" y2="195"/>
      <line x1="35" y1="67" x2="265" y2="67"/><line x1="35" y1="110" x2="265" y2="110"/><line x1="35" y1="152" x2="265" y2="152"/>
    </g>
  </svg>`,

  'flower-sunflower': `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="220" rx="16" fill="#14532d"/>
    <g transform="translate(150, 110)">
      <!-- 12 Petals around circle -->
      <g fill="#eab308" stroke="#ca8a04" stroke-width="2.5">
        <ellipse cx="0" cy="-60" rx="14" ry="24"/>
        <ellipse cx="30" cy="-52" rx="14" ry="24" transform="rotate(30 30 -52)"/>
        <ellipse cx="52" cy="-30" rx="14" ry="24" transform="rotate(60 52 -30)"/>
        <ellipse cx="60" cy="0" rx="14" ry="24" transform="rotate(90 60 0)"/>
        <ellipse cx="52" cy="30" rx="14" ry="24" transform="rotate(120 52 30)"/>
        <ellipse cx="30" cy="52" rx="14" ry="24" transform="rotate(150 30 52)"/>
        <ellipse cx="0" cy="60" rx="14" ry="24" transform="rotate(180 0 60)"/>
        <ellipse cx="-30" cy="52" rx="14" ry="24" transform="rotate(210 -30 52)"/>
        <ellipse cx="-52" cy="30" rx="14" ry="24" transform="rotate(240 -52 30)"/>
        <ellipse cx="-60" cy="0" rx="14" ry="24" transform="rotate(270 -60 0)"/>
        <ellipse cx="-52" cy="-30" rx="14" ry="24" transform="rotate(300 -52 -30)"/>
        <ellipse cx="-30" cy="-52" rx="14" ry="24" transform="rotate(330 -30 -52)"/>
      </g>
      <!-- Dark brown textured center disk -->
      <circle cx="0" cy="0" r="34" fill="#451a03" stroke="#78350f" stroke-width="4"/>
      <circle cx="0" cy="0" r="24" fill="#78350f" stroke="#b45309" stroke-width="3" stroke-dasharray="6 3"/>
    </g>
  </svg>`,

  'flower-rose': `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="220" rx="16" fill="#1e1b4b"/>
    <g transform="translate(150, 110)">
      <!-- Green Leaves -->
      <ellipse cx="-45" cy="35" rx="16" ry="32" fill="#15803d" transform="rotate(-40 -45 35)"/>
      <ellipse cx="45" cy="35" rx="16" ry="32" fill="#15803d" transform="rotate(40 45 35)"/>
      <!-- 3D Spiral Red Petals -->
      <circle cx="0" cy="0" r="50" fill="#be123c" stroke="#881337" stroke-width="4"/>
      <circle cx="-5" cy="-5" r="36" fill="#e11d48" stroke="#881337" stroke-width="3"/>
      <circle cx="3" cy="3" r="24" fill="#f43f5e" stroke="#881337" stroke-width="3"/>
      <circle cx="0" cy="0" r="12" fill="#fda4af"/>
    </g>
  </svg>`,

  'cushion-cover': `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="220" rx="16" fill="#292524"/>
    <g transform="translate(150, 110)">
      <!-- Square pillow -->
      <rect x="-70" y="-70" width="140" height="140" rx="16" fill="#d97706" stroke="#b45309" stroke-width="5"/>
      <!-- Inner granny motif -->
      <rect x="-45" y="-45" width="90" height="90" rx="8" fill="#78350f" stroke="#fde68a" stroke-width="4"/>
      <circle cx="0" cy="0" r="22" fill="#f59e0b"/>
      <!-- Corner buttons -->
      <circle cx="-55" cy="-55" r="5" fill="#fde68a"/>
      <circle cx="55" cy="-55" r="5" fill="#fde68a"/>
      <circle cx="-55" cy="55" r="5" fill="#fde68a"/>
      <circle cx="55" cy="55" r="5" fill="#fde68a"/>
    </g>
  </svg>`,

  'advanced-sweater': `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="220" rx="16" fill="#0f172a"/>
    <g transform="translate(150, 115)">
      <!-- Torso -->
      <path d="M-45 -35 L45 -35 L55 60 L-55 60 Z" fill="#6366f1" stroke="#4338ca" stroke-width="4"/>
      <!-- Sleeves -->
      <path d="M-45 -35 L-85 20 L-65 30 L-35 -15 Z" fill="#4f46e5"/>
      <path d="M45 -35 L85 20 L65 30 L35 -15 Z" fill="#4f46e5"/>
      <!-- Round neck collar -->
      <ellipse cx="0" cy="-35" rx="20" ry="10" fill="#312e81" stroke="#a5b4fc" stroke-width="3"/>
      <!-- Bottom hem -->
      <rect x="-56" y="55" width="112" height="14" rx="4" fill="#3730a3"/>
    </g>
  </svg>`,

  'advanced-mandala-wall': `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg">
    <rect width="300" height="220" rx="16" fill="#18181b"/>
    <g transform="translate(150, 110)">
      <!-- Wooden embroidery hoop -->
      <circle cx="0" cy="0" r="80" fill="none" stroke="#d97706" stroke-width="9"/>
      <!-- Stretched lace web -->
      <circle cx="0" cy="0" r="65" fill="none" stroke="#f472b6" stroke-width="2.5" stroke-dasharray="8 4"/>
      <circle cx="0" cy="0" r="42" fill="none" stroke="#38bdf8" stroke-width="3"/>
      <circle cx="0" cy="0" r="18" fill="#fde047"/>
      <!-- Hanging feathers / yarn strands -->
      <path d="M0 80 L0 105" stroke="#d97706" stroke-width="3"/>
      <path d="M-30 75 L-35 100" stroke="#d97706" stroke-width="2.5"/>
      <path d="M30 75 L35 100" stroke="#d97706" stroke-width="2.5"/>
    </g>
  </svg>`
};

// ═══════════════════════════════════════════════════════
//  4. قاموس المصطلحات المعتمد (GLOSSARY)
// ═══════════════════════════════════════════════════════
const GLOSSARY = [
  {
    code: 'ch', us: 'Chain Stitch', ar: 'غرزة السلسلة', desc: 'الأساس في كل مشروع كروشيه — حبل من العقد المتناسقة لتأسيس أول سطر.',
    svg: STITCH_SVGS.chainStitch,
    realTexture: STITCH_REAL_TEXTURES.chainStitch
  },
  {
    code: 'sc', us: 'Single Crochet', ar: 'غرزة الحشو', desc: 'الغرزة الأساسية لصنع الدمى والألعاب — نسيج متماسك ومحكم يمنع خروج الحشو.',
    svg: STITCH_SVGS.singleCrochet,
    realTexture: STITCH_REAL_TEXTURES.singleCrochet
  },
  {
    code: 'dc', us: 'Double Crochet', ar: 'غرزة العمود بلفة', desc: 'أطول من الحشو بضعفين وسريعة الإنجاز — تعطي نسيجاً انسيابياً للشالات والملابس.',
    svg: STITCH_SVGS.doubleCrochet,
    realTexture: STITCH_REAL_TEXTURES.doubleCrochet
  },
  {
    code: 'sl st', us: 'Slip Stitch', ar: 'غرزة المنزلقة (الانزلاق)', desc: 'لإغلاق الأدوار الدائرية برقة أو الانتقال بين الغرز بدون إضافة أي ارتفاع للسطر.',
    svg: STITCH_SVGS.slipStitch,
    realTexture: STITCH_REAL_TEXTURES.chainStitch
  },
  {
    code: 'inc', us: 'Increase', ar: 'الزيادة (التوسيع)', desc: 'حياكة غرزتين كاملتين داخل نفس العين الواحدة لتوسيع محيط القطعة وتكبيرها.',
    svg: STITCH_SVGS.increase,
    realTexture: STITCH_REAL_TEXTURES.increase
  },
  {
    code: 'dec', us: 'Decrease', ar: 'النقصان (التضييق)', desc: 'دمج غرزتين متجاورتين لتصبحا غرزة واحدة، مما يقلص حجم القطعة لتشكيل الرأس أو الأطراف.',
    svg: STITCH_SVGS.decrease,
    realTexture: STITCH_REAL_TEXTURES.decrease
  },
  {
    code: 'MR', us: 'Magic Ring', ar: 'الدائرة السحرية', desc: 'بداية الحياكة الدائرية للأميغورومي — تضمن إغلاق مركز الدائرة 100% بدون أي ثقب.',
    svg: STITCH_SVGS.magicRing,
    realTexture: STITCH_REAL_TEXTURES.magicRing
  },
  {
    code: 'BLO', us: 'Back Loop Only', ar: 'الحلقة الخلفية فقط', desc: 'إدخال السنارة في الخيط الخلفي فقط من السلسلة لتوليد خط بارز وتأثير مضلع مرن.',
    svg: STITCH_SVGS.rowWork,
    realTexture: STITCH_REAL_TEXTURES.singleCrochet
  },
  {
    code: 'FLO', us: 'Front Loop Only', ar: 'الحلقة الأمامية فقط', desc: 'إدخال السنارة في الخيط الأمامي فقط لعمل طبقات وكشاكش ناعمة.',
    svg: STITCH_SVGS.rowWork,
    realTexture: STITCH_REAL_TEXTURES.singleCrochet
  }
];

// ═══════════════════════════════════════════════════════
//  5. قائمة الباترونات المتكاملة المطابقة 100%
// ═══════════════════════════════════════════════════════
const PATTERNS = [
  {
    id: 'ami-bear', 
    title: 'دمية دب أميغورومي كيوت', 
    category: 'amigurumi', 
    emoji: '🐻',
    level: 'مبتدئ', levelColor: '#16a34a', 
    yarn: 'قطن جينز YarnArt — لون بيج وبني', hook: '2.5 مم', yarnBalls: 1, time: '3-4 ساعات',
    description: 'دمية دب كروشيه يابانية لطيفة جداً ومضغوطة بحشو متين، مثالية للمبتدئات كأول مشروع لعبة.',
    steps: [
      { text: 'اعملي دائرة سحرية وأدخلي بداخلها 6 غرز حشو (6 sc) لتأسيس مركز رأس الدب.', svg: 'magicRing' },
      { text: 'الدور 2: زيادة (inc) في كل غرزة = (12 غرزة). بكل عين اشتغلي غرزتين.', svg: 'increase' },
      { text: 'الدور 3: كرري [1 غرزة حشو عادية، ثم زيادة] 6 مرات = (18 غرزة).', svg: 'singleCrochet' },
      { text: 'الدور 4: كرري [2 غرزة حشو عادية، ثم زيادة] 6 مرات = (24 غرزة).', svg: 'singleCrochet' },
      { text: 'الدور 5: كرري [3 غرز حشو عادية، ثم زيادة] 6 مرات = (30 غرزة).', svg: 'increase' },
      { text: 'الأدوار 6 إلى 8: حياكة 30 غرزة حشو مستوية في كل دور بدون أي زيادة أو نقصان لرفع عمق الرأس.', svg: 'rowWork' },
      { text: 'الدور 9: ابدئي بالتصغير: [3 حشو، ثم نقصان خفي] كرري 6 مرات = (24 غرزة).', svg: 'decrease' },
      { text: 'الدور 10: [2 حشو، ثم نقصان خفي] كرري 6 مرات = (18 غرزة).', svg: 'decrease' },
      { text: 'احشي الرأس جيداً بقطن الفايبر (السوليقان) واجعلي الحشو متساوياً ومشدوداً بالداخل.', svg: 'stuffingFill' },
      { text: 'الدور 11: [1 حشو، نقصان] × 6 = (12). ثم الدور 12: 6 نقصانات متتالية واغلقي الفتحة ونظفي الخيط.', svg: 'closeOpening' },
      { text: 'حياكة الجسم بنفس الخطوات وصولاً إلى 24 غرزة ثم حشوه وإغلاقه.', svg: 'magicRing' },
      { text: 'عمل الأذنين واليدين والقدمين وتثبيت عيون الأمان ومطرز الأنف بخيط بني داكن.', svg: 'assembly' },
      { text: 'خياطة كافة الأجزاء معاً بإبرة الصوف وإخفاء ذيول الخيوط بالداخل مبارك دميتكِ الجميلة! 🐻', svg: 'yarnTail' },
    ]
  },
  {
    id: 'ami-bunny', 
    title: 'أرنب أميغورومي بأذنين طويلتين', 
    category: 'amigurumi', 
    emoji: '🐰',
    level: 'مبتدئ', levelColor: '#16a34a', 
    yarn: 'قطن ناعم أبيض + وردي فاتح', hook: '2.5 مم', yarnBalls: 1, time: '4-5 ساعات',
    description: 'أرنب كروشيه فائق النعومة بأذنين طويلتين متهدلتين وقوام متناسق وجميل جداً.',
    steps: [
      { text: 'ابدئي بالدائرة السحرية مع 6 غرز حشو للرأس.', svg: 'magicRing' },
      { text: 'الدور 2: زيادة في كل غرزة للوصول إلى 12 غرزة.', svg: 'increase' },
      { text: 'الأدوار 3-5: زيادات تدريجية منتظمة للوصول لـ 30 غرزة محيطية.', svg: 'increase' },
      { text: 'الأدوار 6-10: 5 أدوار مستوية حشو بدون زيادة لبناء الرأس.', svg: 'rowWork' },
      { text: 'الأدوار 11-14: تناقص تدريجي مع الحشو الجيد بالسوليقان.', svg: 'stuffingFill' },
      { text: 'حياكة الأذنين بسلسلة 6 والعمل صعوداً لـ 14 دوراً لتكون الأذن طويلة ومميزة.', svg: 'chainStitch' },
      { text: 'تركيب الرأس والأذنين وخياطة ملامح الوجه اللطيفة.', svg: 'assembly' },
    ]
  },
  {
    id: 'ami-elephant', 
    title: 'فيل ميني بخرطوم لطيف', 
    category: 'amigurumi', 
    emoji: '🐘',
    level: 'متوسط', levelColor: '#d97706', 
    yarn: 'قطن رمادي + وردي للأذنين', hook: '2.5 مم', yarnBalls: 2, time: '5-6 ساعات',
    description: 'فيل كروشيه مميز بخرطوم مرتفع وأذنين دائريتين عريضتين وذيل صغير ظريف.',
    steps: [
      { text: 'البداية من الخرطوم بسلسلة 5 غرز والعمل حلزونياً لـ 8 أدوار.', svg: 'chainStitch' },
      { text: 'التوسع مباشرة من الخرطوم لتشكيل الرأس وصولاً إلى 36 غرزة.', svg: 'increase' },
      { text: 'حياكة الأدوار المستوية للرأس ثم التناقص والحشو المتماسك.', svg: 'stuffingFill' },
      { text: 'صنع الأذنين العريضتين بغرز العمود لتبدو متهدلة وجميلة.', svg: 'doubleCrochet' },
      { text: 'خياطة الأرجل الأسطوانية وتثبيت كافة الأجزاء بإحكام.', svg: 'assembly' },
    ]
  },
  {
    id: 'shawl-granny', 
    title: 'شال مربعات الجدة الكلاسيكي الفاخر', 
    category: 'shawl', 
    emoji: '🌸',
    level: 'مبتدئ', levelColor: '#16a34a', 
    yarn: 'صوف أكريليك ناعم ملوّن', hook: '4 مم', yarnBalls: 3, time: '6-8 ساعات',
    description: 'الشال التراثي الأشهر عالمياً المكوّن من مربعات الجدة المتصلة، دافئ وفخم ولا تنتهي موضته أبداً.',
    steps: [
      { text: 'عمل حلقة سحرية وحياكة [3 عمود بلفة، 2 سلسلة] 4 مرات لتشكيل زوايا المربع.', svg: 'magicRing' },
      { text: 'الإغلاق بمنزلقة والتبديل للون الجديد في الزوايا [3 عمود، 2 سلسلة، 3 عمود].', svg: 'granny' },
      { text: 'الاستمرار لـ 5 أدوار في كل مربع وتكرار صنع 24 مربعاً بألوان متناسقة.', svg: 'granny' },
      { text: 'تشبيك المربعات معاً بغرزة المنزلقة من الخلف.', svg: 'slipStitch' },
      { text: 'عمل إطار حاشية مروحي أنيق حول الشال بالكامل وتنظيف الخيوط.', svg: 'yarnTail' },
    ]
  },
  {
    id: 'shawl-triangle', 
    title: 'شال بوهو المثلثي الشتوي', 
    category: 'shawl', 
    emoji: '🍃',
    level: 'متوسط', levelColor: '#d97706', 
    yarn: 'صوف كعكة متدرج الألوان (Cake Yarn)', hook: '4.5 مم', yarnBalls: 2, time: '8-10 ساعات',
    description: 'شال مثلثي مفرغ بتدرجات لونية ساحرة، رائع للارتداء في الخريف والشتاء.',
    steps: [
      { text: 'سلسلة 4 ثم الإغلاق بمنزلقة لتأسيس قمة رأس المثلث.', svg: 'chainStitch' },
      { text: 'السطر 1: 3 سلاسل ارتفاع، 2 عمود، 2 سلسلة زاوية، 3 عمود.', svg: 'doubleCrochet' },
      { text: 'زيادة مستمرة في كل سطر عند البداية والنهاية والزاوية الوسطى.', svg: 'increase' },
      { text: 'تكرار الأسطر حتى الوصول لعرض 160 سم وإضافة شراشيب على الحواف.', svg: 'yarnTail' },
    ]
  },
  {
    id: 'mandala-doily', 
    title: 'مفرش مانديلا دانتيل دائري', 
    category: 'home', 
    emoji: '✨',
    level: 'متوسط', levelColor: '#d97706', 
    yarn: 'خيط قطن تركي رفيع عاجي', hook: '2 مم', yarnBalls: 1, time: '4-6 ساعات',
    description: 'مفرش دائري بنقشات هندسية نباتية ساحرة يضفي لمسة فندقية راقية على الطاولات.',
    steps: [
      { text: 'دائرة سحرية بـ 8 غرز حشو ثم إغلاق بمنزلقة.', svg: 'magicRing' },
      { text: 'الدور 2: سلاسل مع غرز عمود مفرغة لتأسيس البتلات.', svg: 'doubleCrochet' },
      { text: 'الأدوار التالية: نقوش عنقودية وزهور صدفية متناسقة.', svg: 'doubleCrochet' },
      { text: 'إطار صدفات ناعمة في الحافة وتثبيته بالمكواة البخارية بلطف.', svg: 'yarnTail' },
    ]
  },
  {
    id: 'basket-home', 
    title: 'سلة كروشيه لتنظيم المنزل', 
    category: 'home', 
    emoji: '🧺',
    level: 'مبتدئ', levelColor: '#16a34a', 
    yarn: 'خيط كليم (تيشيرت) سميك', hook: '7 مم', yarnBalls: 2, time: '2-3 ساعات',
    description: 'سلة صلبة وقوية لحفظ أدوات المكياج، الخيوط، أو مستلزمات العناية.',
    steps: [
      { text: 'قاعدة دائرية بغرز الحشو مع زيادات منتظمة للوصول لقطر 20 سم.', svg: 'magicRing' },
      { text: 'دور حشو في الحلقة الخلفية فقط (BLO) لرفع جدران السلة عمودياً.', svg: 'rowWork' },
      { text: 'حياكة 8 أدوار حشو مستوية غرزة السنبلة لمتانة لا تنحني.', svg: 'singleCrochet' },
      { text: 'تشكيل فتحات المقابض بالسلاسل ثم دور منزلقة للتأطير النهائي.', svg: 'slipStitch' },
    ]
  },
  {
    id: 'bag-raffia', 
    title: 'حقيبة رافيا صيفية عصرية', 
    category: 'bag', 
    emoji: '👜',
    level: 'متوسط', levelColor: '#d97706', 
    yarn: 'خيط قش رافيا طبيعي', hook: '4 مم', yarnBalls: 3, time: '6-8 ساعات',
    description: 'شنطة يد راقية بخيط الرافيا الطبيعي خفيفة وعملية للمناسبات والصيف.',
    steps: [
      { text: 'سلسلة 30 غرزة والعمل حولها في كلا الاتجاهين لقاعدة بيضاوية.', svg: 'chainStitch' },
      { text: 'حياكة جوانب الشنطة بارتفاع 25 سم بغرزة الحشو المضغوطة.', svg: 'rowWork' },
      { text: 'صنع يدين قويتين بالسلاسل وتغليفهما بغرز الحشو.', svg: 'chainStitch' },
    ]
  },
  {
    id: 'bag-market', 
    title: 'حقيبة تسوق شبكية متمددة', 
    category: 'bag', 
    emoji: '🛍️',
    level: 'مبتدئ', levelColor: '#16a34a', 
    yarn: 'قطن 100% طبيعي مكرامي', hook: '4.5 مم', yarnBalls: 2, time: '3 ساعات',
    description: 'حقيبة شبكية متينة تتمدد لتتسع لكثير من الأغراض وتطوى لتوضع في الجيب.',
    steps: [
      { text: 'قاعدة صغيرة دائرية 8 غرز حشو ثم التوسع لـ 32 غرزة.', svg: 'magicRing' },
      { text: 'الشغل بقناطر سلاسل [5 سلاسل، 1 حشو] لإنشاء الفتحات المتمددة.', svg: 'chainStitch' },
      { text: 'الارتفاع لـ 30 سم وإغلاق الحافة العلوية بصفوف حشو متينة مع اليدين.', svg: 'singleCrochet' },
    ]
  },
  {
    id: 'beanie-hat', 
    title: 'قبعة بيني شتوية مضلعة', 
    category: 'wearable', 
    emoji: '🧢',
    level: 'مبتدئ', levelColor: '#16a34a', 
    yarn: 'صوف شتوي دافئ وسميك', hook: '5.5 مم', yarnBalls: 1, time: '2-3 ساعات',
    description: 'بيني كلاسيكي مضلع يدفئ الرأس في الشتاء القارس وسريع التنفيذ جداً.',
    steps: [
      { text: 'سلسلة بطول ارتفاع القبعة (حوالي 45 غرزة).', svg: 'chainStitch' },
      { text: 'حياكة غرز نصف عمود في الحلقة الخلفية فقط (BLO) ذهاباً وإياباً.', svg: 'rowWork' },
      { text: 'الاستمرار حتى الوصول لمحيط الرأس ثم خياطة الجانبين وزم القمة وإضافة بومبون.', svg: 'yarnTail' },
    ]
  },
  {
    id: 'socks-warm', 
    title: 'جوارب منزلية ناعمة', 
    category: 'wearable', 
    emoji: '🧦',
    level: 'متوسط', levelColor: '#d97706', 
    yarn: 'صوف مخلوط قطن مخصص للجوارب', hook: '3.5 مم', yarnBalls: 2, time: '4-5 ساعات',
    description: 'جوارب صوفية مريحة تحافظ على دفء قدميك أثناء الليالي الباردة.',
    steps: [
      { text: 'البدء من مقدمة أصابع القدم بدائرة سحرية والزيادة لـ 30 غرزة.', svg: 'magicRing' },
      { text: 'أدوار حشو مستوية بطول كف القدم.', svg: 'rowWork' },
      { text: 'تشكيل الكعب المنحني بغرز قصيرة ثم الصعود للساق وتأطير مطاطي.', svg: 'decrease' },
    ]
  },
  {
    id: 'headband', 
    title: 'عصابة رأس تويست عريضة', 
    category: 'wearable', 
    emoji: '💜',
    level: 'مبتدئ', levelColor: '#16a34a', 
    yarn: 'صوف ناعم مخملي أو صوف كلاسيك', hook: '5 مم', yarnBalls: 1, time: '1-2 ساعة',
    description: 'باندة شعر شتوية مع لفة تويست أنيقة في المنتصف وسهلة الإنجاز في جلسة واحدة.',
    steps: [
      { text: 'سلسلة 18 غرزة والشغل بغرزة نصف العمود ذهاباً وإياباً.', svg: 'rowWork' },
      { text: 'الوصول لطول 50 سم ثم طي الطرفين بشكل شطيرة متداخلة وخياطتهما للحصول على حركة التويست.', svg: 'assembly' },
    ]
  },
  {
    id: 'baby-shoes', 
    title: 'حذاء بيبي كروشيه للمواليد', 
    category: 'kids', 
    emoji: '👟',
    level: 'متوسط', levelColor: '#d97706', 
    yarn: 'قطن ناعم مخصص لحديثي الولادة', hook: '3 مم', yarnBalls: 1, time: '2-3 ساعات',
    description: 'لكلوك أطفال كيوت وناعم جداً على بشرة الرضيع بتصميم عصري.',
    steps: [
      { text: 'سلسلة 11 غرزة وحياكة نعل بيضاوي بغرز النصف عمود والزيادة بالطرفين.', svg: 'chainStitch' },
      { text: 'دور حشو في الحلقة الخلفية لتحديد حافة النعل وصعود الجدران.', svg: 'rowWork' },
      { text: 'تناقص مركز عند مقدمة الحذاء لإعطاء شكل اللكلوك ثم صنع شريط التثبيت بزر صغير.', svg: 'decrease' },
    ]
  },
  {
    id: 'baby-blanket', 
    title: 'بطانية أطفال غرزة الوافل', 
    category: 'kids', 
    emoji: '🍼',
    level: 'مبتدئ', levelColor: '#16a34a', 
    yarn: 'صوف أطفال فائق النعومة ضد الحساسية', hook: '4.5 مم', yarnBalls: 5, time: '12-15 ساعة',
    description: 'بطانية مريحة ودافئة بنقشة الوافل ثلاثية الأبعاد الفاخرة.',
    steps: [
      { text: 'سلسلة بداية بعرض 90 سم (مضاعفات الرقم 3).', svg: 'chainStitch' },
      { text: 'سطر عمود بلفة تأسيسي.', svg: 'doubleCrochet' },
      { text: 'تبادل الأعمدة الأمامية مع الأعمدة العادية لخلق مربعات الوافل المجسمة.', svg: 'doubleCrochet' },
      { text: 'تأطير الحواف بإطار ناعم من غرز الحشو المزدوجة.', svg: 'yarnTail' },
    ]
  },
  {
    id: 'flower-sunflower', 
    title: 'زهرة عباد الشمس المجسمة', 
    category: 'flower', 
    emoji: '🌻',
    level: 'مبتدئ', levelColor: '#16a34a', 
    yarn: 'قطن أصفر ذهبي وبني غامق', hook: '3 مم', yarnBalls: 1, time: '40 دقيقة',
    description: 'زهرة عباد شمس زاهية يمكن تثبيتها على الحقائب أو الملابس أو ككوستر للأكواب.',
    steps: [
      { text: 'بالبني: دائرة سحرية مع 6 حشو ثم التوسع لـ 24 غرزة لقرص الزهرة.', svg: 'magicRing' },
      { text: 'بالأصفر: حياكة البتلات [سلسلة 3، 2 عمود ثلاثي، بيكو، منزلقة] حول المحيط كاملاً.', svg: 'doubleCrochet' },
    ]
  },
  {
    id: 'flower-rose', 
    title: 'وردة جورية ثلاثية الأبعاد', 
    category: 'flower', 
    emoji: '🌹',
    level: 'مبتدئ', levelColor: '#16a34a', 
    yarn: 'قطن أحمر قاني وأخضر للأوراق', hook: '3 مم', yarnBalls: 1, time: '30 دقيقة',
    description: 'وردة جورية حلزونية تبدو وكأنها حقيقية تضفي لمسة رومانسية فاخرة.',
    steps: [
      { text: 'سلسلة 35 غرزة والشغل في كل غرزة صدفة بتلات متدرجة الطول.', svg: 'chainStitch' },
      { text: 'لف الشريط المحبوك حلزونياً على شكل طبقات الورد وتثبيته بخياطة خلفية محكمة.', svg: 'assembly' },
    ]
  },
  {
    id: 'cushion-cover', 
    title: 'غطاء وسادة بوهو مزخرف', 
    category: 'home', 
    emoji: '🛋️',
    level: 'متوسط', levelColor: '#d97706', 
    yarn: 'خيوط كوتون جولد ألوان ترابية', hook: '4 مم', yarnBalls: 4, time: '8-10 ساعات',
    description: 'كفر مخدة كروشيه يمنح غرفة المعيشة دفئاً وأناقة عصرية مريحة.',
    steps: [
      { text: 'صنع 9 مربعات جراني كبيرة مقاس 15×15 سم.', svg: 'granny' },
      { text: 'تجميع المربعات في شبكة 3×3 وخياطة الظهر وتركيب أزرار خشبية أنيقة.', svg: 'assembly' },
    ]
  },
  {
    id: 'advanced-sweater', 
    title: 'سويتر كروشيه كلاسيكي أنيق', 
    category: 'advanced', 
    emoji: '🧥',
    level: 'متقدم', levelColor: '#dc2626', 
    yarn: 'صوف ناعم ميرينو ممتاز مقاس M', hook: '5 مم', yarnBalls: 8, time: '25-30 ساعة',
    description: 'كنزة كروشيه فاخرة ومحبوكة بإتقان للأيام الباردة بتصميم كلاسيكي مريح.',
    steps: [
      { text: 'حياكة الظهر من الأسفل للأعلى مع تدريج فتحة الرقبة والأكتاف.', svg: 'rowWork' },
      { text: 'حياكة الصدر بفتحة ياقة مستديرة متناسقة.', svg: 'rowWork' },
      { text: 'حياكة الأكمام دائرياً مع زيادة تدريجية وتجميع السويتر بالكامل.', svg: 'assembly' },
    ]
  },
  {
    id: 'advanced-mandala-wall', 
    title: 'مانديلا حائطية عملاقة داخل طارة', 
    category: 'advanced', 
    emoji: '🎨',
    level: 'متقدم', levelColor: '#dc2626', 
    yarn: 'خيوط قطن متعددة الألوان قطعتين', hook: '2.5 مم', yarnBalls: 4, time: '18-20 ساعة',
    description: 'لوحة فنية جدارية معلقة داخل إطار خشبي دائري بقطر 50 سم.',
    steps: [
      { text: 'البداية بالنجمة المركزية والتوسع عبر 25 دوراً معقداً من الغرز المتبادلة.', svg: 'magicRing' },
      { text: 'شد المانديلا بإحكام على الطارة الخشبية وربطها بغرز متساوية للتعليق الفخم.', svg: 'yarnTail' },
    ]
  }
];

const CATEGORIES = [
  { id: 'all', label: 'الكل', emoji: '🎀' },
  { id: 'amigurumi', label: 'أميغورومي دمى', emoji: '🐻' },
  { id: 'shawl', label: 'شالات وسكارفات', emoji: '🌸' },
  { id: 'home', label: 'ديكور ومفارش', emoji: '🏡' },
  { id: 'bag', label: 'حقائب وشنط', emoji: '👜' },
  { id: 'wearable', label: 'ملابس وقبعات', emoji: '🧢' },
  { id: 'kids', label: 'أطفال ومواليد', emoji: '🍼' },
  { id: 'flower', label: 'زهور ونباتات', emoji: '🌻' },
  { id: 'advanced', label: 'مشاريع احترافية', emoji: '🎨' },
];

const YARN_CALC = {
  'ami-small': { label: 'دمية صغيرة (10-15 سم)', yarn: '50-80 غرام', balls: '1 شلة صغيرة (50غ)', hook: '2.0 - 2.5 مم', note: 'خيط قطن جينز أو كوتون جولد يعطي نتائج مثالية ومحكمة' },
  'ami-medium': { label: 'دمية متوسطة (20-30 سم)', yarn: '120-180 غرام', balls: '2 شلة (100غ)', hook: '2.5 - 3.0 مم', note: 'احرصي على مضاعفة كمية فايبر الحشو لتكون الدمية مشدودة' },
  'ami-large': { label: 'دمية كبيرة (35+ سم)', yarn: '250-350 غرام', balls: '3-4 شلات', hook: '3.5 مم', note: 'استخدمي عيون أمان مقاس 12-14 مم لتتناسب مع حجم الرأس' },
  'beanie': { label: 'طاقية بيني شتوية للكبار', yarn: '90-120 غرام', balls: '1 شلة صوف كبيرة (100غ)', hook: '5.0 - 6.0 مم', note: 'اختاري صوفاً مع نسبة أكريليك لسهولة الغسيل وعدم الحساسية' },
  'socks': { label: 'جوارب صوفية منزلية', yarn: '100-140 غرام', balls: '1-2 شلة', hook: '3.0 - 3.5 مم', note: 'خيوط الجوارب المخلوطة بالبولي أميد تدوم لسنوات ولا تتآكل' },
  'shawl-s': { label: 'شال صغير / كوفية رقبة', yarn: '180-250 غرام', balls: '2-3 شلات', hook: '4.0 مم', note: 'خيوط الموهير أو الألبكة تعطي دفئاً مضاعفاً مع وزن ريشة' },
  'shawl-l': { label: 'شال مثلثي كبير بوهو', yarn: '400-550 غرام', balls: '4-5 شلات (أو شلتين كيك)', hook: '4.5 - 5.0 مم', note: 'الشغل بسنارة أوسع بنصف نمرة يجعل الشال انسيابياً جداً' },
  'sweater-s': { label: 'سويتر نسائي مقاس S/M', yarn: '500-650 غرام', balls: '5-7 شلات', hook: '5.0 - 5.5 مم', note: 'اصنعي عينة مربعة 10×10 سم أولاً لقياس شد الخيط الدقيق' },
  'sweater-xl': { label: 'سويتر مقاس واسع L/XL', yarn: '800-1000 غرام', balls: '8-10 شلات', hook: '5.5 - 6.0 مم', note: 'احسبي حساب 10% إضافية من الخيط للأساور وحواف الياقة' },
  'bag-small': { label: 'شنطة يد صغيرة كروس', yarn: '150-200 غرام', balls: '2 شلة قطن أو رافيا', hook: '3.5 - 4.0 مم', note: 'يمكن تدعيم القاعدة بشبك بلاستيكي داخلي لتحافظ على ثباتها' },
  'bag-large': { label: 'حقيبة تسوق أو شاطئ كبيرة', yarn: '350-450 غرام', balls: '3-4 شلات', hook: '4.5 - 5.0 مم', note: 'خيط المكرمية القطني الرفيع أو الكوردون هو الأقوى للحقائب' },
  'basket': { label: 'سلة كروشيه لتنظيم الأغراض', yarn: '300-500 غرام', balls: 'بكرة خيط كليم أو خيش', hook: '6.5 - 8.0 مم', note: 'استخدمي غرزة السنبلة (Knit Stitch) لجدران صلبة لا تنثني' },
  'blanket-baby': { label: 'بطانية أطفال ناعمة (80×100 سم)', yarn: '350-450 غرام', balls: '4-5 شلات قطن مخصص للرضع', hook: '4.0 - 4.5 مم', note: 'ابتعدي عن الصوف الذي يفرز وبراً لحماية تنفس الطفل' },
  'blanket-adult': { label: 'بطانية كبار شتوية (130×160 سم)', yarn: '900-1300 غرام', balls: '9-13 شلة صوف متوسط', hook: '5.5 - 6.5 مم', note: 'مشروع ممتع وطويل رائع لأمسيات الشتاء الهادئة' },
  'mandala-small': { label: 'مفرش مانديلا للطاولة (30 سم)', yarn: '60-90 غرام', balls: '1 شلة خيط قطن رفيع', hook: '2.0 - 2.5 مم', note: 'الفرد بالبخار والتثبيت بالدبابيس يبرز روعة الزخرفة' },
  'mandala-large': { label: 'مانديلا حائطية كبيرة (60+ سم)', yarn: '250-350 غرام', balls: '3 شلات ألوان متبادلة', hook: '2.5 - 3.0 مم', note: 'شدي القطعة جيداً على طارة الخيزران قبل حياكة الإغلاق' },
};
