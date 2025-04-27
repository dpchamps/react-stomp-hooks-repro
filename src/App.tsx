import './App.css'
import { StompSessionProvider } from "react-stomp-hooks";
import {useState, useCallback} from "react";

const stableHeaders = {
    'X-CustomHeader': "This is a custom value"
}

function App() {
  const [count, setCount] = useState(0);
  const [disconnectCount, setDisconnectCount] = useState(0);
  const [useStableHeaders, setUseStableHeaders] = useState(false)
  const onDisconnect = useCallback(() => {
      setDisconnectCount((last) => last+1)
  }, []);
  const unstableHeaders = {
      'X-CustomHeader': "This is a custom value"
  }

  return (
    <StompSessionProvider
      url={'https://stream.elite12.de/api/sock'}
      connectHeaders={useStableHeaders ? stableHeaders : unstableHeaders}
      onDisconnect={onDisconnect}
    >
        <h2>
            Disconnect Count {disconnectCount}
        </h2>
        <button onClick={() => setCount((last) => last+1)}>Trigger Top Level Rerender {count}</button>
        <label for={'useStableHeaders'}>Use Stable Headers</label>
        <input id={'useStableHeaders'} type={'checkbox'} onClick={(e) => setUseStableHeaders((e.target as any).checked)}/>
    </StompSessionProvider>
  )
}

export default App
