import { useEffect, useState, type RefObject } from 'react';

interface SectionPosition {
  id: string;
  top: number;
}

export function findActiveSection(positions: SectionPosition[], marker: number): string | null {
  let active: string | null = null;
  for (const section of positions) {
    if (section.top <= marker) active = section.id;
    else break;
  }
  return active;
}

export function useActiveSection(sectionIds: readonly string[], headerRef: RefObject<HTMLElement | null>) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    let frame: number | null = null;
    let disposed = false;
    const sections = sectionIds.flatMap(id => {
      const element = document.getElementById(id);
      return element ? [{ id, element }] : [];
    });

    const update = () => {
      frame = null;
      headerRef.current?.toggleAttribute('data-scrolled', window.scrollY > 8);
      const headerHeight = headerRef.current?.getBoundingClientRect().height ?? 0;
      const marker = headerHeight + Math.min(160, window.innerHeight * 0.2);
      const positions = sections.map(({ id, element }) => ({ id, top: element.getBoundingClientRect().top }));
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      setActiveSection(atBottom ? (sections.at(-1)?.id ?? null) : findActiveSection(positions, marker));
    };

    const scheduleUpdate = () => {
      if (!disposed && frame === null) frame = window.requestAnimationFrame(update);
    };

    const updateHeaderOffset = () => {
      const height = headerRef.current?.getBoundingClientRect().height;
      if (height) document.documentElement.style.setProperty('--header-offset', `${height}px`);
      scheduleUpdate();
    };

    const headerObserver = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateHeaderOffset);
    if (headerRef.current) headerObserver?.observe(headerRef.current);
    updateHeaderOffset();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', updateHeaderOffset);
    window.addEventListener('hashchange', scheduleUpdate);
    void document.fonts?.ready.then(scheduleUpdate);

    return () => {
      disposed = true;
      if (frame !== null) window.cancelAnimationFrame(frame);
      headerObserver?.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', updateHeaderOffset);
      window.removeEventListener('hashchange', scheduleUpdate);
      document.documentElement.style.removeProperty('--header-offset');
    };
  }, [sectionIds, headerRef]);

  return activeSection;
}
