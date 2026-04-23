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

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    console.log('🔐 Начало авторизации...');
    console.log('Email:', email);

    try {
      const apiUrl = `${API_BASE_URL}/login`;
      console.log('📤 Отправка запроса на:', apiUrl);
      
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      console.log('📊 Статус ответа:', res.status);
      const data = await res.json();
      console.log('📦 Ответ сервера:', data);

      if (!res.ok) {
        throw new Error(data.detail || data.message || 'Ошибка авторизации');
      }

      // Сохраняем JWT токен в localStorage
      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
        console.log('Токен сохранён в localStorage');
        console.log('Авторизация успешна! Переход на /cabinet...');
        window.location.hash = routes.cabinet;
      } else if (data.token) {
        localStorage.setItem('token', data.token);
        console.log('Токен сохранён в localStorage');
        console.log('Авторизация успешна! Переход на /cabinet...');
        window.location.hash = routes.cabinet;
      } else {
        throw new Error('Токен не получен от сервера');
      }
    } catch (err) {
      console.error('❌ Ошибка авторизации:', err.message);
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
          <h1 style={{ fontSize: '32px', marginBottom: 'var(--spacing-md)' }}>Вход</h1>
          <p style={{ marginBottom: 'var(--spacing-lg)' }}>Введите данные для входа в личный кабинет</p>
          <form onSubmit={handleLogin} autoComplete="on">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="student@mail.ru"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                disabled={loading}
              />
            </div>
            {error && <div className="form-error" style={{ color: '#DC2626', marginBottom: 12 }}>{error}</div>}
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: 'var(--spacing-md)' }} disabled={loading}>
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: 'var(--spacing-md)', color: 'var(--color-text-secondary)' }}>
            Нет аккаунта? <a href={routes.register} style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: '600' }}>Зарегистрироваться</a>
          </p>
        </div>
      </div>
    </>
  );
}
