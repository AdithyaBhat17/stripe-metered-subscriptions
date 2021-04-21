import styled from "@emotion/styled";

export const PrimaryButton = styled.button`
  border: none;
  padding: 1rem;
  margin-top: 0.7rem;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.color.prussianBlue};
  color: ${({ theme }) => theme.color.white};
`;

export const UserDetails = styled.form`
  background-color: #fff;
  padding: 5rem;
  margin: 0 auto;

  width: 30%;

  @media (max-width: 991px) {
    width: 60%;
  }

  @media (max-width: 700px) {
    width: 100%;
    padding: 2rem;
  }
`;

export const FormGroup = styled.div`
  width: 100%;
  label {
    opacity: 0.8;
    margin-bottom: 5px;
    font-size: 0.75rem;
    text-transform: uppercase;
  }
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    appearance: none;
    border-radius: 0.25rem;
    border: 1px solid #ececec;
    padding: 1rem;
  }
`;
