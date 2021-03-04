import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const Spacer = styled.div`
  display: flex;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
`;

export const SpacerColumn = styled(Spacer)`
  display: flex;
  flex-direction: column;
`;

export const PageTitle = styled(motion.div)`
  font-size: 32px;
  margin-top: 24px;
  text-align: left;
  width: 100%;
  padding-left: 32px;
  box-sizing: border-box;
  font-weight: 600;
`;

export const PageSubTitle = styled(motion.div)`
  font-size: 16px;
  margin-bottom: 24px;
  color: #888;
  text-align: left;
  width: 100%;
  padding-left: 32px;
  box-sizing: border-box;
`;

export const BaseButton = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0;
  align-items: center;
  justify-content: center;
  display: flex;
  background: none;
  font-weight: 600;
`;

export const Fast = styled.span`
  font-weight: 600;
  margin: 0 4px;
`;

export const BrandButton = styled(BaseButton)<{ disabled?: boolean }>`
  color: ${({ disabled }) => (disabled ? "#eee" : "white")};
  background: ${({ disabled }) => (disabled ? "#ccc" : "black")};
  padding: 8px 24px;
  border-radius: 4px;
  width: 200px;
  height: 40px;
`;

export const NavButton = styled(BaseButton)`
  background: none;
  font-size: 16px;
  color: #333;

  span {
    margin: 4px;
    transition: all ease 0.3s;
  }

  svg {
    margin-top: 2px;
  }

  :hover {
    span {
      margin: 12px;
    }
  }
`;

export const Spinner = styled.div`
  :after {
    border-radius: 50%;
    width: 2em;
    height: 2em;
  }

  border-radius: 50%;
  width: 2em;
  height: 2em;

  margin: 60px auto;
  font-size: 5px;
  position: relative;
  text-indent: -9999em;
  border-top: 1em solid rgba(255, 255, 255, 0.2);
  border-right: 1em solid rgba(255, 255, 255, 0.2);
  border-bottom: 1em solid rgba(255, 255, 255, 0.2);
  border-left: 1em solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;

  @-webkit-keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes load8 {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;
