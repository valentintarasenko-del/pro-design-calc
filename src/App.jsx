// Главный компонент приложения — роутинг между страницами
import Landing from './pages/Landing';
import './index.css';

function App() {
  // Пока два маршрута: лендинг (/) и приложение (/app)
  // В будущем подключим react-router, пока простая проверка пути
  const path = window.location.pathname;

  if (path.startsWith('/app')) {
    // Здесь будет калькулятор — в следующей сессии
    return (
      <div className="min-h-screen bg-[#0D0D1A] flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">🚧</div>
          <h1 className="text-3xl font-black text-white mb-4">Приложение в разработке</h1>
          <p className="text-white/60 mb-8">Скоро здесь будет калькулятор стоимости мебели</p>
          <a href="/" className="text-brand-blue hover:underline">← Вернуться на главную</a>
        </div>
      </div>
    );
  }

  return <Landing />;
}

export default App;
