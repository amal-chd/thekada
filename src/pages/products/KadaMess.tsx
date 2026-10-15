import ProductLayout from '../../components/products/ProductLayout'
import { productPages } from '../../data/productPages'

export default function KadaMess() {
  return <ProductLayout config={productPages['kada-mess']} />
}
