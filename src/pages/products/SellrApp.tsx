import ProductLayout from '../../components/products/ProductLayout'
import { productPages } from '../../data/productPages'
import { appLinks } from '../../data/content'

export default function SellrApp() {
  return <ProductLayout config={{ ...productPages['sellrapp'], ...appLinks['sellrapp'] }} />
}
