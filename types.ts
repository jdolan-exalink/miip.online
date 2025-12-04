import { LucideIcon } from 'lucide-react';

export interface ToolDef {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  path: string;
  category: 'Network' | 'Security' | 'Utility';
}

export interface TutorialDef {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  content: string; // Markdown content
  date: string;
}

export interface DnsRecord {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

export interface IpInfo {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  org: string; // ASN/ISP
  network?: string;
}
