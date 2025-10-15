'use client';

import { useStore } from '@/store/useStore';
import { useRouter } from 'next/navigation';
import BottomNav from '@/components/BottomNav';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Badge from '@/components/Badge';
import { formatDate } from '@/utils/helpers';
import { MdNotifications, MdCheckCircle, MdWarning, MdInfo, MdDelete } from 'react-icons/md';
import { Notification } from '@/types';

export default function NotificationsPage() {
  const router = useRouter();
  const { notifications, activities, subjects, markNotificationRead, clearNotifications } = useStore();

  const unreadNotifications = notifications.filter((n) => !n.read);
  const readNotifications = notifications.filter((n) => n.read);

  const handleNotificationClick = (notification: Notification) => {
    markNotificationRead(notification.id);
    if (notification.activityId) {
      const activity = activities.find((a) => a.id === notification.activityId);
      if (activity) {
        const subject = subjects.find((s) => s.id === activity.subjectId);
        if (subject) {
          router.push(`/subjects/${subject.id}`);
        }
      }
    }
  };

  const getNotificationIcon = (notification: Notification) => {
    if (notification.title.includes('Atenção') || notification.title.includes('Atrasada')) {
      return <MdWarning className="text-3xl text-accent-pink" />;
    } else if (notification.title.includes('Concluída')) {
      return <MdCheckCircle className="text-3xl text-accent-green" />;
    } else {
      return <MdInfo className="text-3xl text-secondary" />;
    }
  };

  const NotificationItem = ({ notification }: { notification: Notification }) => (
    <Card
      hoverable
      className={`mb-3 ${notification.read ? 'opacity-60' : ''}`}
      onClick={() => handleNotificationClick(notification)}
    >
      <div className="flex items-start gap-4">
        {getNotificationIcon(notification)}
        
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-bold text-lg">{notification.title}</h3>
            {!notification.read && (
              <Badge color="#FF6B35" className="text-xs">NOVA</Badge>
            )}
          </div>
          
          <p className="text-gray-700 mb-2">{notification.message}</p>
          
          <p className="text-sm text-gray-500 font-bold">
            {formatDate(notification.createdAt, "dd/MM/yyyy 'às' HH:mm")}
          </p>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-brutal-gray pb-24">
      {/* Header */}
      <div className="bg-accent-pink border-b-brutal border-brutal-black p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <MdNotifications className="text-4xl text-white" />
            <h1 className="text-3xl font-bold text-white uppercase">Notificações</h1>
          </div>
          {unreadNotifications.length > 0 && (
            <div className="bg-white border-brutal border-brutal-black px-4 py-2">
              <span className="font-bold text-lg">{unreadNotifications.length}</span>
            </div>
          )}
        </div>
        
        {notifications.length > 0 && (
          <button
            onClick={() => {
              if (confirm('Limpar todas as notificações?')) {
                clearNotifications();
              }
            }}
            className="mt-3 flex items-center gap-2 text-white font-bold hover:underline"
          >
            <MdDelete className="text-xl" />
            Limpar tudo
          </button>
        )}
      </div>

      <div className="p-6">
        {/* No notifications */}
        {notifications.length === 0 && (
          <Card className="text-center p-12">
            <MdNotifications className="text-6xl mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-bold mb-2">Nenhuma notificação</h3>
            <p className="text-gray-600 mb-6">
              Você receberá lembretes sobre suas atividades aqui
            </p>
            <Button onClick={() => router.push('/dashboard')}>
              Ir para Dashboard
            </Button>
          </Card>
        )}

        {/* Unread Notifications */}
        {unreadNotifications.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold uppercase mb-4">Não lidas</h2>
            {unreadNotifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
        )}

        {/* Read Notifications */}
        {readNotifications.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold uppercase mb-4 text-gray-600">Lidas</h2>
            {readNotifications.map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

