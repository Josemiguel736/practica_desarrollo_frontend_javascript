export const buildNotification = (notification, format, type) => {
  return `
    <div class="notification ${format} ${type}">
    <span>${notification} </span> 
    </div>`;
};
