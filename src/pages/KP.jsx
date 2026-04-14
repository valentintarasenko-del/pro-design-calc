// Страница предпросмотра и скачивания КП
import { useState, useEffect, useRef, useCallback } from 'react';

// Компонент предпросмотра — на мобиле масштабирует A4 под ширину экрана
function MobileScaledPreview({ docRef, calc }) {
  const wrapperRef = useRef(null);
  const [scale, setScale] = useState(1);

  const updateScale = useCallback(() => {
    if (wrapperRef.current) {
      const available = wrapperRef.current.parentElement.clientWidth - 16;
      const newScale = Math.min(1, available / 794);
      setScale(newScale);
    }
  }, []);

  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [updateScale]);

  const isMobile = scale < 1;

  return (
    <div ref={wrapperRef} style={isMobile ? {
      width: `${794 * scale}px`,
      height: `${1123 * scale * 2}px`, // две страницы
      position: 'relative',
      overflow: 'hidden',
    } : {}}>
      <div
        ref={docRef}
        style={isMobile ? {
          transformOrigin: 'top left',
          transform: `scale(${scale})`,
          width: '794px',
          boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
        } : {
          boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
        }}
        className="rounded-sm overflow-hidden"
      >
        <KPTemplate calc={calc} />
      </div>
    </div>
  );
}
import AppHeader from '../components/AppHeader';
import KPTemplate from '../components/kp/KPTemplate';
import { loadCalculationById } from '../utils/storage';

export default function KP() {
  const [calc, setCalc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true); // загрузка расчёта из Supabase
  // Единственный ref — только на видимый предпросмотр
  const docRef = useRef(null);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get('id');
    if (id) {
      loadCalculationById(id).then(found => {
        if (found) setCalc(found);
        setFetching(false);
      });
    } else {
      setFetching(false);
    }
  }, []);

  // Скачать PDF через html2pdf.js
  const handleDownloadPDF = async () => {
    if (!docRef.current) return;
    setLoading(true);

    try {
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
            // Важно: элемент должен быть видим для html2canvas
            windowWidth: 794,
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
      alert('Ошибка при создании PDF. Попробуйте через меню браузера → Печать → Сохранить как PDF.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => window.print();

  if (fetching) {
    return (
      <div className="min-h-screen bg-[#0D0D1A]">
        <AppHeader />
        <div className="flex items-center justify-center py-32 text-white/40">
          Загрузка...
        </div>
      </div>
    );
  }

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
        <div className="bg-[#0D0D1A] border-b border-white/10 py-3 px-4 sm:px-6 sticky top-[57px] z-40">
          <div className="max-w-4xl mx-auto">
            {/* Заголовок */}
            <div className="mb-3">
              <h1 className="text-white font-bold text-base sm:text-lg leading-tight">
                {calc.клиент
                  ? `КП для ${calc.клиент}`
                  : calc.объект || 'Коммерческое предложение'}
              </h1>
              {calc.режим === 'quick' && (
                <span className="text-xs text-yellow-400">⚡ Предварительный расчёт</span>
              )}
            </div>

            {/* Кнопки — в ряд, равномерно */}
            <div className="flex gap-2">
              <a
                href={`/app?id=${calc?.id}`}
                className="flex-1 sm:flex-none border border-white/20 hover:border-white/40 text-white/70 hover:text-white
                  font-medium px-3 py-2 rounded-xl transition-colors text-xs sm:text-sm text-center"
              >
                ← Изменить
              </a>
              <button
                onClick={handlePrint}
                className="flex-1 sm:flex-none border border-white/20 hover:border-white/40 text-white/70 hover:text-white
                  font-medium px-3 py-2 rounded-xl transition-colors text-xs sm:text-sm"
              >
                🖨 Печать
              </button>
              <button
                onClick={handleDownloadPDF}
                disabled={loading}
                className="flex-1 sm:flex-none bg-brand-blue hover:bg-brand-blue/90 disabled:opacity-50 text-white
                  font-semibold px-3 py-2 rounded-xl transition-colors text-xs sm:text-sm flex items-center justify-center gap-1.5"
              >
                {loading ? (
                  <>
                    <span className="inline-block w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="hidden sm:inline">Создаём...</span>
                  </>
                ) : (
                  <>⬇ <span>PDF</span></>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Предпросмотр КП — ref только здесь, этот элемент ВИДИМ */}
      <div className="print-hidden py-6 sm:py-8 flex justify-center px-2 sm:px-0">
        {/* На мобильном масштабируем A4 чтобы влезал на экран */}
        <MobileScaledPreview docRef={docRef} calc={calc} />
      </div>

      {/* Версия для печати — без ref, html2pdf не должен её трогать */}
      <div className="hidden print:block">
        <KPTemplate calc={calc} />
      </div>

    </div>
  );
}
