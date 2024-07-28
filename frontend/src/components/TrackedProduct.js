import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const EDIT_URL = '/users/edit'
const UPD_URL = '/scrape/update'
const PROD_URL = '/product'

const TrackedProduct = ({ trackedProduct, fetchTracked }) => {
    const { auth } = useAuth()
    let priceChange = 0

    if(trackedProduct.currPrice >= trackedProduct.prevPrice) {
        priceChange = ((trackedProduct.currPrice - trackedProduct.prevPrice) / trackedProduct.prevPrice) * 100
    } else {
        priceChange = ((trackedProduct.prevPrice - trackedProduct.currPrice) / trackedProduct.prevPrice) * 100
    }

    priceChange = Math.floor(priceChange)

    const handleRemove = async (e) => {
        e.preventDefault()
        try {
            await axios.patch(
                EDIT_URL,
                JSON.stringify({username: auth.user, productId: trackedProduct._id}),
                {
                    headers: { 
                        'Authorization': `Bearer ${auth.accessToken}`,
                        'Content-Type': 'application/json' 
                    },
                    withCredentials: true
                }
            )
            fetchTracked()
        } catch (err) {
            console.log(err)
        }
    }

    const handleRefresh = async (e) => {
        e.preventDefault()
        try {   
            const newPrice = await axios.post(
                UPD_URL,
                JSON.stringify({link: trackedProduct.link}),
                {
                    headers: { 
                        'Authorization': `Bearer ${auth.accessToken}`,
                        'Content-Type': 'application/json' 
                    },
                    withCredentials: true
                }
            )
            await axios.patch(
                PROD_URL,
                JSON.stringify({id: trackedProduct._id, price: newPrice.data}),
                {
                    headers: { 
                        'Authorization': `Bearer ${auth.accessToken}`,
                        'Content-Type': 'application/json' 
                    },
                    withCredentials: true
                }
            )
            fetchTracked()
        } catch (err) {
            console.log(err)
        }
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