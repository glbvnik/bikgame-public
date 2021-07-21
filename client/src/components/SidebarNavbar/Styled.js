import styled from 'styled-components'

const Bottom = styled.div`
  font-size: 12px;
  margin-top: auto;
`

const BottomTitle = styled.p`
  margin-bottom: 20px;
  padding-left: 20px;

  @media (max-device-width: 428px) and (orientation: landscape) {
    padding-left: 28px;
  }
`

const Darkened = styled.div`
  background-color: black;
  height: 100%;
  opacity: 0;
  transition: all 375ms linear;
  visibility: hidden;
  width: 100%;
  z-index: 2;
  position: fixed;
  top: 0;
`

const IconLeft = styled.div`
  cursor: pointer;
  font-size: 30px;
  pointer-events: visible !important;
  height: 30px;
  
  & * {
    color: ${ ({ sidebar }) => (sidebar ? '#020403' : '#f5f5f5') };

    &:active { color: darkgoldenrod }

    &:hover { opacity: 0.7 }
  }
`

const IconRight = styled.div`
  cursor: pointer;
  font-size: 30px;
  height: 30px;
  
  & * {
    color: #f5f5f5;
    
    &:active { color: darkgoldenrod }

    &:hover { opacity: 0.7 }
  }
`

const MenuTitle = styled.a`
  display: flex;
  font-size: 22px;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 12px;
  
  &:nth-child(1) { margin-bottom: 28px }
`

const MyNavbar = styled.div`
  align-items: center;
  background: transparent;
  display: flex;
  height: 60px;
  justify-content: space-between;
  padding: 0 15px;
  z-index: 3;
  position: sticky;
  top: 0;
`

const MySidebar = styled.div`
  background-color: #f5f5f5;
  height: 100%;
  left: ${ ({ sidebar }) => (sidebar ? '0' : '-300px') };
  opacity: 0.9;
  overflow: auto;
  pointer-events: visible !important;
  transition: 375ms;
  z-index: 2;
  width: 300px;
  position: fixed;
  top: 0;
`

const NavbarTitle = styled.h1`
  font-family: 'Michroma', sans-serif;
  font-size: 30px;
  font-weight: lighter;
  margin: 0;
  
  & *:hover { opacity: 1 }
`

const SidebarWrap = styled.div`
  padding-top: 28px;
  display: flex;
  flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  margin-top: 60px;

  @media (max-device-width: 428px) and (orientation: landscape) {
    padding-top: 7px;
  }
`

const SubmenuTitle = styled.a`
  display: flex;
  font-size: 19px;
  justify-content: space-between;
  margin-bottom: 14px;
  padding-left: 36px;
`

const SubmenuWrap = styled.div`
  overflow: auto;
  margin: 14px 0;
  transition: max-height 375ms ease-in-out;
  width: 100%;
  max-height: 0;
`

export { Bottom, BottomTitle, Darkened, IconLeft, IconRight, MenuTitle, MyNavbar, MySidebar, NavbarTitle, SidebarWrap, SubmenuTitle, SubmenuWrap }
