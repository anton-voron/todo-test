export function sanitizeObject(obj: any): object {
  Object.keys(obj).forEach(key => {
    if (obj[key] && typeof obj[key] === 'object') {
      sanitizeObject(obj[key]);
      if ((typeof obj[key] === 'object') && Object.keys(obj[key]).length ===
        0) {
        delete obj[key];
      }
    } else if (obj[key] === undefined) {
      delete obj[key];
    }
  });
  return obj;
}
