import React, { useState, useEffect } from 'react';

const routes = {
  home: '#/',
  login: '#/login',
  register: '#/register',
  students: '#/students',
  business: '#/business',
  universities: '#/universities',
  cabinet: '#/cabinet',
};

export function Navbar({ isLoggedIn = false }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    const token = localStorage.getItem('token');
    window.location.hash = token ? routes.cabinet : routes.login;
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    localStorage.removeItem('token');
    window.location.hash = routes.home;
  };

  const navLinks = [
    { label: 'Для студентов', href: routes.students },
    { label: 'Для вузов', href: routes.universities },
    { label: 'Для компаний', href: routes.business },
  ];

  return (
    <nav
      className="navbar"
      style={{ boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.08)' : 'none' }}
    >
      <div className="container">
        <div className="navbar-inner">
          {/* Logo */}
          <a href={routes.home} className="navbar-logo">GOSTER</a>

          {/* Desktop links */}
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="navbar-link">{link.label}</a>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="navbar-actions">
            {isLoggedIn ? (
              <>
                <a href={routes.cabinet} className="btn btn-ghost btn-sm">Кабинет</a>
                <button onClick={handleLogout} className="btn btn-ghost btn-sm">Выйти</button>
              </>
            ) : (
              <>
                <a href={routes.login} onClick={handleLoginClick} className="btn btn-ghost btn-sm">Войти</a>
                <a href={routes.register} className="btn btn-primary btn-sm">Создать аккаунт</a>
              </>
            )}
          </div>

          {/* Mobile burger */}
          <button
            className="navbar-menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Меню"
            aria-expanded={menuOpen}
          >
            <div
              className="navbar-line"
              style={{ transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'rotate(0)' }}
            />
            <div className="navbar-line" style={{ opacity: menuOpen ? 0 : 1 }} />
            <div
              className="navbar-line"
              style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'rotate(0)' }}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="navbar-dropdown">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar-mobile-item"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div style={{ height: '1px', background: 'var(--border)', margin: '8px 0' }} />
          {isLoggedIn ? (
            <>
              <a
                href={routes.cabinet}
                className="navbar-mobile-item"
                style={{ color: 'var(--color-primary)', fontWeight: 600 }}
                onClick={() => setMenuOpen(false)}
              >
                Личный кабинет
              </a>
              <button
                onClick={handleLogout}
                className="navbar-mobile-item"
                style={{ color: 'var(--color-error)', fontWeight: 600, border: 'none', background: 'none', width: '100%', cursor: 'pointer' }}
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <a
                href={routes.login}
                onClick={handleLoginClick}
                className="navbar-mobile-item"
                style={{ color: 'var(--color-primary)', fontWeight: 600 }}
              >
                Войти
              </a>
              <a
                href={routes.register}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '8px 14px 4px',
                  padding: '12px',
                  background: 'var(--color-gradient)',
                  color: 'white',
                  borderRadius: 'var(--r-md)',
                  fontWeight: 700,
                  fontSize: '15px',
                }}
              >
                Создать аккаунт
              </a>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
