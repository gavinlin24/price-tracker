import Feed from "../components/Feed"

const Search = ( { products, isLoading }) => {
  return (
    <main className="Home">
        { isLoading ? (
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

export default Search
