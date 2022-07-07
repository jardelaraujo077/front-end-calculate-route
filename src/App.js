import { display, height } from "@mui/system";
import BoxForm from "./components/boxForm";
import CircularIndeterminate from "./components/loading";
import { useEffect, useState } from 'react'


function App() {
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    document.title = 'Jardel Araujo'
  }, [])
  return (
    <>
      <div style={styles.container}>     
          <h1 style={styles.containerText}>Cálculo de delivery por Km</h1>
        <div style={{ width: '100%' }}>
          <BoxForm setLoading={setLoading.bind(this)} />

        </div>
      </div>
      {
        loading &&
        <div style={styles.containerBackdrop}>
          <CircularIndeterminate />
        </div>
      }

    </>
  );
}
const styles = {
  container: {

    width: '100%',
    display: 'flex',
    maxWidth: 1024,
    flexDirection: 'column',
    padding: 28,
    background: '#fff',
    border: '1px solid rgb(0,0,0,0.5)',
    borderRadius: 13,
    position: 'relative',
    boxShadow: 'black 11px 7px 6px 9px'

  },
  containerBackdrop: {
    display: 'flex',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgb(0,0,0,0.6)',
    height: '100%',
    top: 0
  },
  containerText:{
    fontFamily: "sans-serif", 
    textAlign: 'center',
    marginTop: 71,
    marginBlockEnd: 0

  }

}

export default App;
