'use client'

import { useSidebar } from '@/store/use-sidebar'
import { User } from '@prisma/client'

import { UserItem, UserItemSkeleton } from './user-item'

interface RecommendedProps {
  data: (User & {
    stream: { isLive: boolean } | null
  })[]
}

export const Recommended = ({ data }: RecommendedProps) => {
  const { isCollapsed } = useSidebar(state => state)

  const showLabel = !isCollapsed && data.length > 0

  return (
    <div>
      {showLabel && (
        <div className="mb-4 pl-6">
          <p className="line-clamp-1 text-sm text-muted-foreground">
            Recommended
          </p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map(user => (
          <UserItem
            key={user.id}
            name={user.name || ''}
            imageUrl={user.image || ''}
            isLive={user.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  )
}

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  )
}
