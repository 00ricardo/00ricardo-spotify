import React from 'react'
import SideNavigation from './SideNavigation'
import SideSpotify from './SideSpotify'
function Sidebar() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SideNavigation />
            <SideSpotify />
        </div>
    )
}

export default Sidebar