import './BreadCell.css'
import Button from '@material-ui/core/Button'


function BreadCell({ bread }) {


    return (
        <div className='cell'>
            <div>
                {bread}
            </div>
            <div className='image'>

            </div>
            <Button variant='contained' color='primary' size='large'>
                Add
            </Button>


        </div>
    )
}

export default BreadCell