import React from 'react'
import SideNavigation from './SideNavigation'
import SideSpotify from './SideSpotify'
function Sidebar() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '90vh' }}>
            <SideNavigation />
            <SideSpotify />
        </div>
    )
}

export default Sidebar