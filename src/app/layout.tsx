import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://edu.silronomu.com";
const PERSON_ID = "https://silronomu.com/#person";
const ORG_ID = "https://silronomu.com/#organization";

export const metadata: Metadata = {
  title: {
    default: "클로드 코드 강의 | 19년차 노무사가 가르치는 Claude Code 실무 교육",
    template: "%s | 노무사 x Claude Code",
  },
  description: "코딩 경험 없는 비개발자를 위한 클로드 코드(Claude Code) 실전 강의. 19년차 공인노무사 박실로가 터미널 여는 법부터 웹앱 배포까지, 16단계 71개 강의로 AI 업무 자동화를 가르칩니다.",
  keywords: ["클로드 코드 강의", "Claude Code 교육", "클로드 코드 교육", "AI 노무사", "비개발자 코딩", "바이브코딩", "클로드 코드 설치", "Claude Code 강의", "AI 업무 자동화", "노무사 AI"],
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
    title: "클로드 코드 강의 | 19년차 노무사가 가르치는 Claude Code 실무 교육",
    description: "코딩 경험 없는 비개발자를 위한 클로드 코드 실전 강의. 터미널 여는 법부터 웹앱 배포까지 16단계 71개 강의.",
  },
  twitter: {
    card: "summary_large_image",
    title: "클로드 코드 강의 | 노무사가 가르치는 Claude Code",
    description: "코딩 경험 없는 비개발자를 위한 클로드 코드 실전 강의. 16단계 71개 강의로 AI 업무 자동화.",
  },
  verification: {
    google: [
      "bRgnvlb-svjtVk7G_TzQ4Upk4pjpA6VtOX4Mg1sTy9w",
      "jDjQK62YKg_1xwI2u6s_g0vlKnPswsoAdYUf_jnPQk8",
    ],
    other: {
      "naver-site-verification": "b14dc4d237c8ed03a4d32fed0bc1af1d6ee68b99",
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

const SAME_AS = [
  "https://silronomu.com/",
  "https://blog.silronomu.com/",
  "https://sanjae.silronomu.com/",
  "https://edu.silronomu.com/",
  "https://ai-school.silronomu.com/",
  "https://xn--hc0b21e4rq52a9zgfzlxub.com/",
  "https://xn--hc0b21et01ao2a.com/",
  "https://xn--hc0bn7fv7j9tf6rl.net/",
  "https://blog.naver.com/5215678",
  "https://silronomusa.blogspot.com/",
  "https://www.facebook.com/share/17SYegaFj5/",
  "https://www.instagram.com/silrobag/",
  "https://www.threads.net/@silrobag",
  "https://x.com/silrobag",
  "https://youtube.com/channel/UCAkNJ16PNf2cNfhXsVbh-gg",
  "https://www.linkedin.com/in/실로-박-385a1a104/",
];

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: "박실로",
  alternateName: ["Park Silro", "실로노무사"],
  jobTitle: "공인노무사",
  worksFor: { "@id": ORG_ID },
  knowsAbout: [
    "노동법", "근로기준법", "산업안전보건법",
    "Claude Code", "AI 업무 자동화", "바이브코딩",
    "클로드 코드 교육", "비개발자 AI 활용",
  ],
  description: "19년차 공인노무사이자 클로드 코드(Claude Code) 교육자. 비개발자 전문직을 위한 AI 활용 교육을 진행합니다.",
  url: "https://silronomu.com",
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "공인노무사",
    recognizedBy: { "@type": "GovernmentOrganization", name: "고용노동부" },
    identifier: { "@type": "PropertyValue", name: "공인노무사 직무개시등록번호", value: "제1243호" },
  },
  sameAs: SAME_AS,
};

const educationalOrgJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#org`,
  name: "한동노무법인 AI업무학교(노무사 x Claude Code)",
  url: SITE_URL,
  sameAs: SAME_AS,
  founder: { "@id": PERSON_ID },
  parentOrganization: { "@id": ORG_ID },
  telephone: "+82-62-521-5678",
  address: {
    "@type": "PostalAddress",
    streetAddress: "금재로 27, 3층",
    addressLocality: "북구",
    addressRegion: "광주광역시",
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
  description: "19년차 노무사가 가르치는 비개발자를 위한 클로드 코드(Claude Code) 실무 교육",
  author: { "@id": PERSON_ID },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="antialiased">
        <SiteNav />
        <main>{children}</main>
        <Analytics />
        <SiteFooter />
      </body>
    </html>
  );
}
