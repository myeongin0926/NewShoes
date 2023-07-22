export default function scrollToTop() {
  const y = document.documentElement.scrollTop || document.body.scrollTop;
  if (y > 0) {
    window.requestAnimationFrame(scrollToTop);
    window.scrollTo(0, y - y / 6);
  }
}
