import { ChangeEvent } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { CATEGORY } from './constant';

export const getTime = (time: string) => {
  const createdAt = new Date(time);
  const year = createdAt.getFullYear();
  const month = createdAt.getMonth() + 1;
  const date = createdAt.getDate();
  return `${year}/${
    month.toString().length === 1 ? '0' + month.toString() : month
  }/${date.toString().length === 1 ? '0' + date.toString() : date}`;
};

export const getDetailTime = (time: string) => {
  const createdAt = new Date(time);
  const year = createdAt.getFullYear();
  const month = createdAt.getMonth() + 1;
  const date = createdAt.getDate();
  const hour = createdAt.getHours();
  const min = createdAt.getMinutes();
  return `${year}/${
    month.toString().length === 1 ? '0' + month.toString() : month
  }/${date.toString().length === 1 ? '0' + date.toString() : date} ${
    hour.toString().length === 1 ? '0' + hour.toString() : hour
  }:${min.toString().length === 1 ? '0' + min.toString() : min}`;
};

export const getCategory = (cateArr: string[] | undefined) => {
  if (!cateArr) return CATEGORY;
  return CATEGORY.map((cate) =>
    cateArr.includes(cate.name)
      ? { ...cate, selected: true }
      : { ...cate, selected: false }
  );
};

export const setColor = (textValue: string) => {
  if (textValue.length < 100) {
    return '#00B388';
  } else if (textValue.length < 120) {
    return '#FAB922';
  } else {
    return '#FA3270';
  }
};

export const handleIconcolor = (
  e: ChangeEvent,
  setCmtIconColor: (boolean: boolean) => void
) => {
  e.type === 'focus' ? setCmtIconColor(true) : setCmtIconColor(false);
};

export const goEditMode = (
  id: number | string | undefined,
  navigate: NavigateFunction
) => {
  navigate(`/edit/${id}`);
};

export const AddComma = (number: number | null) => {
  return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
