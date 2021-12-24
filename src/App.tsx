import { useRef } from "react"
import { Application } from "./Application"
import { BodyWidget } from "./components/BodyWidget"

const App = () => {
  const childRef = useRef()
  const app = new Application()
  return (
    <>
      {/* @ts-ignore */}
      <button onClick={() => childRef.current.handleSerialize()}>
        Serialize
      </button>
      {/* @ts-ignore */}
      <button onClick={() => childRef.current.handleDeserialize()}>
        Deserialize
      </button>
      <BodyWidget app={app} ref={childRef} />
    </>
  )
}

export default App
