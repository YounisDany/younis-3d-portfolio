/**
 * Professional profile — single source of truth for identity and links.
 *
 * ── EDITING GUIDE ──────────────────────────────────────────────────────────
 * • To update the professional links, edit `links` below.
 * • Fields set to `null` are intentionally hidden from the published
 *   interface (they render nothing). Fill them in only with verified
 *   information — never publish a placeholder as if it were real.
 * • `resume` mirrors the owner's CV (public/cv.pdf). Keep both in sync when
 *   a job, course, or qualification is added.
 * ──────────────────────────────────────────────────────────────────────────
 */

export interface SocialLink {
  /** Stable key used for icons and translations. */
  key: "github" | "whatsapp" | "instagram" | "email" | "linkedin";
  /** Verified, absolute https URL. */
  url: string;
  /** Display handle or label (already localized or a proper noun). */
  handle: string;
}

export interface Localized {
  en: string;
  ar: string;
}

/** A dated entry on the résumé (job, degree, course). */
export interface ResumeEntry {
  title: Localized;
  org: Localized;
  /** Human-readable period, e.g. "Sep 2019 — Present". */
  period: Localized;
  /** Optional one-line detail. */
  detail?: Localized;
}

export interface LanguageSkill {
  name: Localized;
  level: Localized;
  /** 1–5 proficiency dots for the visual meter. */
  dots: 1 | 2 | 3 | 4 | 5;
}

export interface Resume {
  /** Public path to the downloadable CV. */
  cvUrl: string;
  /** Public path to the profile photo. */
  photo: string;
  /** Professional headline as written on the CV. */
  headline: Localized;
  nationality: Localized;
  experience: ResumeEntry[];
  education: ResumeEntry[];
  courses: ResumeEntry[];
  languages: LanguageSkill[];
  /** Programming languages / frameworks listed on the CV. */
  programming: string[];
  /** Design & productivity software listed on the CV. */
  designTools: string[];
}

export interface Profile {
  /** Professional name (proper noun — never translated). */
  name: string;
  /** Arabic full name as written on the CV. */
  nameAr: string;
  /** Alternative spelling, used for SEO structured data only. */
  alternateName: string;
  /** Professional title, localized via i18n dictionaries. */
  titleKey: "hero.eyebrow";
  /** Verified public links. Source: public GitHub profile README. */
  links: SocialLink[];
  /** Optional editable fields — hidden while null. */
  email: string | null;
  linkedinUrl: string | null;
  location: Localized | null;
  /** e.g. "Open to opportunities" — must be a deliberate claim. */
  availability: Localized | null;
  resume: Resume;
}

