import { useEffect, useRef, useState } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import carouselArrowLeft from '@/assets/icons/carousel-arrow-left.svg';
import carouselArrowRight from '@/assets/icons/carousel-arrow-right.svg';

interface PdfSlideViewerProps {
  src: string;
  title: string;
  className?: string;
}

let pdfjsPromise: Promise<typeof import('pdfjs-dist')> | null = null;

function loadPdfjs() {
  if (!pdfjsPromise) {
    pdfjsPromise = Promise.all([
      import('pdfjs-dist'),
      import('pdfjs-dist/build/pdf.worker.min.mjs?url'),
    ]).then(([pdfjsLib, workerUrl]) => {
      pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl.default;
      return pdfjsLib;
    });
  }
  return pdfjsPromise;
}

export default function PdfSlideViewer({ src, title, className = '' }: PdfSlideViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<PDFDocumentProxy | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadPdfjs()
      .then((pdfjsLib) => pdfjsLib.getDocument(src).promise)
      .then((doc) => {
        if (cancelled) return;
        docRef.current = doc;
        setPageCount(doc.numPages);
        setPageNum(1);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
      docRef.current?.destroy();
      docRef.current = null;
    };
  }, [src]);

  useEffect(() => {
    const doc = docRef.current;
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!doc || !canvas || !container || pageCount === 0) return;

    let cancelled = false;
    let renderTask: ReturnType<import('pdfjs-dist').PDFPageProxy['render']> | null = null;

    doc.getPage(pageNum).then((page) => {
      if (cancelled) return;
      const context = canvas.getContext('2d');
      if (!context) return;

      const unscaledViewport = page.getViewport({ scale: 1 });
      const scale = container.clientWidth / unscaledViewport.width;
      const viewport = page.getViewport({ scale });
      const dpr = window.devicePixelRatio || 1;

      canvas.width = viewport.width * dpr;
      canvas.height = viewport.height * dpr;
      canvas.style.width = `${viewport.width}px`;
      canvas.style.height = `${viewport.height}px`;

      renderTask = page.render({
        canvas,
        canvasContext: context,
        viewport,
        transform: dpr !== 1 ? [dpr, 0, 0, dpr, 0, 0] : undefined,
      });
      renderTask.promise.catch(() => {
        if (!cancelled) setError(true);
      });
    });

    return () => {
      cancelled = true;
      renderTask?.cancel();
    };
  }, [pageNum, pageCount]);

  const goPrev = () => setPageNum((p) => (p <= 1 ? pageCount : p - 1));
  const goNext = () => setPageNum((p) => (p >= pageCount ? 1 : p + 1));

  if (error) {
    return (
      <div
        className={`flex items-center justify-center rounded-card border border-brand-gray bg-brand-silver/40 p-6 text-center font-grotesk text-body text-black ${className}`}
      >
        <a href={src} target="_blank" rel="noopener noreferrer" className="underline">
          View {title} deck (PDF)
        </a>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-hidden rounded-card border border-brand-gray bg-brand-silver/40 ${className}`}
    >
      <canvas ref={canvasRef} aria-label={title} />

      {pageCount > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={goPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow-hard"
          >
            <img src={carouselArrowLeft} alt="" className="h-[18px] w-auto" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={goNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-1.5 shadow-hard"
          >
            <img src={carouselArrowRight} alt="" className="h-[18px] w-auto" />
          </button>
          <span className="absolute bottom-2 right-3 rounded-full bg-white/80 px-2 py-0.5 font-grotesk text-xs text-black">
            {pageNum} / {pageCount}
          </span>
        </>
      )}
    </div>
  );
}
