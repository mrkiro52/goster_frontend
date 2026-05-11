import React, { useState } from 'react';
import { loginUser } from './config/api';

const routes = {
  home: '#/',
  login: '#/login',
  register: '#/register',
  cabinet: '#/cabinet',
};

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await loginUser(email, password);
      const token = data.access_token || data.token;
      if (token) {
        localStorage.setItem('token', token);
        window.location.hash = routes.cabinet;
      } else {
        throw new Error('Токен не получен от сервера');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F0F4FF 0%, #F8FAFC 100%)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Top bar */}
      <div style={{
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        background: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}>
        <a href={routes.home} style={{
          fontSize: '21px',
          fontWeight: '900',
          letterSpacing: '-0.04em',
          background: 'var(--color-gradient)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textDecoration: 'none',
        }}>
          GOSTER
        </a>
      </div>

      {/* Form wrapper */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 16px',
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          {/* Card */}
          <div style={{
            background: 'white',
            border: '1px solid var(--border)',
            borderRadius: 'var(--r-xl)',
            padding: '36px 32px',
            boxShadow: '0 4px 40px rgba(0,0,0,0.08)',
          }}>
            {/* Icon */}
            <div style={{
              width: '52px',
              height: '52px',
              borderRadius: 'var(--r-lg)',
              background: 'var(--color-primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              color: 'var(--color-primary)',
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>

            <h1 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '6px', letterSpacing: '-0.02em' }}>
              Вход в аккаунт
            </h1>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '28px' }}>
              Введите данные для входа в личный кабинет
            </p>

            <form onSubmit={handleLogin} autoComplete="on">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
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
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPass ? 'text' : 'password'}
                    className="form-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    disabled={loading}
                    style={{ paddingRight: '44px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass((v) => !v)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-faint)',
                      padding: '4px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {showPass ? (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="form-alert error" style={{ marginBottom: '20px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0, marginTop: '1px' }}>
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-full btn-lg"
                disabled={loading}
                style={{ marginBottom: '20px' }}
              >
                {loading ? (
                  <>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 0.8s linear infinite' }}>
                      <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                    </svg>
                    Входим...
                  </>
                ) : 'Войти в кабинет'}
              </button>
            </form>

            <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--text-muted)' }}>
              Нет аккаунта?{' '}
              <a href={routes.register} style={{ color: 'var(--color-primary)', fontWeight: '600' }}>
                Зарегистрироваться →
              </a>
            </p>
          </div>

          <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-faint)', marginTop: '20px' }}>
            Продолжая, вы соглашаетесь с условиями использования
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
