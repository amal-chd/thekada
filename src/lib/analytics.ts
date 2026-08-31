import { getAnalyticsInstance } from '@/lib/firebase';
import { logEvent } from 'firebase/analytics';

export async function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  try {
    const analytics = await getAnalyticsInstance();
    if (analytics) {
      logEvent(analytics, name, params);
    }
  } catch (error) {
    console.warn(`Analytics event [${name}] failed to log:`, error);
  }
}

export function trackPageView(pageName: string) {
  trackEvent('page_view', { page_name: pageName });
}

export function trackServiceView(serviceName: string) {
  trackEvent('view_service', { service_name: serviceName });
}

export function trackProductView(productName: string) {
  trackEvent('view_product', { product_name: productName });
}

export function trackCTAClick(ctaName: string, location: string) {
  trackEvent('click_cta', { cta_name: ctaName, location });
}

export function trackFormStart(formName: string) {
  trackEvent('form_start', { form_name: formName });
}

export function trackFormSubmit(formName: string, service?: string) {
  trackEvent('form_submit', service ? { form_name: formName, service } : { form_name: formName });
}

export function trackPhoneClick() {
  trackEvent('click_phone_number');
}

export function trackEmailClick(email: string) {
  trackEvent('click_email', { email });
}

export function trackWhatsAppClick() {
  trackEvent('click_whatsapp');
}

export function trackCaseStudyView(caseStudyName: string) {
  trackEvent('view_case_study', { case_study_name: caseStudyName });
}

export function getUTMParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  
  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};
  
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(param => {
    const value = params.get(param);
    if (value) {
      utmParams[param] = value;
    }
  });
  
  return utmParams;
}

export function preserveUTMParams(): void {
  if (typeof window === 'undefined') return;
  
  const utmParams = getUTMParams();
  if (Object.keys(utmParams).length > 0) {
    try {
      sessionStorage.setItem('kd_utm_params', JSON.stringify(utmParams));
    } catch (e) {
      console.warn('Failed to save UTM params to sessionStorage', e);
    }
  }
}

export function getPreservedUTMParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  
  try {
    const stored = sessionStorage.getItem('kd_utm_params');
    return stored ? JSON.parse(stored) : {};
  } catch (e) {
    console.warn('Failed to parse UTM params from sessionStorage', e);
    return {};
  }
}
