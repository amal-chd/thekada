import ProductLayout from '../../components/products/ProductLayout'
import { productPages } from '../../data/productPages'
import { appLinks } from '../../data/content'

export default function Lunoo() {
  return <ProductLayout config={{ ...productPages['lunoo'], ...appLinks['lunoo'] }} />
}
