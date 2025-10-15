'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/useStore';
import BottomNav from '@/components/BottomNav';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Modal from '@/components/Modal';
import { 
  MdPerson, 
  MdEmail, 
  MdSchool, 
  MdNotifications, 
  MdDarkMode,
  MdLogout,
  MdEdit,
  MdSave,
  MdCancel
} from 'react-icons/md';
import { UserRole } from '@/types';

export default function ProfilePage() {
  const router = useRouter();
  const { user, setUser } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [classRoom, setClassRoom] = useState(user?.class || '');
  const [role, setRole] = useState<UserRole>(user?.role || 'student');

  // Settings
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  const handleSave = () => {
    if (user) {
      setUser({
        ...user,
        name,
        email,
        class: classRoom || undefined,
        role,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setClassRoom(user?.class || '');
    setRole(user?.role || 'student');
    setIsEditing(false);
  };

  const handleLogout = () => {
    setUser(null);
    router.push('/welcome');
  };

  const roleOptions = [
    { value: 'student', label: 'Estudante' },
    { value: 'teacher', label: 'Professor' },
    { value: 'parent', label: 'Responsável' },
  ];

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-brutal-gray pb-24">
      {/* Header */}
      <div className="bg-primary border-b-brutal border-brutal-black p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white uppercase">Perfil</h1>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-3 bg-white border-brutal border-brutal-black shadow-brutal hover:shadow-brutal-sm transition-all"
            >
              <MdEdit className="text-2xl" />
            </button>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Profile Section */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-secondary border-brutal border-brutal-black flex items-center justify-center">
              <MdPerson className="text-5xl text-white" />
            </div>
            <div>
              {!isEditing ? (
                <>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-gray-600 font-bold capitalize">{user.role === 'student' ? 'Estudante' : user.role === 'teacher' ? 'Professor' : 'Responsável'}</p>
                </>
              ) : (
                <h2 className="text-xl font-bold">Editando Perfil</h2>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <Input
                label="Nome"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Turma (opcional)"
                type="text"
                placeholder="Ex: 3º Ano A"
                value={classRoom}
                onChange={(e) => setClassRoom(e.target.value)}
              />

              <Select
                label="Tipo de conta"
                options={roleOptions}
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
              />

              <div className="flex gap-3 pt-4">
                <Button
                  variant="primary"
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <MdSave className="text-xl" />
                  Salvar
                </Button>
                <Button
                  variant="danger"
                  onClick={handleCancel}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <MdCancel className="text-xl" />
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-brutal-gray border-2 border-brutal-black">
                <MdEmail className="text-2xl text-gray-600" />
                <div>
                  <p className="text-xs font-bold uppercase text-gray-600">Email</p>
                  <p className="font-bold">{user.email}</p>
                </div>
              </div>

              {user.class && (
                <div className="flex items-center gap-3 p-3 bg-brutal-gray border-2 border-brutal-black">
                  <MdSchool className="text-2xl text-gray-600" />
                  <div>
                    <p className="text-xs font-bold uppercase text-gray-600">Turma</p>
                    <p className="font-bold">{user.class}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </Card>

        {/* Settings Section */}
        <Card className="p-6">
          <h3 className="text-xl font-bold uppercase mb-4">Preferências</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-brutal-gray border-2 border-brutal-black">
              <div className="flex items-center gap-3">
                <MdDarkMode className="text-2xl" />
                <div>
                  <p className="font-bold">Modo Escuro</p>
                  <p className="text-sm text-gray-600">Em breve disponível</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-16 h-8 border-brutal border-brutal-black transition-all ${
                  darkMode ? 'bg-primary' : 'bg-gray-300'
                }`}
                disabled
              >
                <div
                  className={`w-6 h-6 bg-white border-2 border-brutal-black transition-all ${
                    darkMode ? 'translate-x-8' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-brutal-gray border-2 border-brutal-black">
              <div className="flex items-center gap-3">
                <MdNotifications className="text-2xl" />
                <div>
                  <p className="font-bold">Notificações Push</p>
                  <p className="text-sm text-gray-600">Receber lembretes no app</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-16 h-8 border-brutal border-brutal-black transition-all ${
                  notifications ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white border-2 border-brutal-black transition-all ${
                    notifications ? 'translate-x-8' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-brutal-gray border-2 border-brutal-black">
              <div className="flex items-center gap-3">
                <MdEmail className="text-2xl" />
                <div>
                  <p className="font-bold">Notificações por Email</p>
                  <p className="text-sm text-gray-600">Resumo semanal</p>
                </div>
              </div>
              <button
                onClick={() => setEmailNotifications(!emailNotifications)}
                className={`w-16 h-8 border-brutal border-brutal-black transition-all ${
                  emailNotifications ? 'bg-primary' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 bg-white border-2 border-brutal-black transition-all ${
                    emailNotifications ? 'translate-x-8' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </Card>

        {/* Privacy Section */}
        <Card className="p-6">
          <h3 className="text-xl font-bold uppercase mb-4">Privacidade</h3>
          <p className="text-gray-700 mb-4">
            Controle quem pode ver suas atividades e progresso
          </p>
          
          <div className="space-y-2">
            <label className="flex items-center p-3 bg-brutal-gray border-2 border-brutal-black cursor-pointer hover:bg-gray-200">
              <input type="checkbox" className="mr-3 w-5 h-5" defaultChecked />
              <span className="font-bold">Pais/Responsáveis</span>
            </label>
            <label className="flex items-center p-3 bg-brutal-gray border-2 border-brutal-black cursor-pointer hover:bg-gray-200">
              <input type="checkbox" className="mr-3 w-5 h-5" defaultChecked />
              <span className="font-bold">Professores</span>
            </label>
            <label className="flex items-center p-3 bg-brutal-gray border-2 border-brutal-black cursor-pointer hover:bg-gray-200">
              <input type="checkbox" className="mr-3 w-5 h-5" />
              <span className="font-bold">Outros estudantes</span>
            </label>
          </div>
        </Card>

        {/* Logout Button */}
        <Button
          variant="danger"
          size="lg"
          fullWidth
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center justify-center gap-2"
        >
          <MdLogout className="text-2xl" />
          Sair da conta
        </Button>
      </div>

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirmar saída"
      >
        <div className="text-center py-6">
          <p className="text-xl font-bold mb-6">
            Tem certeza que deseja sair da sua conta?
          </p>
          <div className="flex gap-4">
            <Button
              variant="danger"
              size="lg"
              fullWidth
              onClick={handleLogout}
            >
              Sim, sair
            </Button>
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              onClick={() => setShowLogoutModal(false)}
            >
              Cancelar
            </Button>
          </div>
        </div>
      </Modal>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

