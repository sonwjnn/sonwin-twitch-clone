'use client'

import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'
import { useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'

interface ContainerProps {
  children: React.ReactNode
}

export const Container = ({ children }: ContainerProps) => {
  const { isCollapsed } = useSidebar(state => state)

  return (
    <div
      className={cn('flex-1', isCollapsed ? 'ml-[70px]' : 'ml-[70px] lg:ml-60')}
    >
      {children}
    </div>
  )
}
