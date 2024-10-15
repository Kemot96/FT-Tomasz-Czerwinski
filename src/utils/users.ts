export function getUserFullName(first_name: string, last_name: string) {
  return first_name + ' ' + last_name;
}

export function isValidImageUrl(url: string) {
  try {
    new URL(url);
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  } catch (_) {
    return false;
  }
}
