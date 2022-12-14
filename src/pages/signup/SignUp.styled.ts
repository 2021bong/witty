import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .title {
    font-size: 2rem;
    margin-bottom: 30px;
    color: ${({ theme }) => theme.mainColor};
  }

  .formContainer {
    width: 80%;
    min-width: 270px;

    .inputContainer {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 30px;

      .desc {
        font-weight: 400;
        margin-top: 8px;
        font-size: 0.9rem;
        color: ${({ theme }) => theme.subColor};
      }

      .true {
        color: ${({ theme }) => theme.mainColor2};
      }

      .inputBtnContainer {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;

        .inputWithBtn {
          margin-right: 5px;
          margin-bottom: 0;
        }

        .btn {
          height: 100%;
          min-width: 80px;
          padding: 8px;
          border: none;
          border-radius: 8px;
          color: #fff;
          background-color: ${({ theme }) => theme.mainColor};

          &:hover {
            background-color: ${({ theme }) => theme.subColor};
          }

          &:active {
            background-color: ${({ theme }) => theme.mainColor2};
          }
        }
      }

      label {
        margin-bottom: 5px;
        font-weight: 700;
      }

      input {
        display: inline-block;
        width: 100%;
        padding: 8px;
        border-radius: 0.6rem;

        &:first-child {
          margin-bottom: 10px;
        }
      }
    }
  }

  .btnContainer {
    width: 80%;
    min-width: 270px;

    .cancelBtn {
      width: 100%;
      height: 40px;
      border: 1px solid #ccc;
      border-radius: 12px;
      color: ${({ theme }) => theme.text};
      background-color: #fff;

      &:hover {
        color: #fff;
        background-color: ${({ theme }) => theme.mainColor};
        border: none;
      }

      &:active {
        color: #fff;
        background-color: ${({ theme }) => theme.mainColor2};
      }

      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
`;
