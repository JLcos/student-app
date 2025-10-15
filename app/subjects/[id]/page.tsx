'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import BottomNav from '@/components/BottomNav';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import ActivityForm from '@/components/ActivityForm';
import { formatDate, getPriorityColor, getPriorityLabel } from '@/utils/helpers';
import { MdArrowBack, MdCheckCircle, MdRadioButtonUnchecked, MdCalendarToday, MdEdit } from 'react-icons/md';
import { Activity } from '@/types';

interface SubjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function SubjectDetailPage({ params }: SubjectDetailPageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { subjects, activities, toggleActivityComplete } = useStore();
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | undefined>();

  const subject = subjects.find((s) => s.id === id);
  const subjectActivities = activities
    .filter((a) => a.subjectId === id)
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());

  const pendingActivities = subjectActivities.filter((a) => !a.completed);
  const completedActivities = subjectActivities.filter((a) => a.completed);

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
    setShowActivityModal(true);
  };

  const handleCloseModal = () => {
    setShowActivityModal(false);
    setEditingActivity(undefined);
  };

  if (!subject) {
    return (
      <div className="min-h-screen bg-brutal-gray flex items-center justify-center p-6">
        <Card className="text-center p-12">
          <h1 className="text-2xl font-bold mb-4">Matéria não encontrada</h1>
          <Button onClick={() => router.push('/subjects')}>
            Voltar para Matérias
          </Button>
        </Card>
      </div>
    );
  }

  const ActivityItem = ({ activity }: { activity: Activity }) => (
    <Card hoverable className="mb-3">
      <div className="flex items-start gap-4">
        <button
          className="flex-shrink-0 text-3xl transition-colors"
          onClick={() => toggleActivityComplete(activity.id)}
        >
          {activity.completed ? (
            <MdCheckCircle className="text-accent-green" />
          ) : (
            <MdRadioButtonUnchecked className="text-gray-400" />
          )}
        </button>

        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={`font-bold text-lg ${activity.completed ? 'line-through text-gray-500' : ''}`}>
              {activity.title}
            </h3>
            <Badge color={getPriorityColor(activity.priority)} className="text-xs">
              {getPriorityLabel(activity.priority)}
            </Badge>
          </div>

          {activity.description && (
            <p className="text-gray-700 mb-2 text-sm">{activity.description}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <MdCalendarToday />
              <span className="font-bold">{formatDate(activity.dueDate)}</span>
            </div>

            <button
              onClick={() => handleEdit(activity)}
              className="p-2 bg-white border-2 border-brutal-black hover:bg-gray-100 transition-all"
            >
              <MdEdit className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-brutal-gray pb-24">
      {/* Header */}
      <div
        className="border-b-brutal border-brutal-black p-6"
        style={{ backgroundColor: subject.color }}
      >
        <button
          onClick={() => router.back()}
          className="mb-4 p-2 bg-white border-brutal border-brutal-black shadow-brutal-sm hover:shadow-brutal transition-all"
        >
          <MdArrowBack className="text-2xl" />
        </button>

        <h1 className="text-3xl font-bold text-white uppercase mb-2">
          {subject.name}
        </h1>
        
        {subject.teacher && (
          <p className="text-white font-bold">Prof. {subject.teacher}</p>
        )}
        
        {subject.schedule && (
          <p className="text-white font-bold mt-1">📅 {subject.schedule}</p>
        )}

        <div className="mt-4 flex gap-3">
          <div className="bg-white border-brutal border-brutal-black px-4 py-2">
            <span className="font-bold">{pendingActivities.length} pendentes</span>
          </div>
          <div className="bg-white border-brutal border-brutal-black px-4 py-2">
            <span className="font-bold">{completedActivities.length} concluídas</span>
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="p-6">
        {/* Pending */}
        {pendingActivities.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold uppercase mb-4">Atividades Pendentes</h2>
            {pendingActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        )}

        {/* Completed */}
        {completedActivities.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold uppercase mb-4 text-gray-600">
              Concluídas
            </h2>
            {completedActivities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        )}

        {subjectActivities.length === 0 && (
          <Card className="text-center p-12">
            <p className="text-xl font-bold text-gray-500">
              Nenhuma atividade cadastrada para esta matéria
            </p>
            <p className="text-gray-600 mt-2">
              Use o Dashboard ou Calendário para adicionar atividades
            </p>
          </Card>
        )}
      </div>

      {/* Activity Modal */}
      <Modal
        isOpen={showActivityModal}
        onClose={handleCloseModal}
        title={editingActivity ? 'Editar Atividade' : 'Nova Atividade'}
        size="lg"
      >
        <ActivityForm activity={editingActivity} onSuccess={handleCloseModal} />
      </Modal>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

