'use client';

import { useStore } from '@/store/useStore';

export default function NotificationBadge() {
  const notifications = useStore((state) => state.notifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  if (unreadCount === 0) return null;

  return (
    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-brutal-black rounded-full flex items-center justify-center">
      <span className="text-white text-xs font-bold">
        {unreadCount > 9 ? '9+' : unreadCount}
      </span>
    </div>
  );
}

