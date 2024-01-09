'use client'

import { useViewerToken } from '@/hooks/use-viewer-token'
import { cn } from '@/lib/utils'
import { useChatSidebar } from '@/store/use-chat-sidebar'
import { LiveKitRoom } from '@livekit/components-react'
import { Stream, User } from '@prisma/client'

import { AboutCard } from './about-card'
import { Chat, ChatSkeleton } from './chat'
import { ChatHeaderSkeleton } from './chat-header'
import { ChatToggle } from './chat-toggle'
import { Header } from './header'
import { InfoCard } from './info-card'
import { Video, VideoSkeleton } from './video'

type CustomStream = {
  id: string
  isChatEnabled: boolean
  isChatDelayed: boolean
  isChatFollowersOnly: boolean
  isLive: boolean
  thumbnailUrl: string | null
  name: string
}

type CustomUser = {
  id: string
  name: string | null
  bio: string | null
  stream: CustomStream | null
  image: string | null
  _count: { followedBy: number }
}

interface StreamPlayerProps {
  user: CustomUser
  stream: CustomStream
  isFollowing: boolean
}

export const StreamPlayer = ({
  user,
  stream,
  isFollowing,
}: StreamPlayerProps) => {
  const { token, name, identity } = useViewerToken(user.id)

  const { collapsed } = useChatSidebar(state => state)

  if (!token || !name || !identity) return <StreamPlayerSkeleton />

  return (
    <>
      {collapsed && (
        <div className="fixed right-2 top-[100px] z-50 hidden lg:block">
          <ChatToggle />
        </div>
      )}
      <LiveKitRoom
        token={token}
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_SERVER_URL}
        className={cn(
          'grid h-full grid-cols-1 lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6',
          collapsed && 'lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2'
        )}
      >
        <div className="hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
          <Video hostName={user.name} hostIdentity={user.id} />
          <Header
            hostName={user.name}
            hostIdentity={user.id}
            viewerIdentity={identity}
            imageUrl={user.image}
            isFollowing={isFollowing}
            name={stream.name}
          />
          <InfoCard
            hostIdentity={user.id}
            viewerIdentity={identity}
            name={stream.name}
            thumbnailUrl={stream.thumbnailUrl}
          />
          <AboutCard
            hostName={user.name}
            hostIdentity={user.id}
            viewerIdentity={identity}
            bio={user.bio}
            followedByCount={user._count.followedBy}
          />
        </div>
        <div className={cn('col-span-1', collapsed && 'hidden')}>
          <Chat
            viewerName={name}
            hostName={user.name}
            hostIdentity={user.id}
            isFollowing={isFollowing}
            isChatEnabled={stream.isChatEnabled}
            isChatDelayed={stream.isChatDelayed}
            isChatFollowersOnly={stream.isChatFollowersOnly}
          />
        </div>
      </LiveKitRoom>
    </>
  )
}

export const StreamPlayerSkeleton = () => {
  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6">
      <div className="hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
        <VideoSkeleton />
        <ChatHeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <ChatSkeleton />
      </div>
    </div>
  )
}
