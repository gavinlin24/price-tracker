import TrackedProduct from "./TrackedProduct"

const TrackedFeed = ({ trackedProducts }) => {
  return (
    <>
        {trackedProducts.map(trackedProduct => (
            <TrackedProduct key={trackedProduct._id} trackedProduct={trackedProduct} />
        ))}
    </>
  )
}

export default TrackedFeed