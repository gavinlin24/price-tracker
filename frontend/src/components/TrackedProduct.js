const TrackedProduct = ({ trackedProduct }) => {
    return (
      <article className="product">
          <h2 className="productTitle">
              <a href={trackedProduct.link}>
                  {trackedProduct.name}
              </a>
          </h2>
          <p className='productInfo'>
              Last Price: {trackedProduct.price}
          </p>
      </article>
    )
  }
  
  export default TrackedProduct