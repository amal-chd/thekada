import ProductLayout from '../../components/products/ProductLayout'
import { productPages } from '../../data/productPages'

export default function DevFlow() {
  return <ProductLayout config={productPages['devflow']} />
}
