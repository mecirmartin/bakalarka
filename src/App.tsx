import { Application } from "./Application"
import { BodyWidget } from "./components/BodyWidget"

const App = () => {
  const app = new Application()
  return <BodyWidget app={app} />
}

export default App
