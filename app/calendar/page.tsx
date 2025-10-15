'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import BottomNav from '@/components/BottomNav';
import FloatingAddButton from '@/components/FloatingAddButton';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import Modal from '@/components/Modal';
import ActivityForm from '@/components/ActivityForm';
import { formatDate, getWeekDays } from '@/utils/helpers';
import { MdChevronLeft, MdChevronRight, MdFilterList } from 'react-icons/md';
import { addDays, subDays, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns';

export default function CalendarPage() {
  const { activities, subjects } = useStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'week' | 'month'>('week');
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [showActivityModal, setShowActivityModal] = useState(false);

  const getSubjectById = (id: string) => subjects.find((s) => s.id === id);

  // Filter activities
  const filteredActivities = selectedSubject
    ? activities.filter((a) => a.subjectId === selectedSubject)
    : activities;

  // Get days to display
  const getDays = () => {
    if (view === 'week') {
      return getWeekDays(currentDate);
    } else {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      return eachDayOfInterval({ start, end });
    }
  };

  const days = getDays();

  const getActivitiesForDay = (day: Date) => {
    return filteredActivities.filter((a) => isSameDay(new Date(a.dueDate), day));
  };

  const navigatePrev = () => {
    if (view === 'week') {
      setCurrentDate(subDays(currentDate, 7));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    }
  };

  const navigateNext = () => {
    if (view === 'week') {
      setCurrentDate(addDays(currentDate, 7));
    } else {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    }
  };

  return (
    <div className="min-h-screen bg-brutal-gray pb-24">
      {/* Header */}
      <div className="bg-secondary border-b-brutal border-brutal-black p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-white uppercase">Calendário</h1>
          
          <div className="flex gap-2">
            <button
              onClick={() => setView('week')}
              className={`px-4 py-2 font-bold border-brutal border-brutal-black ${
                view === 'week' ? 'bg-white text-brutal-black' : 'bg-transparent text-white'
              }`}
            >
              Semana
            </button>
            <button
              onClick={() => setView('month')}
              className={`px-4 py-2 font-bold border-brutal border-brutal-black ${
                view === 'month' ? 'bg-white text-brutal-black' : 'bg-transparent text-white'
              }`}
            >
              Mês
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={navigatePrev}
            className="p-2 bg-white border-brutal border-brutal-black shadow-brutal hover:shadow-brutal-sm transition-all"
          >
            <MdChevronLeft className="text-2xl" />
          </button>

          <h2 className="text-xl font-bold text-white">
            {formatDate(currentDate, 'MMMM yyyy')}
          </h2>

          <button
            onClick={navigateNext}
            className="p-2 bg-white border-brutal border-brutal-black shadow-brutal hover:shadow-brutal-sm transition-all"
          >
            <MdChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="p-6 bg-white border-b-brutal border-brutal-black">
        <div className="flex items-center gap-2 mb-3">
          <MdFilterList className="text-xl" />
          <span className="font-bold uppercase text-sm">Filtrar por matéria:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSubject(null)}
            className={`px-4 py-2 font-bold text-sm border-brutal border-brutal-black ${
              selectedSubject === null
                ? 'bg-brutal-black text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
          >
            Todas
          </button>
          
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject.id)}
              className={`px-4 py-2 font-bold text-sm border-brutal border-brutal-black ${
                selectedSubject === subject.id
                  ? 'text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
              style={{
                backgroundColor: selectedSubject === subject.id ? subject.color : undefined,
              }}
            >
              {subject.name}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        <div className={`grid ${view === 'week' ? 'grid-cols-7' : 'grid-cols-7'} gap-2`}>
          {/* Day headers */}
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
            <div key={day} className="text-center font-bold text-sm uppercase py-2">
              {day}
            </div>
          ))}

          {/* Days */}
          {days.map((day, index) => {
            const dayActivities = getActivitiesForDay(day);
            const isToday = isSameDay(day, new Date());

            return (
              <Card
                key={index}
                className={`min-h-[100px] p-2 ${
                  isToday ? 'bg-accent-yellow' : ''
                } ${view === 'month' && !isSameMonth(day, currentDate) ? 'opacity-50' : ''}`}
              >
                <div className={`font-bold text-sm mb-1 ${isToday ? 'text-2xl' : ''}`}>
                  {formatDate(day, 'd')}
                </div>
                
                <div className="space-y-1">
                  {dayActivities.slice(0, 3).map((activity) => {
                    const subject = getSubjectById(activity.subjectId);
                    return (
                      <div
                        key={activity.id}
                        className="text-xs p-1 border-2 border-brutal-black font-bold truncate"
                        style={{ backgroundColor: subject?.color }}
                      >
                        {activity.title}
                      </div>
                    );
                  })}
                  {dayActivities.length > 3 && (
                    <div className="text-xs font-bold text-gray-600">
                      +{dayActivities.length - 3} mais
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Floating Add Button */}
      <FloatingAddButton onClick={() => setShowActivityModal(true)} />

      {/* Activity Modal */}
      <Modal
        isOpen={showActivityModal}
        onClose={() => setShowActivityModal(false)}
        title="Nova Atividade"
        size="lg"
      >
        <ActivityForm onSuccess={() => setShowActivityModal(false)} />
      </Modal>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

