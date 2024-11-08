import { AreaChartComponent } from '@/components/custom/charts/area-chart'
import ListImputados from '@/components/custom/dashboard/list-imputados'
import React from 'react'

export default function page() {
  return (
    <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-5'>
      <ListImputados />
      <AreaChartComponent />
    </div>
  )
}
