import ProductLayout from '../../components/products/ProductLayout'
import { productPages } from '../../data/productPages'

export default function Lunoo() {
  return <ProductLayout config={productPages['lunoo']} />
}
