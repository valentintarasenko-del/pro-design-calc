// Работа с localStorage: настройки и история расчётов

export const defaultSettings = {
  ценаЛиста: 0,       // цена одного листа ЛДСП (руб)
  коэф: 1.6,          // метров базы на один лист (настраивается под Антона)
  монтажПроцент: 15,  // монтаж по умолчанию
  доставка: 6000,     // доставка по умолчанию
  // Прайс на фасады: список материалов с ценой за м²
  прайсФасадов: [
    { id: 1, материал: 'ЛДСП', цена: '' },
    { id: 2, материал: 'МДФ плёнка', цена: '' },
    { id: 3, материал: 'МДФ эмаль', цена: '' },
    { id: 4, материал: 'Постформинг', цена: '' },
  ],
};

export function loadSettings() {
  try {
    const raw = localStorage.getItem('pd_settings');
    if (!raw) return { ...defaultSettings };
    const saved = JSON.parse(raw);
    return { ...defaultSettings, ...saved };
  } catch {
    return { ...defaultSettings };
  }
}

export function saveSettings(settings) {
  localStorage.setItem('pd_settings', JSON.stringify(settings));
}

// История расчётов
export function loadCalculations() {
  try {
    const raw = localStorage.getItem('pd_calculations');
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCalculation(calc) {
  const list = loadCalculations();
  const idx = list.findIndex(c => c.id === calc.id);
  if (idx >= 0) {
    list[idx] = calc;
  } else {
    list.unshift(calc);
  }
  // Хранить не более 100 расчётов
  localStorage.setItem('pd_calculations', JSON.stringify(list.slice(0, 100)));
}

export function deleteCalculation(id) {
  const list = loadCalculations().filter(c => c.id !== id);
  localStorage.setItem('pd_calculations', JSON.stringify(list));
}

// Начальное состояние формы расчёта
export function defaultForm(settings) {
  return {
    id: Date.now().toString(),
    режим: 'quick',         // 'quick' | 'detailed'
    клиент: '',
    объект: '',
    изображение: null,

    // Корпуса
    нижняя: '',
    верхняя: '',
    пеналы: '',

    // Фасады — список позиций
    фасады: [{ id: Date.now(), материал: '', площадь: '', цена: '' }],

    // Фрезеровка
    фрезеровкаВкл: false,
    фрезеровкаОбъём: '',
    фрезеровкаЦена: '',

    // Ручные позиции
    столешница: '',
    фурнитура: '',

    // Монтаж и доставка берём из настроек
    монтажПроцент: settings.монтажПроцент,
    доставка: settings.доставка,

    // Финансы
    себестоимость: '',
    допНаценкаТип: 'none',  // 'none' | 'percent' | 'sum'
    допНаценка: '',

    createdAt: new Date().toISOString(),
  };
}
