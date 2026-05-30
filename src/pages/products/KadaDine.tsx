import ProductLayout from '../../components/products/ProductLayout'
import { productPages } from '../../data/productPages'
import { appLinks } from '../../data/content'

export default function KadaDine() {
  return <ProductLayout config={{ ...productPages['kada-dine'], ...appLinks['kada-dine'] }} />
}
