export default function formatDate(dateString) {
  const date = new Date(dateString);
  
  const dateOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Asia/Ho_Chi_Minh'
  };

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Ho_Chi_Minh'
  };

  const formattedDate = date.toLocaleDateString('vi-VN', dateOptions);
  const formattedTime = date.toLocaleTimeString('vi-VN', timeOptions);

  return `${formattedTime} - ${formattedDate}`;
}