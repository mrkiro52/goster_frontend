# API Integration Documentation

## Обзор

Проект интегрирован с двумя основными API эндпоинтами для работы с документами DOCX:

- **`/check`** - Бесплатная проверка документа на соответствие ГОСТ
- **`/format`** - Автоматическое форматирование документа по ГОСТ (требует авторизацию)

## Конфигурация

**Файл:** `src/config/api.js`

```javascript
const API_BASE_URL = 'https://апи.гостер.рф'
```

API функции автоматически логируют все операции в консоль браузера для отладки.

---

## API Функции

### 1. `checkDocument(file)`

Проверяет документ DOCX на соответствие требованиям ГОСТ 7.32-2017.

**Параметры:**
- `file` (File) - DOCX файл для проверки

**Возвращает:**
- Promise<Object> - JSON объект с результатами проверки

**Пример использования:**

```javascript
import { checkDocument } from './config/api';

const file = fileInput.files[0]; // DOCX файл
try {
  const result = await checkDocument(file);
  console.log('Результаты проверки:', result);
  // Результат содержит информацию об ошибках форматирования
} catch (error) {
  console.error('Ошибка проверки:', error);
}
```

**Логирование:**
```
📤 Отправка запроса на проверку: { fileName, fileSize, url }
✅ Результаты проверки получены: { result }
❌ Ошибка при проверке документа: { error }
```

---

### 2. `formatDocument(file, token)`

Форматирует документ DOCX по ГОСТ 7.32-2017 и возвращает отформатированный файл.

**Параметры:**
- `file` (File) - DOCX файл для форматирования
- `token` (string) - JWT токен авторизации пользователя

**Возвращает:**
- Promise<Blob> - Отформатированный DOCX файл

**Пример использования:**

```javascript
import { formatDocument, downloadFormattedFile } from './config/api';

const file = fileInput.files[0];
const token = localStorage.getItem('token'); // JWT токен

try {
  const formattedBlob = await formatDocument(file, token);
  downloadFormattedFile(formattedBlob, file.name);
  console.log('Документ успешно отформатирован и скачан');
} catch (error) {
  console.error('Ошибка форматирования:', error);
}
```

**Логирование:**
```
📤 Отправка запроса на форматирование: { fileName, fileSize, url, hasToken }
✅ Документ отформатирован: { blobSize, blobType, fileName }
❌ Ошибка при форматировании документа: { error }
```

---

### 3. `downloadFormattedFile(blob, fileName)`

Скачивает отформатированный файл на устройство пользователя.

**Параметры:**
- `blob` (Blob) - Blob отформатированного документа
- `fileName` (string) - Исходное имя файла

**Логирование:**
```
💾 Файл загружен: { downloadFileName }
```

---

## Интеграция в компоненты

### FreeCheckBlock - Бесплатная проверка

Компонент использует `checkDocument()` для проверки файла без авторизации:

```jsx
const handleCheck = async (e) => {
  e.preventDefault();
  setChecking(true);
  
  try {
    const result = await checkDocument(file);
    setResults(result);
  } catch (err) {
    setCheckError(err.message);
  }
};
```

### Cabinet (Upload tab) - Форматирование с авторизацией

Компонент использует `formatDocument()` для форматирования с JWT токеном:

```jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const token = localStorage.getItem('token');
    const formattedBlob = await formatDocument(file, token);
    downloadFormattedFile(formattedBlob, fileName);
    
    // Добавить в список документов
    setDocuments(prev => [
      { id: Date.now(), name: fileName, status: 'ready', date: now },
      ...prev
    ]);
  } catch (error) {
    console.error(error.message);
  }
};
```

---

## Логирование в консоль

Все операции логируются в консоль браузера для удобства отладки:

### Проверка документа:
```
📤 Отправка запроса на проверку: {
  fileName: "vkr.docx",
  fileSize: 156234,
  url: "https://апи.гостер.рф/check"
}
✅ Результаты проверки получены: { score: 85, errors: [...] }
```

### Форматирование документа:
```
📤 Отправка запроса на форматирование: {
  fileName: "vkr.docx",
  fileSize: 156234,
  url: "https://апи.гостер.рф/format",
  hasToken: true
}
✅ Документ отформатирован: {
  blobSize: 158234,
  blobType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  fileName: "vkr.docx"
}
💾 Файл загружен: "vkr_formatted.docx"
```

---

## Обработка ошибок

Все ошибки логируются и выбрасываются для обработки:

```javascript
try {
  const result = await checkDocument(file);
} catch (error) {
  // error может быть:
  // - "Файл не выбран"
  // - "Требуется файл в формате DOCX"
  // - "Ошибка проверки: 500 Internal Server Error"
  // - Любая другая ошибка сети
  
  console.error('❌ Ошибка при проверке документа:', error);
  alert(error.message);
}
```

---

## Требования

- **Формат файла:** DOCX (для обоих эндпоинтов)
- **Размер файла:** Не более 50 МБ
- **Авторизация:** Не требуется для `/check`, обязательна JWT для `/format`
- **Сессия:** JWT токен хранится в localStorage с ключом `token`

---

## Переменные окружения

Можно переопределить базовый URL API через переменную окружения:

```env
VITE_API_BASE_URL=https://апи.гостер.рф
```

Если переменная не установлена, используется значение по умолчанию.
