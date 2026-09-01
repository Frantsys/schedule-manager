'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

type BlockSelectorProps = {
  items: string[]; 
  onSelectRange: (startItem: string | null, endItem: string | null) => void;
};

export function BlockSelector({ items, onSelectRange }: BlockSelectorProps) {
  const [selectedStart, setSelectedStart] = useState<number | null>(null);
  const [selectedEnd, setSelectedEnd] = useState<number | null>(null);
  const [selectedItemStart, setSelectedItemStart] = useState<string | null>(null);
  const [selectedItemEnd, setSelectedItemEnd] = useState<string | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  // Referência para o container, para capturar eventos de mouse globalmente
  const containerRef = useRef<HTMLDivElement>(null);

  // Quando o mouse é solto em qualquer lugar, finaliza a seleção
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isSelecting && selectedStart !== null && selectedEnd !== null) {
        // Ordena os índices para garantir que o intervalo seja do menor para o maior
        const start = Math.min(selectedStart, selectedEnd);
        const end = Math.max(selectedStart, selectedEnd);
        onSelectRange(selectedItemStart, selectedItemEnd);
      }
      // Reseta o estado
      setSelectedStart(null);
      setSelectedEnd(null);
      setIsSelecting(false);
    };

    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isSelecting, selectedStart, selectedEnd, onSelectRange]);

  // Início do clique
  const handleMouseDown = (index: number, item: string) => {
    setSelectedStart(index);
    setSelectedEnd(index);

    setSelectedItemStart(item);
    setSelectedItemEnd(item);

    setIsSelecting(true);
  };

  // Mouse entra em um novo bloco enquanto pressionado
  const handleMouseEnter = (index: number, item: string) => {
    if (isSelecting && selectedStart !== null) {
      setSelectedEnd(index);
      setSelectedItemEnd(item);
    }
  };

  const isSelected = useCallback(
    (index: number) => {
      if (selectedStart === null || selectedEnd === null) return false;
      const start = Math.min(selectedStart, selectedEnd);
      const end = Math.max(selectedStart, selectedEnd);
      return index >= start && index <= end;
    },
    [selectedStart, selectedEnd]
  );

  return (
    <div ref={containerRef} className="">
      {items.map((item, index) => (
        <div
          key={index}
          style={{ gridRow: `${items.indexOf(item) + 1} / span 1` }}
          onMouseDown={() => handleMouseDown(index, item)}
          onMouseEnter={() => handleMouseEnter(index, item)}
          className={`
            h-full w-full flex items-center justify-center border-b cursor-pointer select-none
            transition-colors duration-150
            ${isSelected(index) ?`'bg-gray-200 
              border-slate-500 
              border-l border-r border-t
              
              ` : 'bg-background '}
            ${!isSelecting && 'hover:bg-gray-100'}
          `}
          />
      ))}
    </div>
  );
}