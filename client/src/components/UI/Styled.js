import styled from 'styled-components'

const Button = styled.button`
  background: #020403;
  border: none;
  color: #f5f5f5;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  padding: 14px 30px;
  text-decoration: none;
  
  &:active { background-color: darkgoldenrod }

  @media (max-width: 414px) {
    font-size: 12px;
    padding: 14px 20px;
    width: 100px;
  }

  @media (max-width: 414px) { font-size: 11px }
`

const Error = styled.div`
  border: solid 3px #fcecc6;
  border-radius: 8px;
  font-size: 14px;
  padding: 10px;
  text-align: center;
  white-space: normal;
  width: 100%;

  @media (max-width: 414px) { font-size: 13px }

  @media (max-width: 320px) { font-size: 12px }
`

const MyInput = styled.input`
  background-color: #f9f9f9;
  border: solid 2px #f3f3f3;
  border-radius: 5px;
  font-size: 12px;
  padding: 14px 12px;
  width: 100%;
  -webkit-appearance: none;

  &:focus {
    background-color: white;
    border-color: #fcecc6;
    outline: none;
  }

  @media (max-width: 320px) {
    font-size: 11px;
    padding: 12px;
  }
`

const MySelect = styled.select`
  color: ${ ({ isDisabled }) => !isDisabled ? '#020403' : 'grey' };
  background-color: #f9f9f9;
  border: none;
  padding: 14px 8px;
  width: 100%;
  -webkit-appearance: none;

  &:focus {
    background-color: white;
    border-color: #fcecc6;
    outline: none;
  }

  &:hover { opacity: 0.7 }
`

export { Button, Error, MyInput, MySelect }
