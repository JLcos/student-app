'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import BottomNav from '@/components/BottomNav';
import FloatingAddButton from '@/components/FloatingAddButton';
import Card from '@/components/Card';
import Modal from '@/components/Modal';
import SubjectForm from '@/components/SubjectForm';
import { MdBook, MdEdit, MdDelete, MdAssignment } from 'react-icons/md';
import { Subject } from '@/types';

export default function SubjectsPage() {
  const router = useRouter();
  const { subjects, activities, deleteSubject } = useStore();
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | undefined>();

  const getActivityCount = (subjectId: string) => {
    return activities.filter((a) => a.subjectId === subjectId && !a.completed).length;
  };

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject);
    setShowSubjectModal(true);
  };

  const handleDelete = (subjectId: string) => {
    if (confirm('Tem certeza que deseja excluir esta matéria?')) {
      deleteSubject(subjectId);
    }
  };

  const handleCloseModal = () => {
    setShowSubjectModal(false);
    setEditingSubject(undefined);
  };

  return (
    <div className="min-h-screen bg-brutal-gray pb-24">
      {/* Header */}
      <div className="bg-accent-purple border-b-brutal border-brutal-black p-6">
        <h1 className="text-3xl font-bold text-white uppercase">Minhas Matérias</h1>
        <p className="text-white font-bold mt-1">{subjects.length} disciplinas</p>
      </div>

      {/* Subjects Grid */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map((subject) => {
          const activityCount = getActivityCount(subject.id);
          
          return (
            <Card
              key={subject.id}
              className="relative overflow-hidden"
              hoverable
              onClick={() => router.push(`/subjects/${subject.id}`)}
            >
              {/* Color Bar */}
              <div
                className="absolute top-0 left-0 right-0 h-2 border-b-brutal border-brutal-black"
                style={{ backgroundColor: subject.color }}
              />

              <div className="pt-2">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 flex items-center justify-center border-brutal border-brutal-black"
                      style={{ backgroundColor: subject.color }}
                    >
                      <MdBook className="text-2xl text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{subject.name}</h2>
                      {subject.teacher && (
                        <p className="text-sm text-gray-600 font-bold">
                          Prof. {subject.teacher}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(subject);
                      }}
                      className="p-2 bg-white border-brutal border-brutal-black shadow-brutal-sm hover:bg-gray-100 transition-all"
                    >
                      <MdEdit className="text-lg" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(subject.id);
                      }}
                      className="p-2 bg-red-500 text-white border-brutal border-brutal-black shadow-brutal-sm hover:bg-red-600 transition-all"
                    >
                      <MdDelete className="text-lg" />
                    </button>
                  </div>
                </div>

                {subject.schedule && (
                  <div className="mb-3">
                    <p className="text-sm font-bold text-gray-700">
                      📅 {subject.schedule}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2 bg-brutal-gray p-3 border-brutal border-brutal-black">
                  <MdAssignment className="text-xl" />
                  <span className="font-bold">
                    {activityCount} {activityCount === 1 ? 'atividade pendente' : 'atividades pendentes'}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}

        {subjects.length === 0 && (
          <Card className="col-span-full text-center p-12">
            <MdBook className="text-6xl mx-auto mb-4 text-gray-400" />
            <h3 className="text-2xl font-bold mb-2">Nenhuma matéria cadastrada</h3>
            <p className="text-gray-600">
              Clique no botão + para adicionar sua primeira matéria
            </p>
          </Card>
        )}
      </div>

      {/* Floating Add Button */}
      <FloatingAddButton onClick={() => setShowSubjectModal(true)} />

      {/* Subject Modal */}
      <Modal
        isOpen={showSubjectModal}
        onClose={handleCloseModal}
        title={editingSubject ? 'Editar Matéria' : 'Nova Matéria'}
      >
        <SubjectForm subject={editingSubject} onSuccess={handleCloseModal} />
      </Modal>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

