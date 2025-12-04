import { IpInfo } from '../types';

export const calculateSubnet = (ip: string, cidr: number) => {
  if (!ip.match(/^(\d{1,3}\.){3}\d{1,3}$/) || cidr < 0 || cidr > 32) {
    return null;
  }

  const ipParts = ip.split('.').map(Number);
  const ipNum = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
  
  const mask = cidr === 0 ? 0 : (~0) << (32 - cidr);
  const networkNum = ipNum & mask;
  const broadcastNum = networkNum | (~mask);
  
  const intToIp = (num: number) => {
    return [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255
    ].join('.');
  };

  const hosts = cidr === 32 ? 1 : cidr === 31 ? 2 : Math.pow(2, 32 - cidr) - 2;

  return {
    networkAddress: intToIp(networkNum),
    broadcastAddress: intToIp(broadcastNum),
    subnetMask: intToIp(mask),
    firstUsable: cidr >= 31 ? 'N/A' : intToIp(networkNum + 1),
    lastUsable: cidr >= 31 ? 'N/A' : intToIp(broadcastNum - 1),
    totalHosts: hosts > 0 ? hosts : 0,
    binaryMask: (mask >>> 0).toString(2).padStart(32, '0').match(/.{1,8}/g)?.join('.')
  };
};

export const validateVlan = (vlanId: number) => {
  if (vlanId < 1 || vlanId > 4094) return { valid: false, msg: "Out of range (1-4094)" };
  if (vlanId === 1) return { valid: true, msg: "Default VLAN (Management/Native often)" };
  if (vlanId >= 1002 && vlanId <= 1005) return { valid: true, msg: "Reserved for FDDI/Token Ring (Legacy)" };
  return { valid: true, msg: "Standard Ethernet VLAN" };
};

export const isIpV6 = (ip: string) => ip.indexOf(':') > -1;

// Specific fetcher for IPv4 (forces v4 connection if possible)
export const getIpV4 = async (): Promise<string | null> => {
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    if (!res.ok) throw new Error('v4 failed');
    const data = await res.json();
    return data.ip;
  } catch {
    return null;
  }
};

// Specific fetcher for IPv6 (forces v6 connection if possible)
export const getIpV6 = async (): Promise<string | null> => {
  try {
    const res = await fetch('https://api6.ipify.org?format=json');
    if (!res.ok) throw new Error('v6 failed');
    const data = await res.json();
    return data.ip;
  } catch {
    return null;
  }
};

export const getPublicIpInfo = async (): Promise<IpInfo> => {
  // Strategy: Try Primary (ipapi.co) -> Fallback 1 (ipwho.is) -> Fallback 2 (ipify - IP only)

  // 1. Primary: ipapi.co
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3s timeout
    
    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    clearTimeout(timeoutId);
    
    if (!res.ok) throw new Error('ipapi failed');
    const json = await res.json();
    
    // Validate basic response
    if (!json.ip) throw new Error('Invalid response from ipapi');

    return {
      ip: json.ip,
      city: json.city || 'Unknown',
      region: json.region || '',
      country_name: json.country_name || '',
      org: json.org || '',
      network: json.network
    };
  } catch (e) {
    console.warn('Primary IP API failed, switching to fallback...', e);
  }

  // 2. Fallback: ipwho.is
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const res = await fetch('https://ipwho.is/', { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) throw new Error('ipwho failed');
    const json = await res.json();
    
    if (!json.success) throw new Error('ipwho success=false');

    return {
      ip: json.ip,
      city: json.city || 'Unknown',
      region: json.region || '',
      country_name: json.country || '',
      org: json.connection?.isp || json.connection?.org || 'Unknown ISP',
      network: json.connection?.org
    };
  } catch (e) {
    console.warn('Fallback 1 failed, switching to backup...', e);
  }

  // 3. Last Resort: ipify (IP Only)
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    if (!res.ok) throw new Error('ipify failed');
    const json = await res.json();
    return {
      ip: json.ip,
      city: 'Unknown',
      region: '',
      country_name: 'Unknown',
      org: 'Unknown ISP'
    };
  } catch (e) {
    throw new Error('All IP fetch services failed. Please check your connection or ad-blocker.');
  }
};