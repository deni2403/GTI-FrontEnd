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
