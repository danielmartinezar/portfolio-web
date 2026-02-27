export const isActive = (currentPath: string, linkHref: string): boolean => {
  const withoutLang = currentPath.replace(/^\/(en|es)/, '') || '/';
  const linkWithoutLang = linkHref.replace(/^\/(en|es)/, '') || '/';
  if (linkWithoutLang === '/') return withoutLang === '/';
  return withoutLang.startsWith(linkWithoutLang);
};
