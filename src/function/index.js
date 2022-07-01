import axio from 'axios';

export const cepFormater = (str) => {
    let re = /^([\d]{2})([\d]{3})([\d]{3})/;
    return str.replace(re, "$1$2-$3")
}
 const formaterPrice = (str) => {
    return str.replace(/\,/g, '.')
}
 const viaCep = async (str) => {
   str = str.replace(/\-/g, '')
   const data = await axio.get(`https://viacep.com.br/ws/${str}/json/`).then(response => {
        const { data } = response        
        const { erro = false } = data     
        return data
    }).catch(err => {
        console.log('err', err)
        return false
    }
    )
    return data

}
export { formaterPrice, viaCep}