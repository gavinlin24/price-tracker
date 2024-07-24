import axios from "../api/axios"
import useAuth from '../hooks/useAuth'

const PRODUCT_URL = '/product'

const Product = ({ product }) => {

  const { auth } = useAuth()
  const handleClick = async () => {
    try {
      const price = parseFloat(product.price.replace('$', ''))
      await axios.post(PRODUCT_URL, 
        JSON.stringify({username: auth.user, productName: product.name, price, link: product.link},
          {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          })
      )
    } catch (err) {

    }
  }

  return (
    <article className="product">
        <h2 className="productTitle">
            <a href={product.link}>
                {product.name}
            </a>
        </h2>
        <p className='productInfo'>
            Current Price: {product.price}
        </p>
        <button onClick={handleClick}>Track</button>
    </article>
  )
}

export default Product
