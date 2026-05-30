import ProductLayout from '../../components/products/ProductLayout'
import { productPages } from '../../data/productPages'
import { appLinks } from '../../data/content'

export default function DevFlow() {
  return <ProductLayout config={{ ...productPages['devflow'], ...appLinks['devflow'] }} />
}
