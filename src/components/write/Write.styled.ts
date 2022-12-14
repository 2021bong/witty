import styled from 'styled-components';

export const NoticeCurcle = styled.span`
  display: inline-block;
  width: 0.5rem;
  height: 0.5rem;
  margin-right: 5px;
  border-radius: 50%;
  background-color: ${({ noticeColor }: { noticeColor: string }) =>
    noticeColor};
  transform: translateY(-2px);
`;

export const Preview = styled.li`
  position: relative;
  width: 25%;
  height: 100px;
  margin-right: 5px;
  border-radius: 10px;
  background: ${({ $imgUrl }: { $imgUrl: string }) =>
    `no-repeat center/120% url(${$imgUrl})`};

  .delete {
    position: absolute;
    right: 0;
    border-radius: 50%;
    font-size: 1.2rem;
    color: #fff;
    opacity: 80%;
    cursor: pointer;
    transition: scale 0.3s ease-in-out;
    box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);

    &:hover {
      opacity: 100%;
      transform: scale(105%);
    }
    &:active {
      opacity: 80%;
      transform: scale(100%);
    }
  }
`;

export const Container = styled.div`
  .mainContainer {
    width: 100%;
    height: 100%;
    margin-top: 20px;

    .categoryContainer {
      display: flex;
      margin-bottom: 10px;

      .category {
        margin-right: 5px;
        padding: 5px;
        border: 1px solid ${({ theme }) => theme.mainColor};
        border-radius: 5px;
        font-size: 14px;
        color: ${({ theme }) => theme.mainColor};
        cursor: pointer;
      }

      .selected {
        background-color: ${({ theme }) => theme.mainColor};
        color: #fff;
      }
    }

    form {
      margin-bottom: 10px;

      .writeBoard {
        width: 100%;
        height: 16rem;
        padding: 20px;
        border-radius: 10px;
        border: 1px solid ${({ theme }) => theme.border};
      }
    }

    .photoContainer {
      width: 100%;

      .preveiwContainer {
        display: flex;
        width: 100%;
        margin-bottom: 8px;
      }

      .inputAndLabelContainer {
        display: flex;
        align-items: center;

        .photoIcon {
          margin-right: 10px;
          color: ${({ theme }) => theme.mainColor};
          font-size: 1.5rem;
          cursor: pointer;
        }

        .disabled {
          color: ${({ theme }) => theme.text};
          cursor: not-allowed;
        }

        .countPhotoBox {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          margin-right: 5px;
          border: 1px solid ${({ theme }) => theme.mainColor};
          border-radius: 50%;
        }

        .fill {
          border: none;
          background-color: ${({ theme }) => theme.mainColor};
        }

        .hiddenFileInput {
          display: none;
        }
      }
    }

    .propContainer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;

      .lengthContainer {
        padding-left: 8px;
      }

      .btnContainer {
        display: flex;
        justify-content: flex-end;
        padding-right: 8px;

        button {
          padding: 10px;
          border: none;
          border-radius: 10px;
        }

        .cancleBtn {
          &:hover {
            background-color: ${({ theme }) => theme.mainColor};
            color: #fff;
          }
          &:active {
            background-color: ${({ theme }) => theme.mainColor2};
            color: #fff;
          }
        }

        .completeBtn {
          margin-left: 5px;
          background-color: ${({ theme }) => theme.mainColor};
          color: #fff;

          &:hover {
            background-color: ${({ theme }) => theme.subColor};
          }
          &:active {
            background-color: ${({ theme }) => theme.mainColor2};
          }
        }
      }
    }
  }
`;
