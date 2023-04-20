import Head from 'next/head'
import axios from 'axios'
import { useState } from "react";
import Image from 'next/image';


export default function Home() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e2888f284c2ab0f776bb3f3f190c36aa`;

  const searchLocation = () => {
    axios.get(url)
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log("hata")
      });
  };

  return (
    <>
      <Head>
        <title>is it a cloud</title>
        <meta name="description" content="isita.cloud web base open source weather app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='app'>

          <div className='topBar'>
            <input className='input' type="text" placeholder='Şehir İsmi Girin' onChange={(event) => setLocation(event.target.value)} onKeyUp={searchLocation} />
            <button className='button' onClick={searchLocation}>Ara</button>
          </div>

          <div className='mainBar'>
            <div className='celsiusBar' >
              {/*bu kodu gpt den aldım eğer data.name && eklemezsem hata veriyor bu şekilde düzgün bu kod data name yanlışsa error vermemesini sağlıyor*/}
              {data.main && (
                <>
                  <h1 className='locationH1'>{data.name}</h1>
                  {data.main && <p className='locationTemp' >{(data.main.temp - 273.15).toFixed(0)} Derece</p>}
                </>
              )}
            </div>
            <div className='humidityBar'>
              {data.main && (
                <>
                  <p className='nemOran'>{data.main.humidity}</p>
                  <h1 className='nemH1'>Nem Oranı</h1>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

    </>
  )
}
