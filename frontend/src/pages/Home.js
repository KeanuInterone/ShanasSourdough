import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem';
import { useState } from 'react'
import BreadCell from '../components/BreadCell'
import styles from './Home.module.css'
import { useHistory } from 'react-router-dom';
import { API } from '../API'



export const Home = () => {

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
        <div className={styles.page}>
            <div className={styles.header}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>
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
            <div className={styles.breadCellGrid}>
                {
                    bread.map(bread => {
                        return (
                            <BreadCell key={bread} bread={bread} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home