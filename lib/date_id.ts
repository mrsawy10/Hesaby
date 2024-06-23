function generateUniqueId() {
  const date = new Date();
  const uniqueId = `${date.getFullYear()}${
    date.getMonth() + 1
  }${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`;
  return uniqueId;
}

export default generateUniqueId;
