import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react'
import BreadCell from '../components/BreadCell'
import './Home.css'
import { useHistory } from 'react-router-dom';



function Home() {

    const history = useHistory()
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogin = () => {
        history.push('/login')
    }

    let bread = ['White', 'Wheat', 'Cinimon', 'Apple Cider Viniger', 'Dill', 'Chocolate']

    return (
        <div className='page'>
            <div className='header'>
                <div className='title-container'>
                    <h1 className='title'>
                        Shana's Sourdough
                    </h1>
                </div>
                <Button
                    aria-controls="simple-menu" 
                    aria-haspopup="true"
                    onClick={handleClick}
                    style={{
                        height: 60,
                        width: 60,
                        position: 'absolute',
                        top: '10px',
                        right: '10px'
                    }}>
                    <MenuIcon style={{
                        fill: '#ffffff',
                        height: 60,
                        width: 60
                    }} />
                </Button>
            </div>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogin}>Login</MenuItem>
            </Menu>
            <div className="bread-cell-grid">
                {
                    bread.map(bread => {
                        return (
                            <BreadCell bread={bread} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home