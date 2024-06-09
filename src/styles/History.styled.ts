import styled from "styled-components";

export const HistoryContainer = styled.div`
  text-align:center;

  @media (max-width: 600px) {
    margin: 0 2rem;
    text-align:left;
  }

  .sub {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;

    @media (max-width: 600px) {
      justify-content:start;
    }

    .no-info {
      @media (max-width: 600px) {
        height: 70vh;
      }
    }

    .items {
      display: flex;
      background-color:${({ theme }) => theme.colors.primary};
      color: white;
      border-radius: 12px;

      @media (max-width: 600px) {
        width: 100%;
      }
    }

    .img-container {
      position:relative;
      flex: 0 0 80%;
      height: 77px;   
      
      & img {
        border-radius: 12px;
        object-fit: cover;

        @media (max-width: 600px) {
          width: 100%;
        }
      }

      & h2 {
        color: white;
        position: absolute;
        display: flex;
        align-items: center;
        inset: 0;
        height: 100%;
        width: 100%;
        z-index: 3;
        background: #00000082;
        box-sizing: border-box;
        margin: 0;
        font-weight:700;
        font-size: 18px;
        padding-left:10px;
        border-radius: 12px;
      }
    }

    .choice-container {
      flex:1;
      align-content: center;
      text-align: center;

      svg {
        font-size: 23px;
        padding: 0 12px;
      }

      .reject {
        color:#D36060;
      }

      .accept {
        color: ${({ theme }) => theme.colors.currentText};
      }
    }
  }
`;
