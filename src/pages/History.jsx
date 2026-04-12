// Страница истории расчётов
import { useState } from 'react';
import AppHeader from '../components/AppHeader';
import { loadCalculations, deleteCalculation } from '../utils/storage';
import { fmt } from '../utils/calculations';

export default function History() {
  const [list, setList] = useState(() => loadCalculations());

  const handleDelete = (e, id) => {
    e.stopPropagation(); // не открываем КП при клике на удаление
    if (!confirm('Удалить этот расчёт?')) return;
    deleteCalculation(id);
    setList(loadCalculations());
  };

  const handleOpen = (id) => {
    window.location.href = `/kp?id=${id}`;
  };

  const formatDate = (iso) => {
    try {
      return new Date(iso).toLocaleString('ru-RU', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
      });
    } catch { return '—'; }
  };

  return (
    <div className="min-h-screen bg-[#0D0D1A]">
      <AppHeader />

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-white mb-1">История расчётов</h1>
            <p className="text-white/40 text-sm">{list.length} расчётов сохранено</p>
          </div>
          <a
            href="/app"
            className="bg-brand-blue hover:bg-brand-blue/90 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
          >
            + Новый расчёт
          </a>
        </div>

        {list.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📋</div>
            <h2 className="text-xl font-bold text-white/60 mb-2">Расчётов пока нет</h2>
            <p className="text-white/30 text-sm mb-6">Сохраните первый расчёт в калькуляторе</p>
            <a href="/app" className="text-brand-blue hover:underline text-sm">Открыть калькулятор →</a>
          </div>
        ) : (
          <div className="space-y-3">
            {list.map(calc => (
              <div
                key={calc.id}
                onClick={() => handleOpen(calc.id)}
                className="bg-white/5 border border-white/10 hover:border-brand-blue/50 hover:bg-white/8
                  rounded-2xl px-6 py-5 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Левая часть — название и дата */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-white font-bold truncate group-hover:text-brand-blue transition-colors">
                        {calc.клиент || calc.объект || 'Без названия'}
                      </h3>
                      {calc.режим === 'quick' && (
                        <span className="text-xs bg-brand-blue/20 text-brand-blue px-2 py-0.5 rounded-lg flex-shrink-0">
                          Предварительный
                        </span>
                      )}
                    </div>
                    {calc.клиент && calc.объект && (
                      <p className="text-white/40 text-sm truncate">{calc.объект}</p>
                    )}
                    <p className="text-white/30 text-xs mt-2">{formatDate(calc.createdAt)}</p>
                  </div>

                  {/* Правая часть — сумма и кнопки */}
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <div className="text-right">
                      <div className="text-white font-black text-xl">
                        {calc.result ? fmt(calc.result.итогоСНаценкой) : '—'}
                      </div>
                      {calc.result?.маржа !== null && calc.result?.маржа !== undefined && (
                        <div className={`text-xs mt-0.5 ${calc.result.маржа >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          маржа {calc.result.маржаПроцент}%
                        </div>
                      )}
                    </div>

                    {/* Кнопка открыть КП */}
                    <div
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-brand-blue
                        text-white text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap"
                    >
                      Открыть КП →
                    </div>

                    {/* Удалить */}
                    <button
                      onClick={(e) => handleDelete(e, calc.id)}
                      className="text-white/20 hover:text-red-400 transition-colors text-xl leading-none pb-0.5"
                      title="Удалить"
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Краткая разбивка по блокам */}
                {calc.result && (
                  <div className="flex gap-4 mt-4 pt-4 border-t border-white/5 text-xs text-white/40 flex-wrap">
                    {calc.result.листы > 0 && <span>Корпуса: {calc.result.листы} л.</span>}
                    {calc.result.фасады > 0 && <span>Фасады: {fmt(calc.result.фасады)}</span>}
                    {calc.result.столешница > 0 && <span>Столешница: {fmt(calc.result.столешница)}</span>}
                    {calc.result.фурнитура > 0 && <span>Фурнитура: {fmt(calc.result.фурнитура)}</span>}
                    {calc.result.монтаж > 0 && <span>Монтаж: {fmt(calc.result.монтаж)}</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
