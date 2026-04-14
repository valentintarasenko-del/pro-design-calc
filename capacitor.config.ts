import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // Уникальный ID приложения
  appId: 'ru.prodesign.calc',
  appName: 'Мебель ПроДизайн',
  // Папка со сборкой сайта
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  android: {
    // Разрешаем установку не из Play Market
    allowMixedContent: false,
  },
};

export default config;
