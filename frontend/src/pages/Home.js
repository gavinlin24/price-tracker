import Feed from "../components/Feed"

const Home = ( { products, loading}) => {
  return (
    <main className="Home">
        { loading ? (
          <p style={{ marginTop: "2rem" }}>
            Loading...
          </p>
        )
          : products.length ? (
            <Feed products={products} />
        ) : (
            <p style={{ marginTop: "2rem" }}>
                No products to display.
            </p>
        )}
    </main>
  )
}

export default Home
