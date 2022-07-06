import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react'
import { cepFormater, formaterPrice, viaCep, validateInfo } from '../../function';
import api from '../../api';
import useMediaQuery from '@mui/material/useMediaQuery';
import ImageAvatars from '../avatar';
export default function BoxForm(props) {
    const { setLoading } = props
    const [data, setData] = useState({ in: '', for: '', deliveryPrice: 0 })
    const [maps, setMaps] = useState(false)
    const [address, setAddress] = useState({ origin: '', destination: '' })
    const [deliveryPrice, setDelivery] = useState(0)
    const [time, setTime] = useState("")
    const [way, setWay] = useState('/static/JardelAraujo.jpg')
    const matches = useMediaQuery('(max-width:956px)')



    const onchange = async (e) => {
        let { name, value } = e.target
        if (value.length <= 9 && (name == 'in' || name == 'for')) {
            value = await cepFormater(value)
            setData({ ...data, [name]: value })
        } else if (name == 'deliveryPrice') {
            setData({ ...data, [name]: value })
        }


    }
    const getCep = async () => {
        let addressViaCep = {}

        if (data.in !== '') {
            addressViaCep = await viaCep(data.in)           
            await setAddress({ ...address, origin: `${addressViaCep.logradouro},${addressViaCep.bairro},${addressViaCep.localidade}` })


        }
        if (data.for !== '') {
            addressViaCep = await viaCep(data.for)
            await setAddress({ ...address, destination: `${addressViaCep.logradouro},${addressViaCep.bairro},${addressViaCep.localidade}` })
        }

    }    
    const save = async () => {
        setLoading(true)
        if(!await validateInfo(data)){
            alert('Por favor preencha corretamente os campos')
            setLoading(false)
            return false
        }
        data.deliveryPrice = formaterPrice(data.deliveryPrice)
        data.in = data.in.replace(/\-/g, '')
        data.for = data.for.replace(/\-/g, '')        
        let deliveryPrice = data.deliveryPrice

        try {
            await api.post(`/searchRoute`, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST, GET',
                    'Access-Control-Allow-Headers': '*',

                },

            })
                .then(async response => {
                    const { data, status = 0 } = response
                    const { distance, duration, } = data                   
                    if (status == 200) {
                        distance.text = distance.text.split(' ')[0]                          
                        await setDelivery(Number(deliveryPrice) * Number(distance.text))
                        await setTime(duration.text)
                        await setMaps(true)
                    }
                    setLoading(false)

                })
                .catch((err) => {
                    console.log('err', err)
                    setLoading(false)
                })

        } catch {

        }

    }
    const reCalcular = async () =>{
        await setMaps(false)
        await setAddress({origin: '', destination: ''})
        await setData({in: '', for: '', deliveryPrice: ''})
    }
 

    return (
        <div style={{ ...styles.containerButton, ...matches ? { flexDirection: 'column' } : '' }}>          
              <a style={{cursor: 'pointer',color: '#000'}} href="https://www.linkedin.com/in/jardel-marinho-a15157138/">
                <ImageAvatars  title={'Jardel Araujo'} src={way}/> </a>         
            <div style={{ ...styles.group, ...matches ? { flexDirection: 'row', maxWidth: 'unset', flexWrap: 'wrap' } : '' }}>
                <div style={styles.contentButton}>
                    <TextField id="standard-basic" label="CEP de" disabled={maps ? true : false} variant="standard" name="in" value={data.in} onChange={onchange} onBlur={getCep} />
                </div>
                <div style={styles.contentButton}>
                    <TextField id="standard-basic" label="CEP para" disabled={maps ? true : false} variant="standard" name="for" value={data.for} onChange={onchange} onBlur={getCep} />
                </div>
                <div style={styles.contentButton}>
                    <TextField id="standard-basic" label="Preço por KM" disabled={maps ? true : false} variant="standard" name="deliveryPrice" value={data.deliveryPrice} onChange={onchange} />
                </div>
                <div style={styles.contentButton}>
                    <Button color="secondary" style={styles.calcule} onClick={() => save()}>Cálcular </Button>
                    <Button color="secondary" style={styles.recalcule} onClick={() => reCalcular()}>Fazer outro cálculo </Button>
                </div>
                {
                    maps &&
                    <div style={styles.containeInfo}>
                        <span><b>Valor total: R$ {deliveryPrice.toFixed(2).replace('.', ',')}</b></span>
                        <span><b>Melhor tempo: {time} </b></span>
                    </div>
                }

            </div>
            <div style={{ ...styles.containeMap, ...matches ? {padding: 0} : '' }}>

                {
                    maps &&
                    <>

                        <iframe
                            style={styles.maps}
                            frameborder="0"
                            referrerpolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/directions?key=${process.env.REACT_APP_KEY}&origin=${address.origin}&destination=${address.destination}&avoid=tolls|highways`}
                            allowfullscreen>

                        </iframe>
                    </>
                }

            </div>

        </div>
    )


}
const styles = {
    containerButton: {
        padding: '20px',
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
      
    },
    containeMap:{
        padding: '0px 40px', 
        width: '100%'
    },
    group: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 300,
        height: '100%',
        width: '100%'

    },
    contentButton: {
        padding: '20px',
        display: 'flex',
        flexDirection: 'column'
    },
    calcule: {
        background: '#17cc00',
        color: '#fff',
        margin: 5
    },
    recalcule: {
        background: '#0300cc',
        color: '#fff',
        margin: 5
    },
    containeInfo: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20
    },
    maps: {
        maxWidth: 650,
        maxHeight: 450,
        width: '100%',
        height: '100%',
        border: 0
    },
   
}
