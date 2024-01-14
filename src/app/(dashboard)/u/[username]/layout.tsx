import { getSelfByUsername } from '@/data/auth'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import { Container } from './_components/container'
import { Navbar } from './_components/navbar'
import { Sidebar } from './_components/sidebar'

interface CreatorLayoutProps {
  params: { username: string }
  children: React.ReactNode
}

const CreatorLayout = async ({ params, children }: CreatorLayoutProps) => {
  const username = decodeURIComponent(params.username)
  const self = await getSelfByUsername(username)

  if (!self) {
    redirect('/')
  }

  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        {/* <Suspese fallback={'Loading...'}> */}
        <Sidebar />
        {/* </Suspese> */}
        <Container>{children}</Container>
      </div>
    </>
  )
}

export default CreatorLayout
