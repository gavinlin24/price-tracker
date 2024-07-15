import Product from "./Product"

const Feed = ({ products }) => {
  return (
    <>
        {products.map(product => (
            <Product key={product.id} product={product} />
        ))}
    </>
  )
}

export default Feed
