import Button from '@material-ui/core/Button'
import styled from "styled-components"


const bgColor = "#f3f3f3"



export const ProductRow = ({ order, product, productQuantityChange }) => {


    let quantity = order.products[product._id]


    return (
        <Row>
            <div style={{ alignItems: "center"}}>
                <div className='row-image-container' style={{marginRight: "30px"}}>
                    <img className='row-image' src={product.imageURL} />
                </div>
                <div style={{fontSize:"24px", fontWeight: "700"}}>{product.name}</div>
            </div>
            
                <RowQuantityContainer>
                    <Button style={{ borderRadius: "20px", fontSize: "20px" }} variant='contained' color='primary' size='small' onClick={() => productQuantityChange(product._id, -1)}>-</Button>
                    <QuantityDiv className='quantity'>{quantity}</QuantityDiv>
                    <Button style={{ borderRadius: "20px" }} variant='contained' color='primary' size='small' onClick={() => productQuantityChange(product._id, 1)}>+</Button>
                </RowQuantityContainer>
            
        </Row>
    )
}

export default ProductRow





const Row = styled.div`
    display:flex;
    height: 100px;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content:space-between;
    :nth-child(even){
        background-color:${bgColor}; 
    }
    :nth-child(odd){
        background-color:#cdcdcd;    
    }
    
`




const QuantityDiv = styled.div`
    font-size:24px;
    padding:0 12px;
    font-weight:bold;
`

const RowQuantityContainer = styled.div`
    margin-right:20px;
`



// const StyleInput = styled.input``