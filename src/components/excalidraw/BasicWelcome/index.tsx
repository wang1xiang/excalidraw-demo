import { WelcomeScreen } from '@excalidraw/excalidraw'

const BasicWelcome = () => {
  return (
    <WelcomeScreen>
      <WelcomeScreen.Hints.HelpHint />
      <WelcomeScreen.Hints.MenuHint />
      <WelcomeScreen.Hints.ToolbarHint />
      <WelcomeScreen.Center>
        <WelcomeScreen.Center.Heading>
          欢迎使用白板
        </WelcomeScreen.Center.Heading>
        <WelcomeScreen.Center.Menu>
          <WelcomeScreen.Center.MenuItemLoadScene />
          <WelcomeScreen.Center.MenuItemHelp />
        </WelcomeScreen.Center.Menu>
      </WelcomeScreen.Center>
    </WelcomeScreen>
  )
}

export default BasicWelcome
