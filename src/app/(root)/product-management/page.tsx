import React from 'react'
import dynamic from 'next/dynamic'
import LazyLoading from '@/components/LazyLoading'

const ProductManagement = dynamic(() => import('@/views/app/product'), {
  loading: () => <LazyLoading />
})

const ProductManagementPage: React.FC = async () => {
  return <ProductManagement />
}

export default ProductManagementPage
