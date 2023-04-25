import { useDevice, Footer } from '@excalidraw/excalidraw'

const MobileFooter = () => {
  const device = useDevice()
  if (device.isMobile) {
    return (
      <Footer>
        <button
          className="custom-footer"
          style={{ marginLeft: '20px', height: '2rem' }}
          onClick={() => alert('This is custom footer in mobile menu')}
        >
          custom footer
        </button>
      </Footer>
    )
  }
  return null
}


export default MobileFooter