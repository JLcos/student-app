'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import Button from './Button';
import Input from './Input';
import TextArea from './TextArea';
import Select from './Select';
import Checkbox from './Checkbox';
import { generateId } from '@/utils/helpers';
import { Activity, Priority, SubTask } from '@/types';
import { MdAdd, MdDelete } from 'react-icons/md';

interface ActivityFormProps {
  activity?: Activity;
  onSuccess: () => void;
}

export default function ActivityForm({ activity, onSuccess }: ActivityFormProps) {
  const { subjects, addActivity, updateActivity } = useStore();
  
  const [title, setTitle] = useState(activity?.title || '');
  const [description, setDescription] = useState(activity?.description || '');
  const [subjectId, setSubjectId] = useState(activity?.subjectId || subjects[0]?.id || '');
  const [dueDate, setDueDate] = useState(
    activity?.dueDate
      ? new Date(activity.dueDate).toISOString().split('T')[0]
      : ''
  );
  const [priority, setPriority] = useState<Priority>(activity?.priority || 'medium');
  const [subTasks, setSubTasks] = useState<SubTask[]>(activity?.subTasks || []);
  const [newSubTask, setNewSubTask] = useState('');

  const handleAddSubTask = () => {
    if (newSubTask.trim()) {
      setSubTasks([
        ...subTasks,
        { id: generateId(), title: newSubTask, completed: false },
      ]);
      setNewSubTask('');
    }
  };

  const handleRemoveSubTask = (id: string) => {
    setSubTasks(subTasks.filter((st) => st.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const activityData: Activity = {
      id: activity?.id || generateId(),
      title,
      description,
      subjectId,
      dueDate: new Date(dueDate),
      priority,
      completed: activity?.completed || false,
      subTasks,
      attachments: activity?.attachments || [],
      reminders: activity?.reminders || [],
      createdAt: activity?.createdAt || new Date(),
    };

    if (activity) {
      updateActivity(activity.id, activityData);
    } else {
      addActivity(activityData);
    }

    onSuccess();
  };

  const subjectOptions = subjects.map((s) => ({ value: s.id, label: s.name }));
  const priorityOptions = [
    { value: 'low', label: 'Baixa' },
    { value: 'medium', label: 'Média' },
    { value: 'high', label: 'Alta' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Título da atividade"
        type="text"
        placeholder="Ex: Trabalho de Matemática"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <TextArea
        label="Descrição"
        placeholder="Detalhes sobre a atividade..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Matéria"
          options={subjectOptions}
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          required
        />

        <Select
          label="Prioridade"
          options={priorityOptions}
          value={priority}
          onChange={(e) => setPriority(e.target.value as Priority)}
          required
        />
      </div>

      <Input
        label="Data de entrega"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />

      {/* SubTasks */}
      <div>
        <label className="block mb-2 text-sm font-bold uppercase tracking-wide">
          Checklist (opcional)
        </label>
        
        <div className="space-y-2 mb-3">
          {subTasks.map((st) => (
            <div key={st.id} className="flex items-center gap-2 p-3 bg-brutal-gray border-2 border-brutal-black">
              <Checkbox checked={st.completed} readOnly />
              <span className="flex-1 font-bold">{st.title}</span>
              <button
                type="button"
                onClick={() => handleRemoveSubTask(st.id)}
                className="text-red-500 hover:text-red-700"
              >
                <MdDelete className="text-xl" />
              </button>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Nova subtarefa..."
            value={newSubTask}
            onChange={(e) => setNewSubTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSubTask())}
          />
          <Button
            type="button"
            variant="secondary"
            onClick={handleAddSubTask}
            className="flex-shrink-0"
          >
            <MdAdd className="text-2xl" />
          </Button>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="submit" variant="primary" size="lg" fullWidth>
          {activity ? 'Atualizar' : 'Criar'} Atividade
        </Button>
      </div>
    </form>
  );
}

