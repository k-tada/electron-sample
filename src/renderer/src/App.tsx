import { myStyle } from './style.css'
import { FileRenamer } from './components/FileRenamer/index'

function App(): JSX.Element {
  return (
    <div className={myStyle}>
      <FileRenamer />
    </div>
  )
}

export default App
