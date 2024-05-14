"use strict";
function timeFormat(timestamp) {
  const currentTime = (/* @__PURE__ */ new Date()).getTime();
  const difference = currentTime - timestamp;
  const minutes = Math.floor(difference / (1e3 * 60));
  const hours = Math.floor(difference / (1e3 * 60 * 60));
  const days = Math.floor(difference / (1e3 * 60 * 60 * 24));
  const months = Math.floor(difference / (1e3 * 60 * 60 * 24 * 30));
  if (difference < 6e4) {
    return "1分钟";
  } else if (difference < 36e5) {
    return `${minutes}分钟`;
  } else if (difference < 864e5) {
    return `${hours}小时`;
  } else if (difference < 2592e6) {
    return `${days}天`;
  } else if (difference < 31536e6) {
    return `${months}月`;
  } else {
    return null;
  }
}
exports.timeFormat = timeFormat;
