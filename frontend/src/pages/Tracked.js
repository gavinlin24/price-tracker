import TrackedFeed from "../components/TrackedFeed"

const Tracked = ({ trackedProducts, isLoading }) => {

    return (
        <main className="Search">
            { isLoading ? (
              <p style={{ marginTop: "2rem" }}>
                Loading...
              </p>
            )
              : trackedProducts.length ? (
                <TrackedFeed trackedProducts={trackedProducts} />
            ) : (
                <p style={{ marginTop: "2rem" }}>
                    No products to display.
                </p>
            )}
        </main>
    )

}

export default Tracked
