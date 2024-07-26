import TrackedProduct from "./TrackedProduct"

const TrackedFeed = ({ trackedProducts, fetchTracked}) => {
  return (
    <>
        {trackedProducts.map(trackedProduct => (
            <TrackedProduct 
                key={trackedProduct._id} 
                trackedProduct={trackedProduct} 
                fetchTracked={fetchTracked}  
            />
        ))}
    </>
  )
}

export default TrackedFeed