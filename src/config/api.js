/**
 * Регистрация пользователя
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} - JSON с результатом регистрации
 */
export async function registerUser(email, password) {
  try {
    if (!email || !password) throw new Error('Email и пароль обязательны');
    const payload = { email, password, role: 'user' };
    console.log('📤 Запрос на регистрацию:', payload);
    const res = await fetch(`${API_BASE_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || data.message || 'Ошибка регистрации');
    }
    console.log('✅ Регистрация успешна:', data);
    return data;
  } catch (error) {
    console.error('❌ Ошибка регистрации:', error);
    throw error;
  }
}

/**
 * Авторизация пользователя
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>} - JSON с access_token/token
 */
export async function loginUser(email, password) {
  try {
    if (!email || !password) throw new Error('Email и пароль обязательны');
    const payload = { email, password };
    console.log('📤 Запрос на авторизацию:', payload);
    const res = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.detail || data.message || 'Ошибка авторизации');
    }
    console.log('✅ Авторизация успешна:', data);
    return data;
  } catch (error) {
    console.error('❌ Ошибка авторизации:', error);
    throw error;
  }
}
const DEFAULT_API_BASE_URL = 'https://апи.гостер.рф';

const envApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

export const API_BASE_URL = (envApiBaseUrl || DEFAULT_API_BASE_URL).replace(/\/$/, '');

/**
 * Проверка документа на соответствие ГОСТ
 * @param {File} file - DOCX файл для проверки
 * @returns {Promise<Object>} - JSON с результатами проверки
 */
export async function checkDocument(file) {
  try {
    if (!file) {
      throw new Error('Файл не выбран');
    }

    if (!file.name.toLowerCase().endsWith('.docx')) {
      throw new Error('Требуется файл в формате DOCX');
    }

    console.log('📤 Отправка запроса на проверку:', {
      fileName: file.name,
      fileSize: file.size,
      url: `${API_BASE_URL}/check`,
    });

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/check`, {
      method: 'POST',
      body: formData,
      credentials: 'omit', // Не включать куки
    });

    if (!response.ok) {
      throw new Error(`Ошибка проверки: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('✅ Результаты проверки получены:', result);

    return result;
  } catch (error) {
    console.error('❌ Ошибка при проверке документа:', error);
    throw error;
  }
}

/**
 * Форматирование документа по ГОСТ
 * @param {File} file - DOCX файл для форматирования
 * @param {string} token - JWT токен пользователя
 * @returns {Promise<Blob>} - Отформатированный DOCX файл
 */
export async function formatDocument(file, token) {
  try {
    if (!file) {
      throw new Error('Файл не выбран');
    }

    if (!token) {
      throw new Error('JWT токен не найден');
    }

    if (!file.name.toLowerCase().endsWith('.docx')) {
      throw new Error('Требуется файл в формате DOCX');
    }

    console.log('📤 Отправка запроса на форматирование:', {
      fileName: file.name,
      fileSize: file.size,
      url: `${API_BASE_URL}/format`,
      hasToken: !!token,
    });

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/format`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
      credentials: 'omit', // Не включать куки
    });

    if (!response.ok) {
      throw new Error(`Ошибка форматирования: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    console.log('✅ Документ отформатирован:', {
      blobSize: blob.size,
      blobType: blob.type,
      fileName: file.name,
    });

    return blob;
  } catch (error) {
    console.error('❌ Ошибка при форматировании документа:', error);
    throw error;
  }
}

/**
 * Загрузка отформатированного файла
 * @param {Blob} blob - Blob с отформатированным документом
 * @param {string} fileName - Имя файла для сохранения
 */
export function downloadFormattedFile(blob, fileName) {
  try {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName.replace(/\.docx$/i, '_formatted.docx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log('💾 Файл загружен:', link.download);
  } catch (error) {
    console.error('❌ Ошибка при загрузке файла:', error);
    throw error;
  }
}
