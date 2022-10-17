import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter>
      <div>
        {/* <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          CoreUI
        </a> */}
        <span className="ms-1">&copy; 2022 KYC.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by KYC</span>
        {/* <a href="https://coreui.io/react" target="_blank" rel="noopener noreferrer">
          NAME OF ...
        </a> */}
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
