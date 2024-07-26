import axios from "../api/axios"
import useAuth from '../hooks/useAuth'

const USER_URL = '/users/edit'

const Product = ({ product }) => {

  const { auth } = useAuth()
  const handleClick = async () => {
    try {
      const username = auth.user
      const productName = product.name
      const price = parseFloat(product.price.replace('$', ''))
      const link = product.link
      await axios.post(
        USER_URL, 
        JSON.stringify({username, productName, prevPrice: price, currPrice: price, link}),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
    } catch (err) {
      console.log(err)
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
