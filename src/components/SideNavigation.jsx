import React from 'react'
import { HomeOutlined, SearchOutlined } from '@mui/icons-material';
function SideNavigation() {
    return (
        <div className='native-navigation container-1'>
            <span className='navigation-items'>
                <HomeOutlined fontSize='large' />
                <span style={{ paddingLeft: '15px', fontWeight: 'bold' }}>Início</span>
            </span>
            <span className='navigation-items'>
                <SearchOutlined fontSize='large' />
                <span style={{ paddingLeft: '15px', fontWeight: 'bold' }}>Buscar</span>
            </span>
        </div>
    )
}

export default SideNavigation