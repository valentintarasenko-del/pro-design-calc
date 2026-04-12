// Страница предпросмотра и скачивания КП
import { useState, useEffect, useRef } from 'react';
import AppHeader from '../components/AppHeader';
import KPTemplate from '../components/kp/KPTemplate';
import { loadCalculations } from '../utils/storage';

export default function KP() {
  const [calc, setCalc] = useState(null);
  const [loading, setLoading] = useState(false);
  const docRef = useRef(null);

  useEffect(() => {
    // Получаем id из URL: /kp?id=123
    const id = new URLSearchParams(window.location.search).get('id');
    if (id) {
      const list = loadCalculations();
      const found = list.find(c => c.id === id);
      if (found) setCalc(found);
    }
  }, []);

  // Скачать PDF через html2pdf.js
  const handleDownloadPDF = async () => {
    if (!docRef.current) return;
    setLoading(true);

    try {
      // Динамически импортируем html2pdf (чтобы не тормозил загрузку)
      const html2pdf = (await import('html2pdf.js')).default;

      const clientName = calc?.клиент || calc?.объект || 'КП';
      const filename = `КП ПроДизайн — ${clientName}.pdf`;

      await html2pdf()
        .set({
          margin: 0,
          filename,
          image: { type: 'jpeg', quality: 0.95 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            backgroundColor: '#ffffff',
          },
          jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait',
          },
          pagebreak: { mode: ['css', 'legacy'] },
        })
        .from(docRef.current)
        .save();
    } catch (e) {
      console.error('PDF error:', e);
      alert('Ошибка при создании PDF. Попробуйте через Ctrl+P → Сохранить как PDF.');
    } finally {
      setLoading(false);
    }
  };

  // Альтернатива: печать через браузер
  const handlePrint = () => window.print();

  if (!calc) {
    return (
      <div className="min-h-screen bg-[#0D0D1A]">
        <AppHeader />
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="text-5xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-white/60 mb-2">КП не найдено</h2>
          <p className="text-white/30 text-sm mb-6">
            Сохраните расчёт в калькуляторе и нажмите «Сформировать КП»
          </p>
          <a href="/app" className="text-brand-blue hover:underline text-sm">
            ← Открыть калькулятор
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D1A]">

      {/* Шапка — скрыта при печати */}
      <div className="print-hidden">
        <AppHeader />

        {/* Панель управления */}
        <div className="bg-[#0D0D1A] border-b border-white/10 py-4 px-6 sticky top-[57px] z-40">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <div>
              <h1 className="text-white font-bold text-lg">
                {calc.клиент
                  ? `КП для ${calc.клиент}`
                  : calc.объект || 'Коммерческое предложение'}
              </h1>
              {calc.режим === 'quick' && (
                <span className="text-xs text-yellow-400">⚡ Предварительный расчёт</span>
              )}
            </div>

            <div className="flex gap-3">
              <a
                href={`/app`}
                className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white
                  font-medium px-4 py-2.5 rounded-xl transition-colors text-sm"
              >
                ← Изменить расчёт
              </a>
              <button
                onClick={handlePrint}
                className="border border-white/20 hover:border-white/40 text-white/70 hover:text-white
                  font-medium px-4 py-2.5 rounded-xl transition-colors text-sm"
              >
                🖨 Печать
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={loading}
                className="bg-brand-blue hover:bg-brand-blue/90 disabled:opacity-50 text-white
                  font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Создаём PDF...
                  </>
                ) : (
                  <>⬇ Скачать PDF</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Предпросмотр КП — белая страница на тёмном фоне */}
      <div className="print-hidden py-8 flex justify-center">
        <div ref={docRef} className="shadow-2xl rounded-sm overflow-hidden">
          <KPTemplate calc={calc} />
        </div>
      </div>

      {/* Версия для печати — только документ, без обёртки */}
      <div className="hidden print:block" ref={docRef}>
        <KPTemplate calc={calc} />
      </div>

    </div>
  );
}
