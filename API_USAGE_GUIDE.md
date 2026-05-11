# 🎯 Инструкция по использованию API

## Быстрый старт

### 1. Для пользователя (фронтенд)

#### Проверка документа (бесплатно):
1. Перейдите на главную страницу
2. Прокрутите до "Проверить диплом бесплатно"
3. Загрузите DOCX файл
4. Нажмите "Проверить документ"
5. Увидите результаты со всеми ошибками

#### Форматирование документа (с авторизацией):
1. Авторизуйтесь в личном кабинете
2. Перейдите во вкладку "Загрузить файл"
3. Загрузите DOCX файл
4. Нажмите "Начать форматирование"
5. Файл автоматически скачается в правильном формате
6. Документ появится в "Мои документы"

### 2. Для разработчика (консоль браузера)

#### Просмотр логов:
1. Откройте DevTools: `F12` или `Cmd+Option+I` (Mac)
2. Перейдите на вкладку **Console**
3. Выполните операцию
4. Посмотрите логи с эмодзи:
   - 📤 = отправка запроса
   - ✅ = успех
   - ❌ = ошибка
   - 💾 = скачивание

#### Пример вывода при проверке:
```
📤 Отправка запроса на проверку: {
  fileName: "diploma.docx",
  fileSize: 245632,
  url: "https://апи.гостер.рф/check"
}

(ожидание ответа сервера...)

✅ Результаты проверки получены: {
  score: 85,
  errors: [...],
  warnings: [...]
}
```

#### Пример вывода при форматировании:
```
🚀 Начинаем процесс форматирования...
🔐 Токен получен из localStorage

📤 Отправка запроса на форматирование: {
  fileName: "diploma.docx",
  fileSize: 245632,
  url: "https://апи.гостер.рф/format",
  hasToken: true
}

(обработка на сервере 15-30 сек)

✅ Документ отформатирован: {
  blobSize: 248156,
  blobType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  fileName: "diploma.docx"
}

💾 Файл загружен: "diploma_formatted.docx"
✅ Форматирование успешно завершено
```

---

## 🔌 API эндпоинты

### POST `/check`
**Бесплатная проверка документа**

```javascript
const formData = new FormData();
formData.append('file', docxFile);

const response = await fetch('https://апи.гостер.рф/check', {
  method: 'POST',
  body: formData,
});

const result = await response.json();
// Результат: { score, errors, warnings, ... }
```

### POST `/format`
**Форматирование с авторизацией**

```javascript
const formData = new FormData();
formData.append('file', docxFile);

const response = await fetch('https://апи.гостер.рф/format', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${jwtToken}`,
  },
  body: formData,
});

const formattedDocx = await response.blob();
// Результат: Blob отформатированного DOCX файла
```

---

## 📝 Примеры кода

### Использование в React компоненте

```jsx
import { checkDocument, formatDocument, downloadFormattedFile } from './config/api';

function MyComponent() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  // Проверка документа
  const handleCheck = async () => {
    try {
      setLoading(true);
      const result = await checkDocument(file);
      setResults(result);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Форматирование документа
  const handleFormat = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const formatted = await formatDocument(file, token);
      downloadFormattedFile(formatted, file.name);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept=".docx" 
        onChange={(e) => setFile(e.target.files[0])} 
      />
      <button onClick={handleCheck} disabled={!file || loading}>
        {loading ? 'Проверяю...' : 'Проверить'}
      </button>
      <button onClick={handleFormat} disabled={!file || loading}>
        {loading ? 'Форматирую...' : 'Отформатировать'}
      </button>
      {results && (
        <div>
          <h3>Результаты: {results.score}%</h3>
          <ul>
            {results.errors?.map((err, i) => (
              <li key={i}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

---

## 🛡️ Обработка ошибок

```javascript
try {
  const result = await checkDocument(file);
} catch (error) {
  // Возможные ошибки:
  // - "Файл не выбран"
  // - "Требуется файл в формате DOCX"
  // - "Ошибка проверки: 500 Internal Server Error"
  // - "Failed to fetch" (сетевая ошибка)
  
  console.error('Ошибка:', error.message);
  
  // Показываем пользователю
  alert(error.message);
}
```

---

## 🔐 Авторизация

### Получение JWT токена:

```javascript
// После успешного логина:
const response = await fetch('https://апи.гостер.рф/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const data = await response.json();
const token = data.token;

// Сохраняем токен
localStorage.setItem('token', token);
```

### Использование токена при форматировании:

```javascript
const token = localStorage.getItem('token');

// Без токена => ошибка "JWT токен не найден"
const formatted = await formatDocument(file, token);
```

---

## 📊 Структура результатов проверки

```javascript
{
  "score": 85,                    // Процент соответствия (0-100)
  "conformance": 0.85,            // Доля соответствия (0-1)
  "errors": [
    {
      "type": "error",
      "message": "Неправильные поля страницы",
      "position": "страницы 1-5"
    }
  ],
  "warnings": [
    {
      "type": "warning",
      "message": "Шрифт не Times New Roman в 3 местах",
      "count": 3
    }
  ],
  "checkedAt": "2024-05-10T12:30:45Z",
  "standards": ["ГОСТ 7.32-2017"]
}
```

---

## 🚀 Производительность

### Время обработки:
- **Проверка (`/check`)**: 5-10 секунд
- **Форматирование (`/format`)**: 15-30 секунд

### Ограничения:
- **Максимальный размер файла**: 50 МБ
- **Поддерживаемые форматы**: DOCX (для обоих операций)

---

## 🐛 Отладка

### 1. Проверьте консоль браузера (F12 → Console)
```
Должны быть логи с эмодзи: 📤, ✅, ❌
```

### 2. Проверьте Network вкладку (F12 → Network)
```
GET/POST запросы к https://апи.гостер.рф/check
GET/POST запросы к https://апи.гостер.рф/format
```

### 3. Проверьте localStorage
```javascript
// В консоли:
localStorage.getItem('token')   // Должен вернуть JWT токен
```

### 4. Если ошибка "JWT токен не найден"
```javascript
// Проверьте авторизацию
const token = localStorage.getItem('token');
console.log('Токен:', token ? 'есть' : 'НЕ НАЙДЕН');

// Если нет - авторизуйтесь снова
```

---

## 📚 Дополнительная документация

- `API_INTEGRATION.md` - Полная техническая документация
- `API_INTEGRATION_SUMMARY.md` - Краткое резюме изменений
- `LOGGING_EXAMPLES.js` - Примеры логирования
- `src/config/api.js` - Исходный код API функций

---

## ✅ Чек-лист для проверки

- [ ] Бесплатная проверка работает (без авторизации)
- [ ] Логи видны в Console браузера
- [ ] Форматирование работает (с авторизацией)
- [ ] Файл скачивается автоматически
- [ ] Документ добавляется в "Мои документы"
- [ ] Уведомление об успехе отображается
- [ ] Ошибки обрабатываются корректно

---

## 📞 Контактная информация

**API Base URL:** https://апи.гостер.рф

Если возникли проблемы с API:
1. Проверьте консоль браузера (F12 → Console)
2. Проверьте Network вкладку для деталей запроса
3. Убедитесь, что DOCX файл не поврежден
4. Для авторизации убедитесь, что токен в localStorage
