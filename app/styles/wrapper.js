import styled from "styled-components";

export const HomeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);

  .hover-white {
    background-color: #000000;
    color: #ffffff;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;

    &:hover {
      background-color: #ffffff;
      color: #000000;
      border: 1px solid #000000;
      transition: background-color 0.3s, color 0.3s;
    }
`;

export const HomeLink = styled.a`
  display: inline-block;
  padding: 10px 18px;
  border-radius: 8px;
  background: #0d6efd; /* bootstrap primary */
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 6px 18px rgba(13, 110, 253, 0.12);
  transition: transform 120ms ease, box-shadow 120ms ease, background 120ms ease;

  &:hover,
  &:focus {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(13, 110, 253, 0.16);
    background: #0b5ed7;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 6px 18px rgba(13, 110, 253, 0.12);
  }

  &.secondary {
    background: #6c757d;
    box-shadow: 0 6px 18px rgba(108, 117, 125, 0.08);

    &:hover {
      background: #5c636a;
    }
  }

  @media (max-width: 480px) {
    padding: 10px 14px;
    font-size: 14px;
  }
`;

export const HeaderWrapper = styled.header`
  .nav-link {
    &:hover {
      text-decoration: underline;
      background-color: #000000;
      color: #ffffff;
    }
  }
`;

export default HomeWrapper;
