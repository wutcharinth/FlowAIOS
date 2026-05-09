// Three vertical categories. We collapsed "Customer Ops Mid-market"
// into "Ecommerce" — in the Thai market most CS-team-led businesses are
// omnichannel sellers (Pim's fashion brand, etc.), not standalone CS
// operations. The /for/customer-ops landing still exists as a deeper
// sub-page for the CS-team buyer flavor, linked from /for/commerce.
export const VERTICALS = ['commerce', 'services', 'b2b'] as const;
export type Vertical = (typeof VERTICALS)[number];

export const VERTICAL_COOKIE = 'flowaios-vertical';

export interface VerticalProfile {
  id: Vertical;
  label: string;
  description: string;
  channels: ReadonlyArray<string>; // labels matching channelStripBrands
  ctaHref: string;
}

export const verticalProfiles: ReadonlyArray<VerticalProfile> = [
  {
    id: 'commerce',
    label: 'Ecommerce',
    description:
      'ขายของออนไลน์หลายช่องทาง · DTC, omnichannel retail, ทีม CS 1–30 คน · LINE OA + Shopee + Lazada + TikTok + IG + FB',
    channels: ['LINE OA', 'Shopee', 'Lazada', 'TikTok Shop', 'Instagram', 'Facebook'],
    ctaHref: '/for/commerce',
  },
  {
    id: 'services',
    label: 'Services / Education',
    description: 'ธุรกิจบริการ คลินิก กวดวิชา fitness ส่วนใหญ่ใช้ LINE OA + Facebook',
    channels: ['LINE OA', 'Facebook', 'Email'],
    ctaHref: '/for/services',
  },
  {
    id: 'b2b',
    label: 'B2B / Industrial',
    description: 'ธุรกิจ B2B จำหน่ายอะไหล่/อุปกรณ์ ส่วนใหญ่รับ order ผ่าน LINE + email',
    channels: ['LINE OA', 'Email'],
    ctaHref: '/contact',
  },
];

export function isVertical(value: string | undefined): value is Vertical {
  return value !== undefined && (VERTICALS as readonly string[]).includes(value);
}

export function readVerticalCookie(value: string | undefined): Vertical | null {
  return isVertical(value) ? value : null;
}

export function getVerticalProfile(id: Vertical): VerticalProfile | undefined {
  return verticalProfiles.find((p) => p.id === id);
}
