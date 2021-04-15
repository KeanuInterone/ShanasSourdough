import './ProductCell.css'
import Button from '@material-ui/core/Button'


function ProductCell({ order, product, productQuantityChange }) {

    let hasItem = product._id in order.products
    
    let quantity = 0
    if (hasItem) {
        quantity = order.products[product._id]
    }


    return (
        <div className='cell'>
            
            <div className='name'>
                {product.name} - ${product.price}
            </div>
            <div className='imageContainer'>
                <img className='image' src={product.imageURL}/>
            </div>
            {hasItem ? (
                <div>
                    <Button style={{borderRadius: "20px", fontSize: "20px"}} variant='contained' color='primary' size='small' onClick={() => productQuantityChange(product._id, -1)}>-</Button>
                    <div className='quantity'>{quantity}</div>
                    <Button style={{borderRadius: "20px"}} variant='contained' color='primary' size='small' onClick={() => productQuantityChange(product._id, 1)}>+</Button>
                </div>
                
            ) : 
            (
                <Button 
                style={{borderRadius: "20px"}}                
                variant='contained' color='primary' size='large' onClick={() => productQuantityChange(product._id, 1)}>
                    Add
                </Button>
            )
            }
        </div>
    )
}

export default ProductCell