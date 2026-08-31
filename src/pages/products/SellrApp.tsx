import ProductLayout from '../../components/products/ProductLayout'
import { productPages } from '../../data/productPages'

export default function SellrApp() {
  return <ProductLayout config={productPages['sellrapp']} />
}
