import styled, { DefaultTheme } from 'styled-components';
import { FaCommentAlt } from 'react-icons/fa';

export const CommentIcon = styled(FaCommentAlt)`
  margin-right: 10px;
  color: ${({
    $iconColor,
    theme,
  }: {
    $iconColor: boolean;
    theme: DefaultTheme;
  }) => ($iconColor ? theme.mainColor : theme.border)};
  font-size: 1.4rem;
  transition: 0.3s ease-in-out;
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  height: 90vh;
  max-width: 500px;
  margin: 50px auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 1rem;
  color: ${({ theme }) => theme.text};

  .contentContainer {
    width: 100%;
    height: 100%;

    .checked {
      color: ${({ theme }) => theme.mainColor};
    }

    .detailFeedContainer {
      width: 100%;
      padding: 20px;
      border-bottom: 1px solid ${({ theme }) => theme.border};

      .userName {
        margin-bottom: 10px;

        b {
          color: ${({ theme }) => theme.subColor};
        }
      }

      .content {
        margin-bottom: 23px;

        b {
          color: ${({ theme }) => theme.subColor};
        }
      }

      .ctgrAndBmk {
        display: flex;
        justify-content: space-between;

        .goCategory {
          margin: 0;

          .category {
            display: inline-block;
            margin-bottom: 15px;
            padding: 5px;
            border-radius: 5px;
            background-color: ${({ theme }) => theme.mainColor};
            color: #fff;
            font-size: 14px;
          }
        }

        .bookmark {
          text-align: right;
          cursor: pointer;
        }
      }
    }

    .actionContainer {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .interactionContainer {
        display: flex;
        margin-bottom: 15px;

        .likeCountBox {
          margin-right: 20px;
          cursor: pointer;
        }

        span {
          margin: 0 5px;

          b {
            margin-left: 5px;
          }
        }

        svg {
          transform: translateY(2px);
        }
      }

      .date {
        font-size: 14px;
        color: ${({ theme }) => theme.subText};
      }
    }

    .ownerContainer {
      font-size: 1.3rem;

      svg {
        color: ${({ theme }) => theme.subText};

        &:hover {
          color: ${({ theme }) => theme.text};
        }

        &:active {
          color: ${({ theme }) => theme.mainColor2};
        }

        &:first-child {
          margin-right: 8px;
        }
      }
    }
  }

  .formContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 20px 5px 10px 8px;

    input {
      width: 70%;
      margin-right: 15px;
      padding: 5px;
      border: none;
      border-bottom: 1px solid ${({ theme }) => theme.border};
      font-size: 1rem;
      transition: 0.2s ease-in-out;

      &:focus {
        border-bottom: 1px solid ${({ theme }) => theme.mainColor};
      }
    }

    button {
      width: 20%;
      padding: 5px;
      border: 1px solid ${({ theme }) => theme.mainColor};
      border-radius: 5px;
      background-color: #fff;
      color: ${({ theme }) => theme.mainColor};

      &:hover {
        border: 1px solid ${({ theme }) => theme.mainColor};
        background-color: ${({ theme }) => theme.mainColor};
        color: #fff;
      }

      &:active {
        border: 1px solid ${({ theme }) => theme.mainColor2};
        background-color: ${({ theme }) => theme.mainColor2};
        color: #fff;
      }
    }
  }

  .commentsContainer {
    width: 100%;

    .commentBox {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      border-bottom: 1px solid ${({ theme }) => theme.border};

      &:last-child {
        border-bottom: none;
      }

      .nameAndContentBox {
        margin-bottom: 10px;

        .nickname {
          margin-right: 10px;
        }
      }
    }
  }
`;
