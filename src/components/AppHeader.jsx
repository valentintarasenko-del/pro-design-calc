// Шапка приложения с навигацией (используется на всех страницах кроме лендинга)

function Logo() {
  return (
    <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
      <div className="bg-brand-blue rounded-lg p-1.5 flex items-center justify-center">
        <span className="text-white font-black text-xs leading-none px-1">ПРО</span>
      </div>
      <div>
        <div className="text-white font-black text-base leading-none tracking-tight">Дизайн</div>
        <div className="text-white/40 text-xs font-medium">считаем мебель</div>
      </div>
    </a>
  );
}

// Ссылка навигации с подсветкой активной страницы
function NavLink({ href, children }) {
  const active = window.location.pathname === href;
  return (
    <a
      href={href}
      className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
        active
          ? 'bg-white/10 text-white'
          : 'text-white/60 hover:text-white hover:bg-white/5'
      }`}
    >
      {children}
    </a>
  );
}

export default function AppHeader() {
  return (
    <header className="border-b border-white/10 bg-[#0D0D1A]/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <Logo />

        <nav className="flex items-center gap-1">
          <NavLink href="/app">Расчёт</NavLink>
          <NavLink href="/history">История</NavLink>
          <NavLink href="/settings">Настройки</NavLink>
        </nav>
      </div>
    </header>
  );
}
