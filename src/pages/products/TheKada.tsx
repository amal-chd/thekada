import ProductLayout from '../../components/products/ProductLayout'
import { productPages } from '../../data/productPages'
import { appLinks } from '../../data/content'

export default function TheKada() {
  return <ProductLayout config={{ ...productPages['the-kada'], ...appLinks['the-kada'] }} />
}
