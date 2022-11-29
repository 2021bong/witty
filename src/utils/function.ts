export const getTime = (time: string) => {
  const createdAt = new Date(time);
  const year = createdAt.getUTCFullYear();
  const month = createdAt.getUTCMonth();
  const date = createdAt.getUTCDate();
  return `${year}/${month}/${date}`;
};

export const getDetailTime = (time: string) => {
  const createdAt = new Date(time);
  const year = createdAt.getUTCFullYear();
  const month = createdAt.getUTCMonth();
  const date = createdAt.getUTCDate();
  const hour = createdAt.getUTCHours();
  const min = createdAt.getUTCMinutes();
  return `${year}/${month}/${date} ${hour}:${min}`;
};
