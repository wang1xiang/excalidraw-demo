import { WelcomeScreen } from '@excalidraw/excalidraw'

const BasicWelcome = () => {
  return (
    <WelcomeScreen>
      <WelcomeScreen.Center>
        <WelcomeScreen.Center.Logo />
        <WelcomeScreen.Center.Heading>
          欢迎使用Excalidraw
        </WelcomeScreen.Center.Heading>
        <WelcomeScreen.Center.Menu>
          <WelcomeScreen.Center.MenuItemLink href="https://github.com/excalidraw/excalidraw">
            GitHub
          </WelcomeScreen.Center.MenuItemLink>
          <WelcomeScreen.Center.MenuItemHelp />
        </WelcomeScreen.Center.Menu>
      </WelcomeScreen.Center>
    </WelcomeScreen>
  )
}

export default BasicWelcome
