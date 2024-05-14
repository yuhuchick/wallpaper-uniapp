export function timeFormat(timestamp) {
  const currentTime = new Date().getTime();
  const difference = currentTime - timestamp;

  // 计算时间差的各个单位
  const minutes = Math.floor(difference / (1000 * 60));
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));

  // 根据时间差返回相应的描述
  if (difference < 60000) {
    return '1分钟';
  } else if (difference < 3600000) {
    return `${minutes}分钟`;
  } else if (difference < 86400000) {
    return `${hours}小时`;
  } else if (difference < 2592000000) {
    return `${days}天`;
  } else if (difference < 31536000000) {
    return `${months}月`;
  } else {
    return null;
  }
}