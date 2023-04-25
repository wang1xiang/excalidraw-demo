const ls = {
  getItem(key: string) {
    const data = window.localStorage.getItem(key)
    if (data) {
      try {
        return JSON.parse(data)
      } catch (e) {
        console.error(e)
      }
    }
  },
  setItem(key: string, value: any) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
      console.error(e)
    }
  },
  removeItem(key: string) {
    window.localStorage.removeItem(key)
  },
}
export default ls
