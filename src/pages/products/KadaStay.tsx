import ProductLayout from '../../components/products/ProductLayout'
import { productPages } from '../../data/productPages'
import { appLinks } from '../../data/content'

export default function KadaStay() {
  return <ProductLayout config={{ ...productPages['kada-stay'], ...appLinks['kada-stay'] }} />
}
