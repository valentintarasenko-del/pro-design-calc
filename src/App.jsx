// Главный роутер приложения
import Landing from './pages/Landing';
import Calculator from './pages/Calculator';
import Settings from './pages/Settings';
import History from './pages/History';
import './index.css';

export default function App() {
  const path = window.location.pathname;

  if (path.startsWith('/settings')) return <Settings />;
  if (path.startsWith('/history'))  return <History />;
  if (path.startsWith('/app'))      return <Calculator />;

  return <Landing />;
}