export const profile: Profile = {
  name: "Younis Dany",
  nameAr: "يونس علي يحيى ضاعني",
  alternateName: "Yunes Dhanei",
  titleKey: "hero.eyebrow",
  links: [
    {
      key: "github",
      url: "https://github.com/YounisDany",
      handle: "@YounisDany",
    },
    {
      key: "whatsapp",
      url: "https://wa.me/966558147903",
      handle: "+966 55 814 7903",
    },
    {
      key: "instagram",
      url: "https://instagram.com/vuodv",
      handle: "@vuodv",
    },
  ],
  email: "Younisdany0@gmail.com",
  linkedinUrl: null, // TODO(owner): add LinkedIn profile URL when available.
  location: { en: "Riyadh, Saudi Arabia", ar: "الرياض، السعودية" },
  availability: {
    en: "Open to full-time roles and freelance projects",
    ar: "متاح للوظائف بدوام كامل والمشاريع المستقلة",
  },

  resume: {
    cvUrl: "/cv.pdf",
    photo: "/photo.webp",
    headline: {
      en: "Web Developer & Graphic Designer",
      ar: "مطوّر مواقع ويب ومصمم جرافيك",
    },
    nationality: { en: "Yemeni", ar: "يمني" },

    experience: [
      {
        title: {
          en: "Freelance Web Developer & Graphic Designer",
          ar: "مطوّر ويب ومصمم جرافيك مستقل",
        },
        org: {
          en: "Independent — for companies and organizations",
          ar: "عمل حر — للعديد من الشركات والمؤسسات",
        },
        period: { en: "Sep 2019 — Present", ar: "سبتمبر 2019 — حتى الآن" },
        detail: {
          en: "Websites, business systems, brand visuals, and automation tools delivered end to end for clients across Saudi Arabia and Yemen.",
          ar: "مواقع ويب وأنظمة أعمال وهويات بصرية وأدوات أتمتة تُسلَّم كاملة لعملاء في السعودية واليمن.",
        },
      },
      {
        title: {
          en: "Graphic Designer & Web Developer",
          ar: "مصمم جرافيك ومطوّر مواقع ويب",
        },
        org: {
          en: "Horizon Advertising",
          ar: "هورايزن للدعاية والإعلان",
        },
        period: { en: "Feb 2022 — Aug 2023", ar: "فبراير 2022 — أغسطس 2023" },
        detail: {
          en: "Designed advertising material and built client websites inside an advertising agency.",
          ar: "تصميم المواد الإعلانية وبناء مواقع العملاء داخل وكالة دعاية وإعلان.",
        },
      },
    ],

    education: [
      {
        title: {
          en: "Higher Diploma in Computer Science (3 years)",
          ar: "دبلوم عالي حاسوب (3 سنوات)",
        },
        org: {
          en: "International College for Health Sciences & Technology",
          ar: "الكلية الدولية للعلوم الصحية والتقنية",
        },
        period: { en: "Diploma", ar: "دبلوم عالي" },
      },
      {
        title: {
          en: "High School — Science Track",
          ar: "ثانوية عامة — القسم العلمي",
        },
        org: { en: "Ministry of Education", ar: "وزارة التربية والتعليم" },
        period: { en: "Secondary", ar: "ثانوية" },
      },
    ],

    courses: [
      {
        title: {
          en: "Youth Empowerment in Relief & Humanitarian Work",
          ar: "تمكين الشباب في الأعمال الإغاثية والإنسانية",
        },
        org: {
          en: "Training program — protection & psychosocial support",
          ar: "برنامج تدريبي — في مجال الحماية والدعم النفسي",
        },
        period: { en: "Training program", ar: "برنامج تدريبي" },
      },
      {
        title: {
          en: "Executive Secretarial & Office Management",
          ar: "السكرتارية التنفيذية وإدارة المكاتب",
        },
        org: {
          en: "Secretarial skills, business correspondence, office management",
          ar: "مهارات السكرتارية، المراسلات التجارية، إدارة المكاتب",
        },
        period: { en: "Course", ar: "دورة" },
      },
      {
        title: {
          en: "Humanitarian training programs",
          ar: "البرامج التدريبية لمنظمة وهج الحياة",
        },
        org: {
          en: "Wahaj Al-Hayat Organization — Sphere project, protection, psychosocial support, health, field surveys",
          ar: "منظمة وهج الحياة — مشروع أسفير، الحماية، الدعم النفسي، الصحة، المسوحات الميدانية",
        },
        period: { en: "Training", ar: "تدريب" },
      },
      {
        title: {
          en: "HESPER & MIRA international assessment scales",
          ar: "مقياس هيسبر وميرا العالمية",
        },
        org: {
          en: "Humanitarian needs-assessment tools",
          ar: "أدوات تقييم الاحتياجات الإنسانية",
        },
        period: { en: "Certified", ar: "شهادة" },
      },
    ],

    languages: [
      {
        name: { en: "Arabic", ar: "العربية" },
        level: { en: "Native", ar: "اللغة الأم" },
        dots: 5,
      },
      {
        name: { en: "English", ar: "الإنجليزية" },
        level: { en: "Professional working proficiency", ar: "جيد جداً" },
        dots: 4,
      },
    ],

    programming: [
      "Flutter",
      "HTML / CSS",
      "PHP",
      "JavaScript",
      "C++",
      "Java",
      "C#",
      "MySQL",
    ],

    designTools: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe After Effects",
      "Microsoft Office",
    ],
  },
};
