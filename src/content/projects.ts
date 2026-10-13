/**
 * Project catalogue — the single source of truth for all portfolio content.
 *
 * ── EDITING GUIDE ──────────────────────────────────────────────────────────
 * • ADD A PROJECT: append an entry to `allProjects`. Give it a unique slug,
 *   bilingual `summary` + `description`, categories, technologies, and set
 *   `published: true` when it is ready to appear on the site.
 * • EDIT CONTENT: every text field is bilingual ({ en, ar }). Keep the two
 *   languages in sync.
 * • FEATURE A PROJECT: set `featured: true` (keep at most 4–6 featured).
 * • HIDE A PROJECT: set `published: false` — it stays in the source but is
 *   excluded from every public view and from the sitemap.
 * • LINKS: only absolute https URLs. If a link is missing, keep it `null` —
 *   the UI hides missing links instead of rendering broken buttons.
 * • OPTIONAL SECTIONS: `problem`, `solution`, `contribution`, `architecture`,
 *   `challenges`, `outcomes`, `nextSteps` are optional. Omit them (or leave
 *   undefined) when the information is not verified — the detail page skips
 *   them silently.
 * • NEVER publish invented metrics, deployment claims, or client outcomes.
 * ──────────────────────────────────────────────────────────────────────────
 */

export type ProjectCategoryId =
  | "web-apps"
  | "mobile-apps"
  | "saas"
  | "business-systems"
  | "ai-automation"
  | "developer-tools"
  | "bots"
  | "open-source";

export type ProjectStatus =
  | "active"
  | "in-progress"
  | "prototype"
  | "complete"
  | "published"
  | "archived";

/** Deep, muted cover tones used by the typographic project covers. */
export type AccentKey =
  | "forest"
  | "charcoal"
  | "bronze"
  | "teal"
  | "wine"
  | "moss"
  | "amber";

export interface LocalizedText {
  en: string;
  ar: string;
}

export interface Challenge {
  title: LocalizedText;
  detail: LocalizedText;
}

export interface Project {
  id: string;
  slug: string;
  /** Proper noun — never translated. */
  name: string;
  /** Sort weight on the homepage and directory (lower = first). */
  order: number;
  featured: boolean;
  published: boolean;
  summary: LocalizedText;
  description: LocalizedText;
  categories: ProjectCategoryId[];
  technologies: string[];
  status: ProjectStatus;
  problem?: LocalizedText;
  solution?: LocalizedText;
  contribution?: LocalizedText;
  architecture?: LocalizedText[];
  challenges?: Challenge[];
  /** Verified outcomes only — never invented. */
  outcomes?: LocalizedText[];
  nextSteps?: LocalizedText[];
  repositoryUrl: string | null;
  liveUrl: string | null;
  npmUrl?: string | null;
  /** Latest published package version (verified against the npm registry). */
  version?: string | null;
  accent: AccentKey;
  /** Last known repository activity (evidence date, not a launch claim). */
  lastActivity?: string;
}

/** Maps a category id to its label key inside the i18n `categories` group. */
export const categoryLabelKey: Record<ProjectCategoryId, string> = {
  "web-apps": "webApps",
  "mobile-apps": "mobileApps",
  saas: "saas",
  "business-systems": "businessSystems",
  "ai-automation": "aiAutomation",
  "developer-tools": "developerTools",
  bots: "bots",
  "open-source": "openSource",
};

/** Maps a status value to its label key inside the i18n `status` group. */
export const statusLabelKey: Record<ProjectStatus, string> = {
  active: "active",
  "in-progress": "inProgress",
  prototype: "prototype",
  complete: "complete",
  published: "published",
  archived: "archived",
};

