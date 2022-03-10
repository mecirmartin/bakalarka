import styled from "@emotion/styled"

export const Body = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 100%;
`

export const Header = styled.div`
  display: flex;
  background: rgb(30, 30, 30);
  flex-grow: 0;
  flex-shrink: 0;
  color: white;
  font-family: Helvetica, Arial, sans-serif;
  padding: 10px;
  align-items: center;
`

export const Content = styled.div`
  display: flex;
  flex-grow: 1;
`

export const Layer = styled.div`
  position: relative;
  flex-grow: 1;
  outline: none;
`

export const TrayHeader = styled.h3`
  color: white;
  font-family: Helvetica;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`

export const ButtonTray = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
`

export const TrayButton = styled.button`
  color: white;
  font-family: Helvetica, Arial;
  padding: 5px;
  margin: 0px 10px;
  border: solid 1px rgb(0, 192, 255);
  border-radius: 5px;
  margin-bottom: 2px;
  cursor: pointer;
  background-color: rgb(20, 20, 20);
  margin-top: 1rem;
  width: 80%;
`
