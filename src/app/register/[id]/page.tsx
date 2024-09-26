import RegisterEvent from '@/app/components/RegisterEvent'
import React from 'react'

const page = ({params}:any) => {
  return (
    <div>
      <RegisterEvent params={params} />
    </div>
  )
}

export default page
