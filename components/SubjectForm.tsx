'use client';

import { useState } from 'react';
import { useStore } from '@/store/useStore';
import Button from './Button';
import Input from './Input';
import { generateId } from '@/utils/helpers';
import { Subject } from '@/types';

interface SubjectFormProps {
  subject?: Subject;
  onSuccess: () => void;
}

const colorOptions = [
  '#FF6B35', // primary
  '#4ECDC4', // secondary
  '#FFE66D', // yellow
  '#FF85C0', // pink
  '#9B5DE5', // purple
  '#00F5A0', // green
  '#00BBF9', // blue
  '#F15BB5', // magenta
  '#FEE440', // bright yellow
  '#00F5FF', // cyan
];

export default function SubjectForm({ subject, onSuccess }: SubjectFormProps) {
  const { addSubject, updateSubject } = useStore();
  
  const [name, setName] = useState(subject?.name || '');
  const [teacher, setTeacher] = useState(subject?.teacher || '');
  const [schedule, setSchedule] = useState(subject?.schedule || '');
  const [color, setColor] = useState(subject?.color || colorOptions[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subjectData: Subject = {
      id: subject?.id || generateId(),
      name,
      color,
      teacher: teacher || undefined,
      schedule: schedule || undefined,
    };

    if (subject) {
      updateSubject(subject.id, subjectData);
    } else {
      addSubject(subjectData);
    }

    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Nome da matéria"
        type="text"
        placeholder="Ex: Matemática"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <Input
        label="Professor(a) (opcional)"
        type="text"
        placeholder="Ex: Prof. Silva"
        value={teacher}
        onChange={(e) => setTeacher(e.target.value)}
      />

      <Input
        label="Horário (opcional)"
        type="text"
        placeholder="Ex: Seg/Qua 14:00-16:00"
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
      />

      <div>
        <label className="block mb-3 text-sm font-bold uppercase tracking-wide">
          Cor da matéria
        </label>
        <div className="grid grid-cols-5 gap-3">
          {colorOptions.map((colorOption) => (
            <button
              key={colorOption}
              type="button"
              onClick={() => setColor(colorOption)}
              className={`w-full aspect-square border-brutal transition-all ${
                color === colorOption
                  ? 'border-brutal-black border-brutal-thick shadow-brutal'
                  : 'border-brutal-black border-2'
              }`}
              style={{ backgroundColor: colorOption }}
            >
              {color === colorOption && (
                <span className="text-white text-2xl">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <Button type="submit" variant="primary" size="lg" fullWidth>
        {subject ? 'Atualizar' : 'Criar'} Matéria
      </Button>
    </form>
  );
}

