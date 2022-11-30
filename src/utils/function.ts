export const getTime = (time: string) => {
  const createdAt = new Date(time);
  const year = createdAt.getFullYear();
  const month = createdAt.getMonth();
  const date = createdAt.getDate();
  return `${year}/${
    month.toString().length === 1 ? 0 + month.toString() : month
  }/${date.toString().length === 1 ? 0 + date.toString() : date}`;
};

export const getDetailTime = (time: string) => {
  const createdAt = new Date(time);
  const year = createdAt.getFullYear();
  const month = createdAt.getMonth();
  const date = createdAt.getDate();
  const hour = createdAt.getHours();
  const min = createdAt.getMinutes();
  return `${year}/${
    month.toString().length === 1 ? 0 + month.toString() : month
  }/${date.toString().length === 1 ? 0 + date.toString() : date} ${
    hour.toString().length === 1 ? 0 + hour.toString() : hour
  }:${min.toString().length === 1 ? 0 + min.toString() : min}`;
};
