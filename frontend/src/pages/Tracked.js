import TrackedFeed from "../components/TrackedFeed"

const Tracked = ({ trackedProducts, fetchTracked, isLoading }) => {

    return (
        <main className="Search">
            { isLoading ? (
              <p style={{ marginTop: "2rem" }}>
                Loading...
              </p>
            )
              : trackedProducts.length ? (
                <TrackedFeed 
                    trackedProducts={trackedProducts} 
                    fetchTracked={fetchTracked}  
                />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    No products tracked.
                </p>
            )}
        </main>
    )

}

export default Tracked
