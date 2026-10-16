import { GetAppSection as KadaGetApp } from '../kada-kit'
import { APP_SCREENS } from './appScreens'

/** The Kada customer app — the same listing the customer site links to. */
export const CUSTOMER_APP_URLS = {
  playStore: 'https://play.google.com/store/apps/details?id=com.thekada.customer',
  appStore: 'https://apps.apple.com/app/the-kada/id6741480000',
  smartDownload: 'https://thekada.in/download',
}

/** The shared Get-the-App section, promoting The Kada customer app. */
export default function GetAppSection() {
  return (
    <KadaGetApp
      headline="Get The Kada App"
      subtitle="Order from local kitchens, book a table and track your rider live — The Kada app, built and run by our team."
      mobileSubtitle="Order from local kitchens & track your rider live on The Kada app"
      appStoreUrl={CUSTOMER_APP_URLS.appStore}
      playStoreUrl={CUSTOMER_APP_URLS.playStore}
      qrValue={CUSTOMER_APP_URLS.smartDownload}
      qrLogo="/favicon.png"
      screens={APP_SCREENS}
      whatsAppMessage={`Order from local kitchens and track your rider live. Download The Kada app: ${CUSTOMER_APP_URLS.smartDownload}`}
    />
  )
}
