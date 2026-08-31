import ProductLayout from '../../components/products/ProductLayout'
import { productPages } from '../../data/productPages'

export default function TheKada() {
  return <ProductLayout config={productPages['the-kada']} />
}
