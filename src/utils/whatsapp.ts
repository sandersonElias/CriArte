export const WA_NUMBER = '5511999990000';

export function waLink(msg: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function scrollToId(id: string, offset = 64): void {
  const attemptScroll = () => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      return true;
    }
    return false;
  };

  if (!attemptScroll()) {
    setTimeout(attemptScroll, 100);
  }
}
