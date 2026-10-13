/**
 * Technical capability groups.
 *
 * ── EDITING GUIDE ──────────────────────────────────────────────────────────
 * • Every capability below is backed by shipped, publicly verifiable work
 *   (see the projects catalogue) or by the owner's stated focus areas.
 * • No proficiency percentages, no "expert" labels — descriptions say what
 *   the capability is used for in real projects.
 * • To add a group, add an entry here and matching icon mapping in the
 *   Capabilities component.
 * ──────────────────────────────────────────────────────────────────────────
 */

export interface CapabilityGroup {
  id: string;
  icon: "layout" | "smartphone" | "server" | "database" | "bot" | "package";
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  /** Concrete tools used across verified projects. */
  items: string[];
}

export const capabilityGroups: CapabilityGroup[] = [
  {
    id: "frontend",
    icon: "layout",
    title: { en: "Frontend", ar: "الواجهات الأمامية" },
    description: {
      en: "Responsive, bilingual interfaces with full RTL support — from POS screens designed for touch to customer-facing web platforms.",
      ar: "واجهات متجاوبة ثنائية اللغة بدعم كامل للاتجاه من اليمين إلى اليسار — من شاشات نقاط بيع مصممة باللمس إلى منصات ويب موجهة للعملاء.",
    },
    items: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "HTML & CSS",
    ],
  },
  {
    id: "mobile",
    icon: "smartphone",
    title: { en: "Mobile", ar: "تطبيقات الجوال" },
    description: {
      en: "Cross-platform apps built with Flutter, including offline-first workflows, role-based experiences, and bilingual Arabic/English UI.",
      ar: "تطبيقات متعددة المنصات مبنية بـ Flutter، تشمل مسارات عمل تعمل دون اتصال، وتجارب قائمة على الأدوار، وواجهات ثنائية اللغة.",
    },
    items: ["Flutter", "Dart", "Firebase"],
  },
  {
    id: "backend",
    icon: "server",
    title: { en: "Backend & APIs", ar: "الأنظمة الخلفية والواجهات البرمجية" },
    description: {
      en: "Server logic, REST APIs, authentication, and messaging-platform integrations that power business workflows end to end.",
      ar: "منطق الخوادم وواجهات REST والمصادقة وتكاملات منصات المراسلة التي تدير مسارات العمل من البداية إلى النهاية.",
    },
    items: ["Node.js", "Express", "PHP", "REST APIs"],
  },
  {
    id: "databases",
    icon: "database",
    title: { en: "Databases", ar: "قواعد البيانات" },
    description: {
      en: "Data modeling and persistence for business systems — products, orders, invoices, users, and permissions.",
      ar: "نمذجة البيانات والتخزين لأنظمة الأعمال — المنتجات والطلبات والفواتير والمستخدمون والصلاحيات.",
    },
    items: ["MySQL", "SQLite", "Prisma ORM"],
  },
  {
    id: "automation",
    icon: "bot",
    title: { en: "Automation & AI", ar: "الأتمتة والذكاء الاصطناعي" },
    description: {
      en: "WhatsApp and Telegram bots, AI-assisted features inside real products, and hybrid heuristic/ML analysis pipelines.",
      ar: "بوتات واتساب وتيليجرام، وميزات مدعومة بالذكاء الاصطناعي داخل منتجات حقيقية، ومسارات تحليل هجينة بين القواعد والتعلم الآلي.",
    },
    items: [
      "WhatsApp automation",
      "Telegram bots",
      "AI API integration",
      "Agent experiments",
    ],
  },
  {
    id: "oss",
    icon: "package",
    title: { en: "Developer Tools & Open Source", ar: "أدوات المطوّرين والمصادر المفتوحة" },
    description: {
      en: "NPM packages and CDN-distributed libraries with documented APIs, bilingual data, and one-line setup.",
      ar: "حزم NPM ومكتبات موزعة عبر CDN بواجهات موثقة وبيانات ثنائية اللغة وإعداد بسطر واحد.",
    },
    items: ["NPM packages", "CDN libraries", "Documentation"],
  },
];

/**
 * Working principles shown in the "How I Work" section.
 */
export interface Principle {
  title: { en: string; ar: string };
  description: { en: string; ar: string };
}

