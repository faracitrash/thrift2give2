import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useAuth } from './AuthContext';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login, register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState('');

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = (type: 'login' | 'register') => {
    const newErrors: Record<string, string> = {};

    if (type === 'login') {
      if (!loginForm.email) newErrors.email = 'Email wajib diisi';
      else if (!validateEmail(loginForm.email)) newErrors.email = 'Format email tidak valid';
      
      if (!loginForm.password) newErrors.password = 'Password wajib diisi';
      else if (loginForm.password.length < 6) newErrors.password = 'Password minimal 6 karakter';
    } else {
      if (!registerForm.name) newErrors.name = 'Nama wajib diisi';
      else if (registerForm.name.length < 2) newErrors.name = 'Nama minimal 2 karakter';
      
      if (!registerForm.email) newErrors.email = 'Email wajib diisi';
      else if (!validateEmail(registerForm.email)) newErrors.email = 'Format email tidak valid';
      
      if (!registerForm.password) newErrors.password = 'Password wajib diisi';
      else if (registerForm.password.length < 6) newErrors.password = 'Password minimal 6 karakter';
      
      if (!registerForm.confirmPassword) newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
      else if (registerForm.password !== registerForm.confirmPassword) {
        newErrors.confirmPassword = 'Password tidak cocok';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm('login')) return;

    setIsLoading(true);
    try {
      const success = await login(loginForm.email, loginForm.password);
      if (success) {
        setSuccess('Login berhasil! Selamat datang kembali 🎉');
        setTimeout(() => {
          onClose();
          resetForms();
        }, 1500);
      } else {
        setErrors({ form: 'Email atau password salah. Coba lagi atau daftar akun baru.' });
      }
    } catch (error) {
      setErrors({ form: 'Terjadi kesalahan. Silakan coba lagi.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm('register')) return;

    setIsLoading(true);
    try {
      const success = await register(registerForm.name, registerForm.email, registerForm.password);
      if (success) {
        setSuccess('Pendaftaran berhasil! Selamat bergabung di KariaKita 🌱');
        setTimeout(() => {
          onClose();
          resetForms();
        }, 1500);
      } else {
        setErrors({ form: 'Email sudah terdaftar. Gunakan email lain atau login dengan akun existing.' });
      }
    } catch (error) {
      setErrors({ form: 'Terjadi kesalahan. Silakan coba lagi.' });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForms = () => {
    setLoginForm({ email: '', password: '' });
    setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
    setSuccess('');
    setShowPassword(false);
    setActiveTab('login');
  };

  const handleClose = () => {
    if (!isLoading) {
      onClose();
      resetForms();
    }
  };

  const inputClassName = (field: string) => 
    `transition-all duration-300 ${errors[field] ? 'border-red-300 focus:border-red-500' : 'border-green-200 focus:border-green-500'}`;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl">
        <DialogHeader className="text-center pb-4">
          <div className="mx-auto mb-4 w-16 h-16 gradient-primary rounded-full flex items-center justify-center">
            <div className="text-2xl">🌱</div>
          </div>
          <DialogTitle className="text-2xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {activeTab === 'login' ? 'Masuk ke KariaKita' : 'Bergabung dengan KariaKita'}
          </DialogTitle>
          <p className="text-muted-foreground mt-2">
            {activeTab === 'login' 
              ? 'Lanjutkan misi sustainable living Anda' 
              : 'Mulai perjalanan ramah lingkungan bersama kami'
            }
          </p>
        </DialogHeader>

        {/* Success Message */}
        {success && (
          <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 mb-4 animate-in slide-in-from-top-2">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">{success}</span>
          </div>
        )}

        {/* Error Message */}
        {errors.form && (
          <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-4 animate-in slide-in-from-top-2">
            <XCircle className="h-5 w-5" />
            <span className="font-medium">{errors.form}</span>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" className="font-medium">Masuk</TabsTrigger>
            <TabsTrigger value="register" className="font-medium">Daftar</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login" className="space-y-4 mt-0">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-green-600" />
                  Email
                </Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="nama@email.com"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  className={inputClassName('email')}
                  disabled={isLoading}
                />
                {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-green-600" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Masukkan password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    className={inputClassName('password') + ' pr-10'}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
              </div>

              <Button
                type="submit"
                className="w-full gradient-primary text-white font-semibold py-3 hover:shadow-glow transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Memproses...
                  </>
                ) : (
                  'Masuk ke Akun'
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  className="text-green-600 hover:text-green-700 hover:underline"
                  onClick={() => setActiveTab('register')}
                >
                  Belum punya akun? Daftar di sini
                </button>
              </div>
            </form>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register" className="space-y-4 mt-0">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-green-600" />
                  Nama Lengkap
                </Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Nama lengkap Anda"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                  className={inputClassName('name')}
                  disabled={isLoading}
                />
                {errors.name && <p className="text-red-500 mt-1">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-green-600" />
                  Email
                </Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="nama@email.com"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                  className={inputClassName('email')}
                  disabled={isLoading}
                />
                {errors.email && <p className="text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-green-600" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="register-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Minimal 6 karakter"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                    className={inputClassName('password') + ' pr-10'}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 mt-1">{errors.password}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-confirm-password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-green-600" />
                  Konfirmasi Password
                </Label>
                <Input
                  id="register-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ulangi password"
                  value={registerForm.confirmPassword}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className={inputClassName('confirmPassword')}
                  disabled={isLoading}
                />
                {errors.confirmPassword && <p className="text-red-500 mt-1">{errors.confirmPassword}</p>}
              </div>

              <Button
                type="submit"
                className="w-full gradient-primary text-white font-semibold py-3 hover:shadow-glow transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Mendaftarkan...
                  </>
                ) : (
                  'Daftar Akun Baru'
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  className="text-green-600 hover:text-green-700 hover:underline"
                  onClick={() => setActiveTab('login')}
                >
                  Sudah punya akun? Masuk di sini
                </button>
              </div>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-muted-foreground">
            Dengan mendaftar, Anda menyetujui{' '}
            <button className="text-green-600 hover:underline">Syarat & Ketentuan</button>
            {' '}dan{' '}
            <button className="text-green-600 hover:underline">Kebijakan Privasi</button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}