export const allProjects: Project[] = [
  {
    id: "cafepos",
    slug: "cafepos",
    name: "CafePOS",
    order: 1,
    featured: true,
    published: true,
    summary: {
      en: "A cloud point-of-sale system for cafes and restaurants — Arabic-first, multi-branch, with thermal receipt printing and live sales reporting.",
      ar: "نظام نقاط بيع سحابي للمقاهي والمطاعم — عربي أولاً، متعدد الفروع، مع طباعة إيصالات حرارية وتقارير مبيعات مباشرة.",
    },
    description: {
      en: "CafePOS is a complete restaurant POS platform delivered as one web system: a fast, touch-friendly sales screen with instant product search and category filters, an interactive cart with discounts and automatic tax calculation, cash and card payment flows, thermal receipt printing, product and category management, invoicing, multi-branch operations, user roles and permissions, an activity log, and a reporting dashboard with interactive charts. The entire interface is designed Arabic-first for daily use by cashiers and managers.",
      ar: "CafePOS منصة نقاط بيع متكاملة للمطاعم تُقدَّم كنظام ويب واحد: شاشة بيع سريعة تعمل باللمس مع بحث فوري عن المنتجات وتصفية حسب التصنيف، وسلة تفاعلية تدعم الخصومات وحساب الضريبة تلقائياً، ومسارات دفع نقدي وبالبطاقة، وطباعة إيصالات حرارية، وإدارة المنتجات والتصنيفات والفواتير، وتشغيل متعدد الفروع، وأدوار مستخدمين وصلاحيات، وسجل عمليات، ولوحة تقارير بمخططات تفاعلية. الواجهة كلها مصممة عربياً أولاً للاستخدام اليومي من الكاشيرين والمديرين.",
    },
    categories: ["business-systems", "web-apps"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma ORM", "SQLite", "shadcn/ui"],
    status: "active",
    problem: {
      en: "Small restaurants and cafes typically run their daily sales on generic POS software that is not built for Arabic-first workflows, multi-branch ownership, or the way staff actually move through an order during rush hours. Managers end up stitching together the POS, spreadsheets, and messaging apps just to answer basic questions like what sold today and how each branch is performing.",
      ar: "تعمل المطاعم والمقاهي الصغيرة عادةً على برمجيات نقاط بيع عامة لم تُبنَ لمسارات العمل العربية، ولا لتشغيل فروع متعددة، ولا لطريقة تحرك الموظفين فعلياً داخل الطلب في ساعات الذروة. فينتهي المديرون بالجمع بين نظام البيع وجداول البيانات وتطبيقات المراسلة لمجرد الإجابة عن أسئلة أساسية: ماذا بيع اليوم؟ وكيف يؤدي كل فرع؟",
    },
    solution: {
      en: "A single cloud system that covers the full day-to-day loop: the cashier gets a touch-optimized screen with instant search, category filters, discounts, automatic tax, and receipt printing; managers get product, category, invoice, branch, and user management with role-based permissions; and owners get daily, weekly, and monthly sales reports, top-product rankings, and cashier performance — all in one Arabic interface with keyboard shortcuts for power users.",
      ar: "نظام سحابي واحد يغطي حلقة العمل اليومية كاملة: يحصل الكاشير على شاشة محسّنة للمس مع بحث فوري وتصفية بالتصنيف وخصومات وحساب ضريبة تلقائي وطباعة إيصالات؛ ويحصل المديرون على إدارة المنتجات والتصنيفات والفواتير والفروع والمستخدمين بصلاحيات قائمة على الأدوار؛ ويحصل أصحاب العمل على تقارير مبيعات يومية وأسبوعية وشهرية، وترتيب المنتجات الأكثر بيعاً، وأداء الكاشيرين — كل ذلك في واجهة عربية واحدة مع اختصارات لوحة مفاتيح للمستخدمين المتقدمين.",
    },
    contribution: {
      en: "Designed and built the entire system end-to-end: the data model, the POS screen, the management dashboards, branch and permission structures, and the accompanying Arabic system guide, deployment guide, and seeded demo data.",
      ar: "صممت وبنيت النظام كاملاً من البداية إلى النهاية: نموذج البيانات، وشاشة نقاط البيع، ولوحات الإدارة، وهياكل الفروع والصلاحيات، إضافة إلى دليل النظام العربي ودليل النشر وبيانات تجريبية جاهزة.",
    },
    architecture: [
      {
        en: "Next.js with the App Router and strict TypeScript — one codebase for the POS UI, management dashboards, and API layer.",
        ar: "Next.js مع App Router وTypeScript صارم — قاعدة كود واحدة لواجهة نقاط البيع ولوحات الإدارة وطبقة الـ API.",
      },
      {
        en: "Prisma ORM over SQLite for a portable, low-configuration deployment that still models products, invoices, branches, and users relationally.",
        ar: "Prisma ORM فوق SQLite لنشر محمول قليل الإعداد يظل مع ذلك ينمذج المنتجات والفواتير والفروع والمستخدمين علائقياً.",
      },
      {
        en: "Tailwind CSS and shadcn/ui for a consistent, touch-friendly RTL interface built from accessible primitives.",
        ar: "Tailwind CSS وshadcn/ui لواجهة RTL متسقة تعمل باللمس ومبنية من مكونات أساسية مهيّأة لسهولة الوصول.",
      },
      {
        en: "Role-based user structure with per-branch scoping, plus an activity log for traceability of sensitive operations.",
        ar: "هيكل مستخدمين قائم على الأدوار مع نطاق لكل فرع، وسجل عمليات لتتبع الإجراءات الحساسة.",
      },
    ],
    challenges: [
      {
        title: { en: "Cashier speed during rush hours", ar: "سرعة الكاشير في ساعات الذروة" },
        detail: {
          en: "The sales screen was designed around touch targets, instant search, and category filtering so a cashier can build an order in seconds without a mouse, and discounts and tax are computed automatically to remove manual arithmetic from the counter.",
          ar: "صُممت شاشة البيع حول عناصر لمس كبيرة وبحث فوري وتصفية بالتصنيف حتى يبني الكاشير الطلب في ثوانٍ دون فأرة، مع حساب الخصومات والضريبة تلقائياً لإخراج الحساب اليدوي من الكاونتر.",
        },
      },
      {
        title: { en: "Arabic-first RTL operations", ar: "تشغيل عربي أولاً باتجاه RTL" },
        detail: {
          en: "Every screen — POS, dashboards, reports, and settings — was built for RTL from the start rather than translated afterwards, including thermal receipt output formatted for Arabic.",
          ar: "بُنيت كل شاشة — نقاط البيع ولوحات التحكم والتقارير والإعدادات — لاتجاه RTL من البداية لا أن تُترجم لاحقاً، بما في ذلك إخراج الإيصال الحراري المنسّق للعربية.",
        },
      },
      {
        title: { en: "Multi-branch data isolation", ar: "عزل بيانات الفروع المتعددة" },
        detail: {
          en: "Branch management and user permissions keep each location's products, invoices, and reports scoped correctly while still giving ownership a consolidated view across branches.",
          ar: "تضمن إدارة الفروع وصلاحيات المستخدمين عزل منتجات كل موقع وفواتيره وتقاريره بشكل صحيح، مع إبقاء عرض موحّد لأصحاب العمل عبر الفروع.",
        },
      },
    ],
    outcomes: [
      {
        en: "Delivered as a full working system with a complete Arabic system guide, deployment guide, and seeded demo data for evaluation.",
        ar: "سُلِّم كنظام عامل متكامل مع دليل نظام عربي كامل ودليل نشر وبيانات تجريبية للتقييم.",
      },
    ],
    nextSteps: [
      {
        en: "Online ordering integration to connect the POS with customer-facing channels.",
        ar: "تكامل الطلب الإلكتروني لربط نقاط البيع بقنوات مواجهة العملاء.",
      },
      {
        en: "Deeper cross-branch analytics and exportable reports for owners.",
        ar: "تحليلات أعمق عبر الفروع وتقارير قابلة للتصدير لأصحاب الأعمال.",
      },
    ],
    repositoryUrl: "https://github.com/YounisDany/cafe_pos",
    liveUrl: null,
    accent: "forest",
    lastActivity: "2026-06-28",
  },
  {
    id: "masar",
    slug: "masar",
    name: "Masar · مسار",
    order: 2,
    featured: true,
    published: true,
    summary: {
      en: "An Arabic-first smart travel planning platform that generates complete trip plans — hotels, restaurants, activities, and transport — with AI, across 14+ countries and 60+ cities.",
      ar: "منصة تخطيط سفر ذكية عربية أولاً، تولّد خطط رحلات متكاملة — فنادق ومطاعم وأنشطة ومواصلات — بالذكاء الاصطناعي، عبر أكثر من 14 دولة و60 مدينة.",
    },
    description: {
      en: "Masar is a full travel-planning product built for Arabic-speaking travelers. Users describe their budget, trip length, and travel style, and the platform generates a day-by-day plan covering hotels, restaurants, activities, and transportation. Around that core, Masar adds destination exploration for 14+ countries and 60+ cities with per-city details, a trip cart with budget comparison, and local accounts that keep booking history on the device.",
      ar: "مسار منتج تخطيط سفر متكامل بُني للمسافرين العرب. يصف المستخدم ميزانيته ومدة رحلته ونمط سفره، فتولّد المنصة خطة يوم بيوم تغطي الفنادق والمطاعم والأنشطة والمواصلات. وحول هذا الجوهر، يضيف مسار استكشاف وجهات لأكثر من 14 دولة و60 مدينة بتفاصيل لكل مدينة، وسلة رحلة مع مقارنة بالميزانية، وحسابات محلية تحفظ سجل الحجوزات على الجهاز.",
    },
    categories: ["web-apps", "ai-automation"],
    technologies: ["Next.js", "TypeScript", "Zustand", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
    status: "active",
    problem: {
      en: "Planning a multi-day trip in Arabic usually means stitching together information from booking sites, blogs, and maps that were never designed to work together, then re-typing everything into notes. There was no end-to-end Arabic experience that turns a budget and a few preferences into an actionable plan.",
      ar: "تخطيط رحلة متعددة الأيام بالعربية يعني عادةً تجميع معلومات من مواقع حجز ومدونات وخرائط لم تُصمم لتعمل معاً، ثم إعادة كتابة كل شيء في الملاحظات. لم تكن هناك تجربة عربية متكاملة تحوّل ميزانية وبعض التفضيلات إلى خطة قابلة للتنفيذ.",
    },
    solution: {
      en: "Masar turns preferences into a structured plan: an AI generation flow produces daily suggestions for stays, food, activities, and transport; a trip cart lets travelers collect items, adjust quantities, and compare the running total against their budget; and a local account system keeps bookings and history persisted in the browser — no backend account required.",
      ar: "يحوّل مسار التفضيلات إلى خطة منظمة: مسار توليد بالذكاء الاصطناعي ينتج اقتراحات يومية للإقامة والطعام والأنشطة والمواصلات؛ وسلة الرحلة تتيح للمسافر جمع العناصر وتعديل الكميات ومقارنة الإجمالي المتجدد بميزانيته؛ ونظام حسابات محلي يحفظ الحجوزات والسجل في المتصفح — دون حاجة إلى حساب على خادم.",
    },
    contribution: {
      en: "Built the entire platform: the AI plan-generation flow, destination and city-detail pages, the cart and budget system, local authentication, and the full RTL design system.",
      ar: "بنيت المنصة كاملة: مسار توليد الخطط بالذكاء الاصطناعي، وصفحات الوجهات وتفاصيل المدن، ونظام السلة والميزانية، والمصادقة المحلية، ونظام التصميم RTL الكامل.",
    },
    architecture: [
      {
        en: "AI trip generation through a dedicated Next.js API route, keeping the model integration server-side and the client bundle light.",
        ar: "توليد الخطط بالذكاء الاصطناعي عبر مسار API مخصص في Next.js، بما يبقي تكامل النموذج على الخادم وحزمة العميل خفيفة.",
      },
      {
        en: "Zustand with localStorage persistence for the trip cart and accounts — data survives reloads without a backend database.",
        ar: "Zustand مع حفظ في localStorage لسلة الرحلة والحسابات — تنجو البيانات من إعادة التحميل دون قاعدة بيانات خلفية.",
      },
      {
        en: "RTL-first layout and Arabic typography (Tajawal) designed from the first component, not bolted on at the end.",
        ar: "تخطيط RTL أولاً وخطوط عربية (Tajawal) مصممة منذ أول مكوّن، لا مضافة في النهاية.",
      },
    ],
    challenges: [
      {
        title: { en: "Making AI output structured and useful", ar: "جعل مخرجات الذكاء الاصطناعي منظمة ومفيدة" },
        detail: {
          en: "The generation flow had to produce consistent, day-by-day plans rather than free-form text, so the prompt and response handling were shaped around a strict plan structure the UI could render directly.",
          ar: "كان على مسار التوليد إنتاج خطط يومية متسقة لا نصاً حراً، لذا صيغ التوجيه ومعالجة الاستجابة حول بنية خطة صارمة تستطيع الواجهة عرضها مباشرة.",
        },
      },
      {
        title: { en: "A cart that behaves like a budget", ar: "سلة تتصرف مثل ميزانية" },
        detail: {
          en: "Travel planning fails when costs are invisible, so the cart tracks a running total against the stated budget and updates as items are added, edited, or removed.",
          ar: "يفشل تخطيط السفر حين تكون التكاليف خفية، لذا تتابع السلة إجمالياً متجدداً مقابل الميزانية المعلنة ويتحدث مع كل إضافة أو تعديل أو حذف.",
        },
      },
    ],
    outcomes: [
      {
        en: "The platform ships with browsable details for 14+ countries and 60+ cities, including hotels, restaurants, and activities per city.",
        ar: "تأتي المنصة بتفاصيل قابلة للتصفح لأكثر من 14 دولة و60 مدينة، تشمل الفنادق والمطاعم والأنشطة لكل مدينة.",
      },
    ],
    nextSteps: [
      {
        en: "Syncing trip plans across devices with optional cloud accounts.",
        ar: "مزامنة خطط الرحلات عبر الأجهزة بحسابات سحابية اختيارية.",
      },
      {
        en: "Live pricing and availability integrations for hotels and transport.",
        ar: "تكاملات أسعار وتوافر مباشرة للفنادق والمواصلات.",
      },
    ],
    repositoryUrl: "https://github.com/YounisDany/Masar",
    liveUrl: null,
    accent: "bronze",
    lastActivity: "2026-04-12",
  },
  {
    id: "saudi-regions-widget",
    slug: "saudi-regions-widget",
    name: "Saudi Regions Widget",
    order: 3,
    featured: true,
    published: true,
    summary: {
      en: "An enhanced JavaScript library for selecting Saudi administrative regions — 13 regions, 4,500+ cities, and 3,700+ districts — with cascading selects, search, and RTL support, distributed via npm and CDN.",
      ar: "مكتبة JavaScript محسّنة لاختيار المناطق الإدارية السعودية — 13 منطقة وأكثر من 4500 مدينة وأكثر من 3700 حي — بقوائم مترابطة وبحث ودعم RTL، موزعة عبر npm وCDN.",
    },
    description: {
      en: "Saudi Regions Widget is an open-source library that solves a surprisingly stubborn problem: collecting a user's region, city, and district in Saudi Arabia with correct, complete data. Version 2.0 covers all 13 regions with thousands of cities and districts in both Arabic and English, renders cascading selects with one line of setup, includes built-in search and filtering, and ships as an npm package and as CDN bundles (jsDelivr, unpkg) that work with zero dependencies.",
      ar: "Saudi Regions Widget مكتبة مفتوحة المصدر تحل مشكلة مستعصية على نحو غير متوقع: جمع منطقة المستخدم ومدينته وحيه في السعودية ببيانات صحيحة وكاملة. يغطي الإصدار 2.0 جميع المناطق الـ13 بآلاف المدن والأحياء بالعربية والإنجليزية، ويعرض قوائم مترابطة بإعداد من سطر واحد، ويشمل بحثاً وتصفية مدمجين، ويُنشر كحزمة npm وحزم CDN (jsDelivr وunpkg) تعمل دون أي اعتماديات.",
    },
    categories: ["developer-tools", "open-source"],
    technologies: ["JavaScript", "npm", "jsDelivr CDN", "CSS"],
    status: "published",
    problem: {
      en: "Checkout forms and address collection in Saudi apps constantly reinvent the same dropdown — usually with incomplete or inconsistent region data. Developers need a drop-in widget with authoritative data, bilingual labels, and RTL behavior, not another hand-maintained list.",
      ar: "تعيد نماذج الشراء وجمع العناوين في التطبيقات السعودية اختراع القائمة المنسدلة نفسها مراراً — وغالباً ببيانات مناطق ناقصة أو غير متسقة. يحتاج المطوّرون مكوّناً جاهزاً ببيانات موثوقة وتسميات ثنائية اللغة وسلوك RTL، لا قائمة أخرى تُصان يدوياً.",
    },
    solution: {
      en: "A zero-dependency widget with a small API: one-line quick setup or a fully configurable instance with data levels (regions only, regions + cities, or complete), a `search()` API across all data, programmatic get/set of selections, change events per level, and customizable placeholders and CSS classes — in Arabic or English with RTL-aware rendering.",
      ar: "مكوّن دون اعتماديات بواجهة برمجية صغيرة: إعداد سريع بسطر واحد أو مثيل قابل للتهيئة الكاملة بمستويات بيانات (المناطق فقط، أو المناطق والمدن، أو الكامل)، وواجهة search() عبر جميع البيانات، وجلب وتعيين برمجي للاختيارات، وأحداث تغيير لكل مستوى، ونصوص وأصناف CSS قابلة للتخصيص — بالعربية أو الإنجليزية بعرض يدعم RTL.",
    },
    contribution: {
      en: "Authored the library end-to-end: the region/city/district dataset, the cascading widget engine, the search API, the CDN bundles, and the bilingual documentation.",
      ar: "ألّفت المكتبة من البداية إلى النهاية: مجموعة بيانات المناطق والمدن والأحياء، ومحرك المكوّن المترابط، وواجهة البحث، وحزم CDN، والتوثيق ثنائي اللغة.",
    },
    architecture: [
      {
        en: "Plain JavaScript with no runtime dependencies — a single script tag is enough on any stack, from static pages to React apps.",
        ar: "JavaScript خالص دون اعتماديات تشغيل — وسم script واحد يكفي على أي بنية، من الصفحات الثابتة إلى تطبيقات React.",
      },
      {
        en: "Data levels let developers load only what they need (regions / regions + cities / complete), keeping pages light.",
        ar: "تتيح مستويات البيانات للمطورين تحميل ما يحتاجونه فقط (مناطق / مناطق ومدن / الكامل)، فتبقى الصفحات خفيفة.",
      },
      {
        en: "Distributed three ways: npm install, jsDelivr, and unpkg — including a bundled JS + CSS file for one-tag setup.",
        ar: "توزيع بثلاث طرق: npm install وjsDelivr وunpkg — بما في ذلك ملف مدمج (JS + CSS) للإعداد بوسم واحد.",
      },
    ],
    outcomes: [
      {
        en: "Published on npm as version 2.0.0 and available on CDN networks, MIT-licensed, with full bilingual API documentation.",
        ar: "منشورة على npm بالإصدار 2.0.0 ومتاحة على شبكات CDN برخصة MIT، مع توثيق كامل ثنائي اللغة لواجهة البرمجة.",
      },
      {
        en: "Covers all 13 Saudi regions with 4,500+ cities and 3,700+ districts in Arabic and English.",
        ar: "تغطي جميع مناطق السعودية الـ13 بأكثر من 4500 مدينة وأكثر من 3700 حي بالعربية والإنجليزية.",
      },
    ],
    repositoryUrl: "https://github.com/YounisDany/saudi-regions-widget",
    liveUrl: null,
    npmUrl: "https://www.npmjs.com/package/saudi-regions-widget",
    version: "2.0.0",
    accent: "teal",
    lastActivity: "2026-01-23",
  },
  {
    id: "link-guard",
    slug: "link-guard",
    name: "LinkGuard",
    order: 4,
    featured: true,
    published: true,
    summary: {
      en: "An AI-powered security platform that detects suspicious links in real time using a hybrid engine — heuristic rules plus ML-style scoring — with detailed threat reports and site analysis.",
      ar: "منصة أمنية مدعومة بالذكاء الاصطناعي تكشف الروابط المشبوهة في الوقت الفعلي بمحرك هجين — قواعد استدلالية مع تقييم بأسلوب تعلم الآلة — مع تقارير تهديد مفصلة وتحليل للمواقع.",
    },
    description: {
      en: "LinkGuard scans URLs in real time and classifies them as phishing, malware, or fraudulent. The engine extracts 17+ features from every link, combines heuristic analysis with an ML-inspired scoring model, and returns a confidence-scored verdict with a full breakdown of why a link was flagged. Beyond single-URL scans, it performs deeper site analysis covering page content, security headers, and scripts.",
      ar: "يفحص LinkGuard عناوين URL في الوقت الفعلي ويصنّفها تصيّداً أو برمجيات خبيثة أو احتيالاً. يستخرج المحرك أكثر من 17 خاصية من كل رابط، ويدمج التحليل الاستدلالي مع نموذج تقييم مستوحى من تعلم الآلة، ويعيد حكماً بدرجة ثقة مع تفصيل كامل لأسباب وضع علامة على الرابط. وإلى جانب فحص الروابط المفردة، ينفّذ تحليلاً أعمق للموقع يغطي محتوى الصفحة وترويسات الأمان والسكربتات.",
    },
    categories: ["ai-automation", "web-apps"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma ORM", "SQLite", "Framer Motion"],
    status: "active",
    problem: {
      en: "Phishing and fraudulent links are usually detected only after damage is done. Rules-only tools miss new patterns; pure ML models flag legitimate business links too aggressively. Real usage needs both: high recall on genuinely malicious URLs and high precision so that normal links are not blocked.",
      ar: "تُكتشف روابط التصيد والاحتيال عادةً بعد وقوع الضرر فقط. الأدوات القائمة على القواعد وحدها تفوّت الأنماط الجديدة، ونماذج تعلم الآلة البحتة تضع علامات على روابط الأعمال المشروعة بعدوانية مفرطة. الاستخدام الحقيقي يحتاج الاثنين معاً: استرجاعاً عالياً للروابط الخبيثة فعلاً، ودقة عالية كي لا تُحجب الروابط الطبيعية.",
    },
    solution: {
      en: "A hybrid detection pipeline: 17+ extracted URL features feed a heuristic engine tuned for precision, backed by an ML-style scoring layer. Results arrive as confidence-scored classifications with detailed, human-readable explanations, and a site-analysis mode inspects content, security headers, and scripts for deeper verdicts.",
      ar: "مسار كشف هجين: أكثر من 17 خاصية مستخرجة من الرابط تغذي محركاً استدلالياً مضبوطاً للدقة، مدعوماً بطبقة تقييم بأسلوب تعلم الآلة. تصل النتائج كتصنيفات بدرجات ثقة مع شروح مفصلة مقروءة للبشر، ويفتح وضع تحليل الموقع محتوى الصفحة وترويسات الأمان والسكربتات لأحكام أعمق.",
    },
    contribution: {
      en: "Built the platform end-to-end: the feature-extraction pipeline, the hybrid scoring engine, the analysis and reporting UI, and the benchmark evaluation against standard classifiers.",
      ar: "بنيت المنصة من البداية إلى النهاية: مسار استخراج الخصائص، ومحرك التقييم الهجين، وواجهة التحليل والتقارير، وتقييم المعايير مقابل المصنّفات القياسية.",
    },
    architecture: [
      {
        en: "Hybrid engine design — heuristics first, ML-style scoring second — chosen deliberately to keep false positives low on legitimate business links.",
        ar: "تصميم محرك هجين — الاستدلال أولاً ثم التقييم بأسلوب تعلم الآلة — اختير عمداً لإبقاء الإيجابيات الزائفة منخفضة على روابط الأعمال المشروعة.",
      },
      {
        en: "17+ extracted features per URL power both the real-time verdict and the detailed report views.",
        ar: "أكثر من 17 خاصية مستخرجة لكل رابط تشغّل الحكم الفوري وواجهات التقارير المفصلة معاً.",
      },
      {
        en: "Next.js API routes keep scanning logic server-side; Prisma with SQLite persists scan history; Framer Motion adds restrained motion to the report experience.",
        ar: "مسارات API في Next.js تُبقي منطق الفحص على الخادم؛ وPrisma مع SQLite يحفظ سجل الفحوص؛ وFramer Motion يضيف حركة متزنة لتجربة التقرير.",
      },
    ],
    challenges: [
      {
        title: { en: "Precision versus recall", ar: "الدقة مقابل الاسترجاع" },
        detail: {
          en: "Blocking a legitimate link is often worse than missing a suspicious one in business contexts, so the hybrid engine was explicitly tuned for high precision (94.2% on the benchmark set) even at some cost to recall — a deliberate product decision.",
          ar: "حجب رابط مشروع غالباً أسوأ من تفويت رابط مشبوه في سياقات الأعمال، لذا ضُبط المحرك الهجين صراحةً لدقة عالية (94.2% على مجموعة المعايير) ولو على حساب بعض الاسترجاع — قرار منتج مقصود.",
        },
      },
      {
        title: { en: "Explaining the verdict", ar: "شرح الحكم" },
        detail: {
          en: "A score alone is not actionable, so every verdict ships with a breakdown of the features and rules that fired, giving users a reason — not just a number — to trust or distrust a link.",
          ar: "الدرجة وحدها لا تكفي لاتخاذ إجراء، لذا يأتي كل حكم مع تفصيل الخصائص والقواعد التي نُفِّذت، معطياً المستخدمين سبباً — لا رقماً فقط — للثقة بالرابط أو عدمه.",
        },
      },
    ],
    outcomes: [
      {
        en: "Benchmarked on a balanced dataset of 11,430 URLs (5,715 benign from Alexa top sites, 5,715 phishing from PhishTank and OpenPhish) with an 80/20 train-test split.",
        ar: "تم تقييمه على مجموعة بيانات متوازنة من 11,430 رابطاً (5,715 سليمة من مواقع Alexa الأكثر زيارة، و5,715 تصيدية من PhishTank وOpenPhish) بتقسيم 80/20 للتدريب والاختبار.",
      },
      {
        en: "The hybrid engine reached 94.2% precision and 91.5% accuracy, outperforming the tested SVM and Decision Tree baselines on precision.",
        ar: "بلغ المحرك الهجين دقة 94.2% واسترجاعاً إجمالياً 91.5%، متفوقاً على خطي الأساس SVM وشجرة القرار المختبرين في الدقة.",
      },
    ],
    nextSteps: [
      {
        en: "Browser-extension integration for real-time scanning while browsing.",
        ar: "تكامل إضافة متصفح للفحص الفعلي أثناء التصفح.",
      },
      {
        en: "Continuous retraining and evaluation against fresh phishing feeds.",
        ar: "إعادة تدريب وتقييم مستمرة مقابل تغذيات تصيد محدثة.",
      },
    ],
    repositoryUrl: "https://github.com/YounisDany/link-guard",
    liveUrl: null,
    accent: "charcoal",
    lastActivity: "2026-05-13",
  },
  {
    id: "gasflow",
    slug: "gasflow",
    name: "GasFlow",
    order: 5,
    featured: false,
    published: true,
    summary: {
      en: "A Flutter app for managing gas distribution across three roles — admin, agent, and citizen — with offline-first sync, barcode delivery scanning, and full Arabic/English support.",
      ar: "تطبيق Flutter لإدارة توزيع الغاز عبر ثلاثة أدوار — مدير ووكيل ومواطن — بمزامنة تعمل دون اتصال، ومسح باركود عند التسليم، ودعم كامل للعربية والإنجليزية.",
    },
    description: {
      en: "GasFlow is a Material 3 Flutter application for gas-distribution operations, connecting three distinct roles in one product. Admins approve agent requests and monitor statistics; agents approve citizen join requests, issue barcode IDs, accept or reject gas orders, and scan cylinder barcodes on delivery; citizens find nearby agents on a map preview, request gas, track their order through a timeline, and submit complaints. The app is wired to Firebase (Auth, Cloud Firestore, Cloud Messaging, Storage) and works offline-first with queued writes that sync on reconnect.",
      ar: "GasFlow تطبيق Flutter بتصميم Material 3 لعمليات توزيع الغاز، يربط ثلاثة أدوار مختلفة في منتج واحد. المديرون يعتمدون طلبات الوكلاء ويراقبون الإحصاءات؛ والوكلاء يعتمدون طلبات انضمام المواطنين ويصدرون معرفات باركود ويقبلون طلبات الغاز أو يرفضونها ويمسحون باركود الأسطوانات عند التسليم؛ والمواطنون يجدون أقرب الوكلاء على معاينة خريطة ويطلبون الغاز ويتابعون طلبهم عبر خط زمني ويرفعون شكاوى. التطبيق مرتبط بـ Firebase (المصادقة وCloud Firestore والمراسلة والتخزين) ويعمل دون اتصال أولاً مع عمليات كتابة متراكمة تتزامن عند إعادة الاتصال.",
    },
    categories: ["mobile-apps", "business-systems"],
    technologies: ["Flutter", "Dart", "Firebase", "Cloud Firestore", "Firebase Auth"],
    status: "active",
    problem: {
      en: "Gas distribution involves three parties with different needs — coordination, delivery verification, and order tracking — and it happens in real conditions with unstable connectivity. A form-only app would break the moment the network does.",
      ar: "توزيع الغاز يشمل ثلاثة أطراف باحتياجات مختلفة — تنسيق وتحقق من التسليم وتتبع للطلبات — ويحدث في ظروف واقعية بشبكة غير مستقرة. تطبيق نماذج فقط سينهار لحظة انهيار الشبكة.",
    },
    solution: {
      en: "A role-based Flutter product: each role gets its own dashboard and flows (approvals, barcode scanning, order timelines, complaints), backed by Firebase services and an offline-first data layer with an on-screen offline banner, so agents can keep working through dead zones and sync later. A bundled demo mode makes every screen usable immediately before any Firebase configuration.",
      ar: "منتج Flutter قائم على الأدوار: لكل دوره لوحته ومساراته (اعتمادات، مسح باركود، خطوط زمنية للطلبات، شكاوى)، مدعوماً بخدمات Firebase وطبقة بيانات تعمل دون اتصال أولاً مع شريط انقطاع على الشاشة، فيستطيع الوكلاء مواصلة العمل في المناطق الميتة والمزامنة لاحقاً. ووضع تجريبي مدمج يجعل كل شاشة قابلة للاستخدام فوراً قبل أي إعداد لـ Firebase.",
    },
    contribution: {
      en: "Built the complete application: role-based architecture, all admin, agent, and citizen screens, offline-first data handling, bilingual theming, and the Firebase setup guide.",
      ar: "بنيت التطبيق كاملاً: بنية الأدوار، وجميع شاشات المدير والوكيل والمواطن، ومعالجة البيانات دون اتصال، والتنسيق ثنائي اللغة، ودليل إعداد Firebase.",
    },
    architecture: [
      {
        en: "Firebase suite end-to-end: Auth for accounts, Firestore for data with local persistence and queued offline writes, Cloud Messaging for notifications, Storage for files.",
        ar: "حزمة Firebase من البداية للنهاية: Auth للحسابات، وFirestore للبيانات مع حفظ محلي وكتابات متراكمة دون اتصال، وCloud Messaging للإشعارات، وStorage للملفات.",
      },
      {
        en: "A clean presentation/data split — models, routes, themes, and reusable widgets (stat cards, status chips, order tiles, empty states) shared across all three roles.",
        ar: "فصل نظيف بين العرض والبيانات — نماذج ومسارات وسمات ومكونات قابلة لإعادة الاستخدام (بطاقات إحصاء، رقائق حالة، عناصر طلبات، حالات فراغ) تُشارك عبر الأدوار الثلاثة.",
      },
      {
        en: "Demo mode with bundled data so the full experience runs on-device before Firebase is configured — useful for demos, testing, and hand-off.",
        ar: "وضع تجريبي ببيانات مدمجة يجعل التجربة كاملة تعمل على الجهاز قبل إعداد Firebase — مفيد للعروض والاختبار والتسليم.",
      },
    ],
    challenges: [
      {
        title: { en: "Offline-first reality", ar: "واقع العمل دون اتصال" },
        detail: {
          en: "Deliveries happen where signal drops, so the data layer queues writes locally and syncs automatically on reconnect, with a visible offline banner so users always know the state they are working in.",
          ar: "تحدث التسليمات حيث ينقطع الإشارة، لذا تتراكم الكتابات محلياً في طبقة البيانات وتتزامن تلقائياً عند إعادة الاتصال، مع شريط انقطاع مرئي ليعرف المستخدمون دائماً الحالة التي يعملون فيها.",
        },
      },
      {
        title: { en: "Three products in one codebase", ar: "ثلاثة منتجات في قاعدة كود واحدة" },
        detail: {
          en: "Admin, agent, and citizen flows share models, widgets, and theming while keeping each role's screens focused, which keeps the app coherent despite very different user journeys.",
          ar: "تتشارك مسارات المدير والوكيل والمواطن النماذج والمكونات والسمات مع إبقاء شاشات كل دور مركزة، ما يحافظ على اتساق التطبيق رغم اختلاف رحلات المستخدمين اختلافاً كبيراً.",
        },
      },
    ],
    outcomes: [
      {
        en: "A complete, installable application with a documented 10-minute Firebase setup path and demo accounts for immediate on-device evaluation.",
        ar: "تطبيق متكامل قابل للتثبيت مع مسار إعداد Firebase موثق في 10 دقائق وحسابات تجريبية للتقييم الفوري على الجهاز.",
      },
    ],
    repositoryUrl: "https://github.com/YounisDany/gasflow-hadhramaut",
    liveUrl: null,
    accent: "forest",
    lastActivity: "2026-06-11",
  },
  {
    id: "yemen-regions-widget",
    slug: "yemen-regions-widget",
    name: "Yemen Regions Widget",
    order: 6,
    featured: false,
    published: true,
    summary: {
      en: "A JavaScript library for hierarchical selection of Yemeni administrative regions — governorate, district, uzlah, and village — with Arabic/English data, built-in search, and npm + CDN distribution.",
      ar: "مكتبة JavaScript لاختيار هرمي للمناطق الإدارية اليمنية — محافظة ومديرية وعزلة وقرية — ببيانات عربية/إنجليزية وبحث مدمج وتوزيع عبر npm وCDN.",
    },
    description: {
      en: "Yemen Regions Widget is a sibling library to the Saudi Regions Widget, covering Yemen's four-level administrative hierarchy: governorate, district, uzlah, and village. Developers choose exactly which levels to render, get automatically linked cascading selects, built-in search inside each dropdown, strict input validation, and full customization of placeholders and CSS classes. The library works in the browser, via ES modules, and in Node for data processing, and is published on npm with CDN builds.",
      ar: "Yemen Regions Widget مكتبة شقيقة لـ Saudi Regions Widget، تغطي الهيكل الإداري اليمني بأربعة مستويات: المحافظة والمديرية والعزلة والقرية. يختار المطوّرون بالضبط أي المستويات يعرضون، ويحصلون على قوائم مترابطة تتحدث تلقائياً، وبحث مدمج داخل كل قائمة، وتحققاً صارماً من المدخلات، وتخصيصاً كاملاً للنصوص وأصناف CSS. تعمل المكتبة في المتصفح وعبر وحدات ES وفي Node لمعالجة البيانات، ومنشورة على npm مع حزم CDN.",
    },
    categories: ["developer-tools", "open-source"],
    technologies: ["JavaScript", "npm", "jsDelivr CDN", "CSS"],
    status: "published",
    problem: {
      en: "Yemen's administrative structure is deeper than most country pickers support — four levels down to village — and almost no form library ships that data. Address collection for Yemeni users either stops at the governorate or requires manually maintained lists that drift out of date.",
      ar: "الهيكل الإداري اليمني أعمق مما تدعمه أغلب أدوات الاختيار — أربعة مستويات وصولاً إلى القرية — ولا تكاد أي مكتبة نماذج تقدم هذه البيانات. جمع العناوين للمستخدمين اليمنيين إما يتوقف عند المحافظة أو يتطلب قوائم تُصان يدوياً وتتقادم بمرور الوقت.",
    },
    solution: {
      en: "A configurable widget with a `levels` option (from governorate-only up to the full four-level chain), onChange and onComplete callbacks for form integration, search-enabled dropdowns, and bilingual data. The same package works as a script tag, an ES module import, or a Node dependency for server-side data work.",
      ar: "مكوّن قابل للتهيئة بخيار levels (من المحافظة فقط حتى السلسلة الرباعية الكاملة)، واستدعاءات onChange وonComplete لتكامل النماذج، وقوائم منسدلة ببحث مفعّل، وبيانات ثنائية اللغة. الحزمة نفسها تعمل كوسم script أو استيراد وحدة ES أو اعتمادية Node للعمل بالبيانات على الخادم.",
    },
    contribution: {
      en: "Authored the library: the four-level dataset, the configurable widget engine, the events API, and the npm/CDN distribution with bilingual documentation.",
      ar: "ألّفت المكتبة: مجموعة البيانات الرباعية المستويات، ومحرك المكوّن القابل للتهيئة، وواجهة الأحداث، والتوزيع عبر npm/CDN مع توثيق ثنائي اللغة.",
    },
    architecture: [
      {
        en: "Level-based configuration keeps the API honest: the chain must start at governorate, and every requested level below it links automatically.",
        ar: "التهيئة القائمة على المستويات تُبقي الواجهة صارمة: يجب أن تبدأ السلسلة بالمحافظة، وكل مستوى مطلوب تحتها يرتبط تلقائياً.",
      },
      {
        en: "Performance work addressed the large data file explicitly — documented in the README — so pages only pay for the levels they use.",
        ar: "عالج عمل الأداء مشكلة حجم ملف البيانات الكبير صراحةً — موثقة في README — فلا تدفع الصفحات إلا ثمن المستويات التي تستخدمها.",
      },
    ],
    outcomes: [
      {
        en: "Published on npm as version 1.0.0, MIT-licensed, with browser, ES module, and Node usage documented.",
        ar: "منشورة على npm بالإصدار 1.0.0 برخصة MIT، مع توثيق للاستخدام في المتصفح ووحدات ES وNode.",
      },
    ],
    repositoryUrl: "https://github.com/YounisDany/yemen-regions-widget",
    liveUrl: null,
    npmUrl: "https://www.npmjs.com/package/yemen-regions-widget",
    version: "1.0.0",
    accent: "amber",
    lastActivity: "2026-01-22",
  },
  {
    id: "lawyers-office",
    slug: "lawyers-office",
    name: "Lawyers Office Platform",
    order: 7,
    featured: false,
    published: true,
    summary: {
      en: "An integrated PHP + MySQL web platform for online law offices. The database, public pages, and authentication are complete; the lawyer dashboard, case management, and communication features are in active development.",
      ar: "منصة ويب متكاملة بـ PHP وMySQL لمكاتب المحاماة أونلاين. قاعدة البيانات والصفحات العامة والمصادقة مكتملة؛ ولوحة المحامي وإدارة القضايا وميزات التواصل قيد التطوير النشط.",
    },
    description: {
      en: "This platform is a full online presence for a law office: public-facing pages, a client area, and the foundations for case management. Development is deliberately tracked in the repository's task list: the database, interface pages, and login system are done, while the lawyer dashboard, case uploads, chat, email notifications, archive, and reports are next in line. It is published openly as work in progress — not disguised as a finished product.",
      ar: "هذه المنصة حضور إلكتروني متكامل لمكتب محاماة: صفحات مواجهة للجمهور، ومنطقة للعملاء، وأسس لإدارة القضايا. يُتابع التطوير عمداً في قائمة مهام المستودع: قاعدة البيانات وصفحات الواجهة ونظام تسجيل الدخول منجزة، بينما لوحة المحامي ورفع القضايا والدردشة وإشعارات البريد والأرشيف والتقارير هي التالية في الصف. تُنشر العلناً كعمل جارٍ — لا تتنكر كمنتج مكتمل.",
    },
    categories: ["web-apps", "business-systems"],
    technologies: ["PHP", "MySQL"],
    status: "in-progress",
    problem: {
      en: "Law offices manage clients, cases, and documents through scattered channels — phone calls, paper files, and personal messaging apps — with no shared system of record.",
      ar: "تدير مكاتب المحاماة عملاءها وقضاياها ومستنداتها عبر قنوات متناثرة — مكالمات هاتفية وملفات ورقية وتطبيقات مراسلة شخصية — دون نظام سجل مشترك.",
    },
    solution: {
      en: "A structured web platform that centralizes the office: a relational MySQL schema for the domain, public pages for presence, and an authentication layer already in place, with the operational features (dashboard, cases, chat, archive, reports) being built on that foundation.",
      ar: "منصة ويب منظمة تمركز المكتب: مخطط MySQL علائقي للمجال، وصفحات عامة للحضور، وطبقة مصادقة جاهزة فعلاً، مع بناء الميزات التشغيلية (اللوحة والقضايا والدردشة والأرشيف والتقارير) على هذا الأساس.",
    },
    contribution: {
      en: "Designed the database and built the platform's completed layers; ongoing work continues down the published task list.",
      ar: "صممت قاعدة البيانات وبنيت طبقات المنصة المنجزة؛ ويستمر العمل وفق قائمة المهام المنشورة.",
    },
    architecture: [
      {
        en: "PHP + MySQL classic stack chosen for dependable hosting on standard shared-server environments common for small firms.",
        ar: "بنية PHP + MySQL الكلاسيكية اختيرت لاستضافة موثوقة على بيئات الاستضافة المشتركة القياسية الشائعة للمكاتب الصغيرة.",
      },
    ],
    outcomes: [
      {
        en: "Database, interface pages, and the login system are complete and verifiable in the repository; remaining modules are publicly tracked.",
        ar: "قاعدة البيانات وصفحات الواجهة ونظام تسجيل الدخول مكتملة ويمكن التحقق منها في المستودع؛ والوحدات المتبقية متابعة علناً.",
      },
    ],
    nextSteps: [
      {
        en: "Lawyer dashboard, case uploads, chat, email notifications, archive, and reports — per the repository's task list.",
        ar: "لوحة المحامي ورفع القضايا والدردشة وإشعارات البريد والأرشيف والتقارير — وفق قائمة مهام المستودع.",
      },
    ],
    repositoryUrl: "https://github.com/YounisDany/multi-lawyers-office-v2",
    liveUrl: null,
    accent: "wine",
    lastActivity: "2026-01-10",
  },
  {
    id: "t3afi",
    slug: "t3afi",
    name: "T3afi · تعافي",
    order: 8,
    featured: false,
    published: true,
    summary: {
      en: "A web application concept for combating short-video addiction — helping people regain deliberate control over their scrolling.",
      ar: "تطبيق ويب لمكافحة إدمان المقاطع القصيرة — يساعد الناس على استعادة التحكم الواعي في التمرير.",
    },
    description: {
      en: "T3afi (تعافي, \"recovery\") is a web application aimed at people who want to break the habit of endless short-video scrolling. It is built as a Next.js application and is currently at the prototype stage; deeper documentation will be added as the product takes shape.",
      ar: "تعافي تطبيق ويب موجه لمن يريدون كسر عادة التمرير اللانهائي في المقاطع القصيرة. مبني كتطبيق Next.js ويقع حالياً في مرحلة النموذج الأولي؛ وسيُضاف توثيق أعمق كلما اتضحت ملامح المنتج.",
    },
    categories: ["web-apps"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    status: "prototype",
    repositoryUrl: "https://github.com/YounisDany/t3afi-app",
    liveUrl: null,
    accent: "wine",
    lastActivity: "2026-04-13",
  },
  {
    id: "trading-plan",
    slug: "trading-plan",
    name: "Trading Plan Website",
    order: 9,
    featured: false,
    published: true,
    summary: {
      en: "A professional front-end tool for building and documenting trading plans — strategy, risk rules, and discipline in one place.",
      ar: "أداة واجهة أمامية مهنية لبناء خطط التداول وتوثيقها — الاستراتيجية وقواعد المخاطرة والانضباط في مكان واحد.",
    },
    description: {
      en: "A focused JavaScript web tool for structuring professional trading plans: defining strategy, entry and exit rules, and risk parameters before any position is opened. Built with Vite for a fast, static-deployable experience.",
      ar: "أداة ويب بـ JavaScript مركزة على هيكلة خطط التداول المهنية: تحديد الاستراتيجية وقواعد الدخول والخروج ومعايير المخاطرة قبل فتح أي صفقة. مبنية بـ Vite لتجربة سريعة قابلة للنشر الثابت.",
    },
    categories: ["web-apps"],
    technologies: ["JavaScript", "Vite", "HTML", "CSS"],
    status: "complete",
    repositoryUrl: "https://github.com/YounisDany/trading-plan-website",
    liveUrl: null,
    accent: "charcoal",
    lastActivity: "2026-01-24",
  },
  {
    id: "rijal-almaa",
    slug: "rijal-almaa",
    name: "Rijal Almaa · رجال ألمع",
    order: 10,
    featured: false,
    published: true,
    summary: {
      en: "A heritage tourism website for the village of Rijal Almaa in Saudi Arabia, with a visitor entry system — built with pure HTML, CSS, and JavaScript.",
      ar: "موقع سياحي تراثي لقرية رجال ألمع في السعودية، مع نظام دخول للزوار — مبني بـ HTML وCSS وJavaScript خالصة.",
    },
    description: {
      en: "A cultural and heritage website presenting the village of Rijal Almaa — one of Saudi Arabia's most distinctive heritage destinations — with an image-driven presentation and a LocalStorage-based entry system for visitors, implemented entirely in vanilla HTML, CSS, and JavaScript without any framework.",
      ar: "موقع ثقافي وتراثي يقدّم قرية رجال ألمع — أحد أبرز الوجهات التراثية في السعودية — بعرض غني بالصور ونظام دخول للزوار عبر LocalStorage، منفذاً بالكامل بـ HTML وCSS وJavaScript دون أي إطار عمل.",
    },
    categories: ["web-apps"],
    technologies: ["HTML", "CSS", "JavaScript"],
    status: "complete",
    repositoryUrl: "https://github.com/YounisDany/rijal-almaa",
    liveUrl: null,
    accent: "bronze",
    lastActivity: "2026-06-10",
  },
  {
    id: "menuee",
    slug: "menuee",
    name: "Menuee",
    order: 11,
    featured: false,
    published: true,
    summary: {
      en: "A lightweight digital-menu viewer that renders PDF menus in the browser and installs as a PWA — no app store required.",
      ar: "عارض قوائم رقمية خفيف يعرض قوائم PDF في المتصفح ويثبّت كتطبيق PWA — دون الحاجة إلى متجر تطبيقات.",
    },
    description: {
      en: "Menuee turns a restaurant's PDF menu into a fast, mobile-friendly browsing experience using pdf.js, with a web manifest so guests can add it to their home screen. A small, focused prototype aimed at the simplest possible menu digitization path.",
      ar: "يحوّل Menuee قائمة المطعم بصيغة PDF إلى تجربة تصفح سريعة ملائمة للجوال عبر pdf.js، مع manifest ويب يتيح للضيوف إضافته إلى شاشتهم الرئيسية. نموذج أولي صغير ومركّز يستهدف أبسط مسار ممكن لرقمنة القوائم.",
    },
    categories: ["web-apps"],
    technologies: ["JavaScript", "pdf.js", "PWA"],
    status: "prototype",
    repositoryUrl: "https://github.com/YounisDany/menuee",
    liveUrl: null,
    accent: "moss",
    lastActivity: "2026-05-20",
  },
  {
    id: "athar-alula",
    slug: "athar-alula",
    name: "Athar AlUla · أثر العلا",
    order: 12,
    featured: false,
    published: true,
    summary: {
      en: "A web experience described as \"a smart journey between past and future\" — exploring the heritage of AlUla with modern web technology.",
      ar: "تجربة ويب توصف بأنها \"رحلة ذكية بين الماضي والمستقبل\" — تستكشف تراث العلا بتقنيات ويب حديثة.",
    },
    description: {
      en: "Athar AlUla (أثر العلا) is a Next.js-based web experience centered on AlUla's heritage — positioned as a smart journey between past and future. The project is at the prototype stage; further details will be documented as it develops.",
      ar: "أثر العلا تجربة ويب مبنية بـ Next.js تتمحور حول تراث العلا — بوصفها رحلة ذكية بين الماضي والمستقبل. المشروع في مرحلة النموذج الأولي؛ وستُوثَّق تفاصيل إضافية مع تطوره.",
    },
    categories: ["web-apps", "ai-automation"],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    status: "prototype",
    repositoryUrl: "https://github.com/YounisDany/athar-alula",
    liveUrl: null,
    accent: "amber",
    lastActivity: "2026-06-02",
  },

  // ────────────────────────────────────────────────────────────────────────
  // UNVERIFIED PROJECT LEADS — kept in the source but NOT published.
  // These are known work areas that could not be verified against a public
  // repository during discovery. Before publishing one:
  //   1. Verify the repository link or live deployment.
  //   2. Fill in the bilingual content from actual evidence.
  //   3. Set `published: true`.
  // The public site excludes them automatically.
  // ────────────────────────────────────────────────────────────────────────
  {
    id: "fateen-bot",
    slug: "fateen-bot",
    name: "Fateen Bot",
    order: 90,
    featured: false,
    published: false,
    summary: {
      en: "WhatsApp automation SaaS (Node.js, Express, Socket.IO, whatsapp-web.js, MySQL, AI integration). Repository and deployment status not yet verified.",
      ar: "منصة SaaS لأتمتة واتساب (Node.js وExpress وSocket.IO وwhatsapp-web.js وMySQL وتكامل ذكاء اصطناعي). المستودع وحالة النشر لم يُتحقق منهما بعد.",
    },
    description: {
      en: "TODO(owner): describe Fateen Bot (fateen-bot.com) using verified information about its features, stack, and current deployment status.",
      ar: "TODO(owner): وصف Fateen Bot (fateen-bot.com) بمعلومات موثقة عن ميزاته وبنيته وحالة نشره الحالية.",
    },
    categories: ["saas", "bots", "ai-automation"],
    technologies: ["Node.js", "Express", "Socket.IO", "whatsapp-web.js", "MySQL"],
    status: "prototype",
    repositoryUrl: null, // TODO(owner): add the verified repository URL.
    liveUrl: null,
    accent: "forest",
  },
  {
    id: "hr-telegram-platform",
    slug: "hr-telegram-platform",
    name: "HR Platform (Telegram)",
    order: 91,
    featured: false,
    published: false,
    summary: {
      en: "An HR management platform operated through a Telegram bot — employee data, attachments, and natural-language AI interaction. Public repository not yet verified.",
      ar: "منصة إدارة موارد بشرية تُدار عبر بوت تيليجرام — بيانات الموظفين والمرفقات وتفاعل باللغة الطبيعية عبر الذكاء الاصطناعي. المستودع العام لم يُتحقق منه بعد.",
    },
    description: {
      en: "TODO(owner): describe the HR Telegram platform using verified information about implemented features versus planned ones.",
      ar: "TODO(owner): وصف منصة الموارد البشرية عبر تيليجرام بمعلومات موثقة عن الميزات المنفذة مقابل المخطط لها.",
    },
    categories: ["business-systems", "bots", "ai-automation"],
    technologies: ["Python", "Telegram Bot API", "AI"],
    status: "prototype",
    repositoryUrl: null, // TODO(owner): add the verified repository URL.
    liveUrl: null,
    accent: "teal",
  },
  {
    id: "dawr",
    slug: "dawr",
    name: "Dawr · دَور",
    order: 92,
    featured: false,
    published: false,
    summary: {
      en: "A restaurant queue and booking application (دَور) with branch selection — Flutter and web development context. Publication status not yet verified.",
      ar: "تطبيق دورات و حجوزات للمطاعم (دَور) مع اختيار الفروع — سياق Flutter وتطوير ويب. حالة النشر لم تُتحقق بعد.",
    },
    description: {
      en: "TODO(owner): describe Dawr using verified information about functionality, public links, and screenshots.",
      ar: "TODO(owner): وصف تطبيق دَور بمعلومات موثقة عن الوظائف والروابط العامة ولقطات الشاشة.",
    },
    categories: ["mobile-apps", "web-apps"],
    technologies: ["Flutter", "Dart"],
    status: "prototype",
    repositoryUrl: null, // TODO(owner): add the verified repository URL.
    liveUrl: null,
    accent: "moss",
  },
];

// ── Derived, read-only views used by the UI ────────────────────────────────

/** Projects visible to the public, in editorial order. */
export const publishedProjects: Project[] = allProjects
  .filter((p) => p.published)
  .sort((a, b) => a.order - b.order);

/** Featured projects shown on the homepage. */
export const featuredProjects: Project[] = publishedProjects.filter(
  (p) => p.featured,
);

export function getProjectBySlug(slug: string): Project | undefined {
  return publishedProjects.find((p) => p.slug === slug);
}

/** Related projects share at least one category, excluding the current one. */
export function getRelatedProjects(current: Project, limit = 3): Project[] {
  return publishedProjects
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({
      project: p,
      shared: p.categories.filter((c) => current.categories.includes(c)).length,
    }))
    .filter((x) => x.shared > 0)
    .sort((a, b) => b.shared - a.shared || a.project.order - b.project.order)
    .slice(0, limit)
    .map((x) => x.project);
}

/** Every technology used across published projects, alphabetized. */
export function getAllTechnologies(): string[] {
  const set = new Set<string>();
  for (const p of publishedProjects) {
    for (const t of p.technologies) set.add(t);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/** Categories that actually contain published projects, with counts. */
export function getUsedCategories(): {
  id: ProjectCategoryId;
  count: number;
}[] {
  const counts = new Map<ProjectCategoryId, number>();
  for (const p of publishedProjects) {
    for (const c of p.categories) {
      counts.set(c, (counts.get(c) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count || a.id.localeCompare(b.id));
}