export const principles: Principle[] = [
  {
    title: { en: "Start from the real problem", ar: "الانطلاق من المشكلة الحقيقية" },
    description: {
      en: "Before writing code, I map the actual operational workflow — who uses the system, what slows them down, and what a good day looks like for them. The software is designed around that, not the other way around.",
      ar: "قبل كتابة أي سطر برمجي، أرسم مسار العمل التشغيلي الفعلي — من يستخدم النظام، وما يعطّله، وكيف يبدو يوم عمل ناجح بالنسبة له. تُبنى البرمجية حول ذلك، لا العكس.",
    },
  },
  {
    title: { en: "Build complete products", ar: "بناء منتجات متكاملة" },
    description: {
      en: "A product is not a set of screens — it is the interface, the data model, the business rules, and the deployment working together. I take responsibility for the whole path, not just the visible layer.",
      ar: "المنتج ليس مجموعة شاشات — بل واجهة ونموذج بيانات وقواعد عمل ونشر تعمل معاً. أتحمل المسؤولية عن المسار كاملاً، لا عن الطبقة المرئية فقط.",
    },
  },
  {
    title: { en: "Design for maintenance", ar: "التصميم من أجل الصيانة" },
    description: {
      en: "Systems I build are meant to run for years: clear structure, typed and validated data, and documentation so the next change — by me or someone else — is safe to make.",
      ar: "الأنظمة التي أبنيها مصممة لتعمل لسنوات: بنية واضحة، وبيانات مُنمّطة ومُتحقق منها، وتوثيق يجعل التغيير التالي — مني أو من غيري — آمناً.",
    },
  },
  {
    title: { en: "Automate the repetitive", ar: "أتمتة المتكرر" },
    description: {
      en: "Wherever a manual process repeats — orders, notifications, data entry — I look for the automation that removes it, whether through bots, scripts, or AI integration.",
      ar: "حيثما تكرر عمل يدوي — طلبات أو إشعارات أو إدخال بيانات — أبحث عن الأتمتة التي تلغيه، سواء عبر البوتات أو السكربتات أو تكامل الذكاء الاصطناعي.",
    },
  },
];

/**
 * Focus areas for the Background section — themes observed across the
 * shipped catalogue, phrased without unverifiable claims.
 */
export interface FocusArea {
  title: { en: string; ar: string };
  description: { en: string; ar: string };
}

export const focusAreas: FocusArea[] = [
  {
    title: { en: "Restaurant & retail operations", ar: "عمليات المطاعم والتجزئة" },
    description: {
      en: "Point-of-sale systems, multi-branch management, menus, and the daily reports owners actually read.",
      ar: "أنظمة نقاط البيع، وإدارة الفروع المتعددة، والقوائم، والتقارير اليومية التي يقرأها أصحاب الأعمال فعلاً.",
    },
  },
  {
    title: { en: "Business systems & dashboards", ar: "أنظمة الأعمال ولوحات التحكم" },
    description: {
      en: "Database-driven platforms for managing employees, invoices, users, and permissions across an organization.",
      ar: "منصات مدفوعة بقواعد البيانات لإدارة الموظفين والفواتير والمستخدمين والصلاحيات عبر المؤسسة.",
    },
  },
  {
    title: { en: "Messaging automation", ar: "أتمتة المراسلات" },
    description: {
      en: "Bots and integrations that move workflows into WhatsApp and Telegram, where users already are.",
      ar: "بوتات وتكاملات تنقل مسارات العمل إلى واتساب وتيليجرام، حيث يتواجد المستخدمون أصلاً.",
    },
  },
  {
    title: { en: "Open-source libraries", ar: "المكتبات مفتوحة المصدر" },
    description: {
      en: "Published NPM packages with bilingual administrative-region data for Saudi Arabia and Yemen.",
      ar: "حزم NPM منشورة ببيانات المناطق الإدارية ثنائية اللغة للسعودية واليمن.",
    },
  },
  {
    title: { en: "AI-assisted products", ar: "منتجات مدعومة بالذكاء الاصطناعي" },
    description: {
      en: "Natural-language features and AI-generated planning built into real products, from travel planning to link analysis.",
      ar: "ميزات لغة طبيعية وتخطيط مولّد بالذكاء الاصطناعي داخل منتجات حقيقية، من تخطيط السفر إلى تحليل الروابط.",
    },
  },
];
