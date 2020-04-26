import React from 'react'

import Loader from '@components/Loader'

const PageLoader = () => (
    <div className="w-full flex justify-center h-64 items-center">
        <div className="h-16 w-16">
            <Loader />
        </div>
    </div>
)

export default PageLoader
