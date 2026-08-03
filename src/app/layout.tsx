import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import EducationChannelBar from "@/components/EducationChannelBar";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { PERSON_DAANGN_LOCAL_PROFILE_URL } from "@/lib/person-profile";
import { serializeJsonLd } from "@/lib/serialize-jsonld";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://edu.silronomu.com";
const PERSON_ID = "https://silronomu.com/#person";
const ORG_ID = "https://xn--2q1bm94d.com/#organization";
const OFFICIAL_SITE_URL = "https://xn--2q1bm94d.com/";

export const metadata: Metadata = {
  title: {
    default: "클로드 코드 실무 교육 | 비개발자를 위한 단계별 과정",
    template: "%s | 노무사 x Claude Code",
  },
  description: "코딩 경험 없는 비개발자를 위한 클로드 코드(Claude Code) 실전 교육. 노무 실무에 직접 적용하며 정리한 16단계 80개 강의로 터미널 기초부터 웹앱 배포까지 익힙니다.",
  keywords: ["클로드 코드 강의", "Claude Code 교육", "클로드 코드 교육", "AI노무사", "AI 노동문서 검증", "노무실무 자동화", "비개발자 코딩", "바이브코딩", "클로드 코드 설치", "Claude Code 강의", "AI 업무 자동화", "노무사 AI"],
  authors: [{ name: "박실로", url: "https://silronomu.com" }],
  creator: "박실로 (공인노무사)",
  publisher: "한동노무법인",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: "노무사 x Claude Code",
    title: "클로드 코드 실무 교육 | 비개발자를 위한 단계별 과정",
    description: "코딩 경험 없는 비개발자를 위한 클로드 코드 실전 강의. 터미널 여는 법부터 웹앱 배포까지 16단계 80개 강의.",
  },
  twitter: {
    card: "summary_large_image",
    title: "클로드 코드 실무 교육 | 현업 적용 중심 과정",
    description: "코딩 경험 없는 비개발자를 위한 클로드 코드 실전 강의. 16단계 80개 강의로 AI 업무 자동화.",
  },
  verification: {
    google: [
      "bRgnvlb-svjtVk7G_TzQ4Upk4pjpA6VtOX4Mg1sTy9w",
      "jDjQK62YKg_1xwI2u6s_g0vlKnPswsoAdYUf_jnPQk8",
    ],
    other: {
      "naver-site-verification": [
        "b14dc4d237c8ed03a4d32fed0bc1af1d6ee68b99",
        "1406484335ed2b778e095331ae01dd17e26894d6",
      ],
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const PERSON_PROFILE_SAME_AS = [
  PERSON_DAANGN_LOCAL_PROFILE_URL,
  "https://www.instagram.com/silrobag/",
  "https://www.threads.net/@silrobag",
  "https://www.youtube.com/@코딩하는노무사",
  "https://www.linkedin.com/in/실로-박-385a1a104/",
];

const PARK_SILLO_SUBJECT_OF = [
  {
    "@type": "ProfilePage",
    name: "한동노무법인 구성원 · 박실로 노무사",
    url: `${OFFICIAL_SITE_URL}members`,
  },
  {
    "@type": "WebSite",
    name: "노무사 × Claude Code",
    url: SITE_URL,
  },
  {
    "@type": "WebSite",
    name: "AI업무학교",
    url: "https://ai-school.silronomu.com/",
  },
  {
    "@type": "WebSite",
    name: "산재·산업안전 전문 블로그",
    url: "https://sanjae.silronomu.com/",
  },
];

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "박실로",
  alternateName: ["박실로 노무사", "AI노무사 박실로", "Park Silro", "실로노무사"],
  jobTitle: "공인노무사",
  worksFor: { "@id": ORG_ID },
  knowsAbout: [
    "노동법", "근로기준법", "산업안전보건법",
    "Claude Code", "AI 업무 자동화", "바이브코딩",
    "클로드 코드 교육", "비개발자 AI 활용",
    "AI노무사", "AI 노동문서 검증", "전문직 AI 교육",
  ],
  description: "한동노무법인 대표노무사로서 노동실무와 AI 업무 자동화를 연구하고, 비개발자를 위한 Claude Code 실무 교육을 운영합니다.",
  url: "https://silronomu.com",
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "공인노무사",
    recognizedBy: { "@type": "GovernmentOrganization", name: "고용노동부" },
    identifier: { "@type": "PropertyValue", name: "공인노무사 직무개시등록번호", value: "제1243호" },
  },
  sameAs: PERSON_PROFILE_SAME_AS,
  subjectOf: PARK_SILLO_SUBJECT_OF,
};

const educationalOrgJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#org`,
  name: "한동노무법인 AI업무학교(노무사 x Claude Code)",
  url: SITE_URL,
  description: "박실로 공인노무사가 운영하는 비개발자용 Claude Code 실무 교육 채널입니다.",
  creator: { "@id": PERSON_ID },
  parentOrganization: { "@id": ORG_ID },
  telephone: "+82-62-521-5678",
  address: {
    "@type": "PostalAddress",
    streetAddress: "금재로 27, 3층",
    addressLocality: "북구",
    addressRegion: "전남광주통합특별시",
    postalCode: "61239",
    addressCountry: "KR",
  },
  geo: { "@type": "GeoCoordinates", latitude: 35.1741, longitude: 126.9123 },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
  areaServed: { "@type": "Country", name: "대한민국" },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "노무사 x Claude Code",
  url: SITE_URL,
  description: "현업에서 직접 써보고 다듬은 비개발자용 클로드 코드(Claude Code) 실무 교육",
  author: { "@id": PERSON_ID },
  about: { "@id": PERSON_ID },
  publisher: { "@id": `${SITE_URL}/#org` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(educationalOrgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <EducationChannelBar />
        <SiteNav />
        <main>{children}</main>
        <Analytics />
        <SiteFooter />
      </body>
    </html>
  );
}
