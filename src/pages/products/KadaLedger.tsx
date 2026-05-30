import ProductLayout from '../../components/products/ProductLayout'
import { productPages } from '../../data/productPages'
import { appLinks } from '../../data/content'

export default function KadaLedger() {
  return <ProductLayout config={{ ...productPages['kada-ledger'], ...appLinks['kada-ledger'] }} />
}
