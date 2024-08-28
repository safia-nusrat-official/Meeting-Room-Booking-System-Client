import SectionHeading from '@/components/shared/SectionHeading'
import { getUser } from '@/redux/features/authSlice'
import { useAppSelector } from '@/redux/hooks'
import { TUser } from '@/types/user.types'
import React from 'react'

const AdminDashboard = () => {
  const user = useAppSelector(getUser) as TUser
  return (
    <section className='md:m-10 bg-yellow-300'>
      <SectionHeading mode="dark" center>Welcome Back, {user.name}!</SectionHeading>
    </section>
  )
}

export default AdminDashboard