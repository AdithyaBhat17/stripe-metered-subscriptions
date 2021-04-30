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

  :hover,
  :active,
  :focus {
    background-color: ${({ theme }) => theme.color.celadonBlue};
  }

  :disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
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
  input,
  select {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 0.25rem;
    border: 1px solid #ececec;
    padding: 1rem;
  }

  select {
    padding-right: 2rem !important;
  }

  input {
    appearance: none;
  }
`;

export const Grid = styled.div`
  padding: 1rem;
  display: grid;
  justify-items: center;
  align-items: center;
  min-height: 100vh;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 10px;
  @media (max-width: 600px) {
    padding: 1rem 0;
  }
`;

export const GridItem = styled.div`
  width: 80%;
  background-color: white;
  padding: 2rem;
  border-radius: 5px;
  border: 1px solid #eaeaea;

  @media (max-width: 600px) {
    width: 90%;
  }
`;

export const Item = styled.p`
  display: flex;
  justify-content: space-between;
`;
