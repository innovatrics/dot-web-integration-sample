export const getLastURLSegment = (link: string): string => {
  const id = link.split('/').pop();

  if (!id) {
    throw new Error('Missing id');
  }

  return id;
};
