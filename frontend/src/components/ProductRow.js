import Button from '@material-ui/core/Button'


export const ProductRow = ({ order, product, productQuantityChange }) => {


    let quantity = order.products[product._id]


    return (
        <div className='row'>
            <div className='row-image-container'>
                <img className='row-image' src={product.imageURL} />
            </div>
            <div>
                {product.name}
            </div>
            <div>
                <div className="row-quantity-container">
                    <Button style={{ borderRadius: "20px", fontSize: "20px" }} variant='contained' color='primary' size='small' onClick={() => productQuantityChange(product._id, -1)}>-</Button>
                    <div className='quantity'>{quantity}</div>
                    <Button style={{ borderRadius: "20px" }} variant='contained' color='primary' size='small' onClick={() => productQuantityChange(product._id, 1)}>+</Button>
                </div>
            </div>
        </div>
    )
}

export default ProductRow
