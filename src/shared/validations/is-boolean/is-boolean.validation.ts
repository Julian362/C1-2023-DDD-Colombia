export const IsBoolean = (value: any): boolean => {
  if (typeof value !== 'boolean') {
    return false;
  }
  return true;
};
