import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const USER_URL = '/users/edit'

const TrackedProduct = ({ trackedProduct, fetchTracked }) => {
    const { auth } = useAuth()
    let priceChange = 0

    if(trackedProduct.newPrice >= trackedProduct.prevPrice) {
        priceChange = ((trackedProduct.newPrice - trackedProduct.prevPrice) / trackedProduct.prevPrice) * 100
    } else {
        priceChange = ((trackedProduct.prevPrice - trackedProduct.currPrice) / trackedProduct.prevPrice) * 100
    }

    const handleRemove = async (e) => {
        e.preventDefault()
        try {
            await axios.patch(
                USER_URL,
                JSON.stringify({username: auth.user, productId: trackedProduct._id}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
            fetchTracked()
        } catch (err) {
            console.log(err)
        }
    }

    const handleRefresh = async () => {

    }

    return (
      <article className="product">
          <h2 className="productTitle">
              <a href={trackedProduct.link}>
                  {trackedProduct.name}
              </a>
          </h2>
          <p className='productInfo'>
              Last Price: {`$${trackedProduct.prevPrice}`}
              <br />
              Current Price: {`$${trackedProduct.currPrice}`}
              <br />
              Price Change: {`${priceChange}%`}
          </p>
          <button onClick={handleRefresh}>Refresh</button>
          <button onClick={handleRemove}>Remove</button>
      </article>
    )
  }
  
  export default TrackedProduct