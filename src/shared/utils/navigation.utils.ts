export const isActive = (currentPath: string, linkHref: string): boolean => {
  if (linkHref === '/') return currentPath === '/';
  return currentPath.startsWith(linkHref);
};
