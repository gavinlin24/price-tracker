import React from 'react'

const Product = ({ product }) => {
  return (
    <article className="product">
        <h2 className="productTitle">
            <a href={product.link}>
                {product.product}
            </a>
        </h2>
        <p className='productInfo'>
            {product.price}
        </p>
    </article>
  )
}

export default Product
