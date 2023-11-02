type ResourceType = 'image' | 'avatar';

const resolveResourceUrl = (type: ResourceType, partialPath: string | null) => {
  const config = useRuntimeConfig();

  if (partialPath) {
    return config.public.apiBaseUrl + '/' + partialPath;
  }

  return type === 'image'
    ? '/fallback-image.jpg'
    : '/fallback-avatar.jpg';
};

const parseLocalDate = (utcDateString: string) => {
  const utcDate = new Date(utcDateString);
  const timeZoneOffset = utcDate.getTimezoneOffset() * 60 * 1000;
  return new Date(utcDate.getTime() - timeZoneOffset);
};

const formatPrice = (price: number | string) => {
  return Number(price).toFixed(2) + '$';
};

const formatDate = (date: string | Date) => {
  const currentLanguage = window.navigator.language;

  return new Date(date).toLocaleString(currentLanguage, {
    dateStyle: 'medium',
  });
};

export { resolveResourceUrl, parseLocalDate, formatPrice, formatDate };
