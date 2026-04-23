import React, { useState } from 'react';
import { API_BASE_URL } from './config/api';

const routes = {
  home: '#/',
  login: '#/login',
  register: '#/register',
  cabinet: '#/cabinet',
};

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <a href={routes.home} className="navbar-logo">
            GOSTER
          </a>
          <ul className="navbar-nav">
            <li><a href="#features">Возможности</a></li>
            <li><a href="#pricing">Токены</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
          <div className="navbar-actions">
            <a href={routes.login} className="btn btn-ghost btn-small" style={{ textDecoration: 'none' }}>Войти</a>
            <a href={routes.register} className="btn btn-primary btn-small">Создать аккаунт</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export function Register({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setPasswordMismatch(false);

    // Проверка совпадения паролей
    if (password !== passwordConfirm) {
      setPasswordMismatch(true);
      setError('Пароли не совпадают');
      return;
    }

    if (password.length < 3) {
      setError('Пароль должен быть не менее 3 символов');
      return;
    }

    setLoading(true);
    
    console.log('📝 Начало регистрации...');
    console.log('Email:', email);
    console.log('Пароль: ***');

    try {
      const apiUrl = `${API_BASE_URL}/register`;
      console.log('📤 Отправка запроса на:', apiUrl);
      
      const payload = { email, password, role: 'user' };
      console.log('📦 Payload (без пароля):', { email, role: 'user' });

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log('📊 Статус ответа:', res.status);
      const data = await res.json();
      console.log('📦 Ответ сервера:', data);

      if (!res.ok) {
        throw new Error(data.detail || data.message || 'Ошибка регистрации');
      }

      console.log('✅ Аккаунт успешно создан!');
      setSuccess(true);
      
      // Очищаем форму
      setEmail('');
      setPassword('');
      setPasswordConfirm('');

      // Показываем сообщение об успехе и перенаправляем на логин через 2 секунды
      setTimeout(() => {
        console.log('🔄 Перенаправление на страницу авторизации...');
        if (onSuccess) onSuccess();
        window.location.hash = routes.login;
      }, 2000);
    } catch (err) {
      console.error('❌ Ошибка регистрации:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ minHeight: 'calc(100vh - 70px)', display: 'grid', placeItems: 'center', padding: 'var(--spacing-2xl)' }}>
        <div className="card" style={{ maxWidth: '400px', width: '100%' }}>
          <h1 style={{ fontSize: '32px', marginBottom: 'var(--spacing-md)' }}>Регистрация</h1>
          <p style={{ marginBottom: 'var(--spacing-lg)' }}>Создайте новый аккаунт</p>
          <form onSubmit={handleSubmit} autoComplete="on">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="student@mail.ru"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="username"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Пароль</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Подтверждение пароля</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                placeholder="••••••••"
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
                autoComplete="new-password"
                required
                disabled={loading}
                style={{ borderColor: passwordMismatch ? '#DC2626' : undefined }}
              />
            </div>
            {error && <div className="form-error" style={{ color: '#DC2626', marginBottom: 12 }}>{error}</div>}
            {success && <div className="form-success" style={{ color: '#16A34A', marginBottom: 12 }}>✅ Аккаунт успешно создан! Авторизуйтесь и начните работать.</div>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: 'var(--spacing-md)' }} disabled={loading}>
              {loading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 'var(--spacing-md)', color: 'var(--color-text-secondary)' }}>
            Есть аккаунт? <a href={routes.login} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: '600' }}>Войти</a>
          </p>
        </div>
      </div>
    </>
  );
}
