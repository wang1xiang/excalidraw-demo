import { MainMenu } from '@excalidraw/excalidraw'

const BasicMainMenu = () => {
  return (
    <MainMenu>
      <MainMenu.DefaultItems.LoadScene />
      <MainMenu.DefaultItems.SaveAsImage />
      <MainMenu.DefaultItems.ChangeCanvasBackground />
      <MainMenu.Group title="Excalidraw items">
        <MainMenu.DefaultItems.Socials />
        <MainMenu.DefaultItems.Export />
      </MainMenu.Group>
      <MainMenu.Group title="custom items">
        <MainMenu.Item onSelect={() => window.alert('Item1')}>
          Item1
        </MainMenu.Item>
        <MainMenu.Item onSelect={() => window.alert('Item2')}>
          Item 2
        </MainMenu.Item>
      </MainMenu.Group>
    </MainMenu>
  )
}

export default BasicMainMenu