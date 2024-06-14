import { format } from 'date-fns';

const date = new Date();

export const formattedDate = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  day: '2-digit',
  month: 'long',
  year: 'numeric',
}).format(date);

export const getGreetings = () => {
  const currentHour = date.getHours();
  if (currentHour >= 1 && currentHour <= 10) {
    return 'Good Morning';
  } else if (currentHour >= 11 && currentHour <= 16) {
    return 'Good Afternoon';
  } else if (currentHour >= 17 && currentHour <= 20) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
};

export const showFormattedDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('id-ID', options);
};

export const handleDateFormat = (date) => {
  const formattedDate = format(new Date(date), 'yyyy-MM-dd');
  return formattedDate;
};

export const downloadBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};
