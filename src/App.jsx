import { useState, useEffect } from 'react';
import {IoMdSunny, IoMdRainy,  IoMdCloudy, IoMdSnow, IoMdThunderstorm, IoMdSearch} from 'react-icons/io';
import {BsCloudHaze2Fill, BsCloudDrizzleFill, BsEye, BsWater, BsThermometer, BsWind} from 'react-icons/bs';
import {TbTemperatureCelsius} from 'react-icons/tb';
import {ImSpinner8} from 'react-icons/im';
import './input.css'
import { MdSearch } from 'react-icons/md';

const APIkey = 'c788255c21aa5b39f5c6d4e64937a7b7';


function App() {

  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Bucarest');
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue !== '' ) {
      setLocation(inputValue)
      }
  const input = document.querySelector('input');

  if (input.value == '') {
    setAnimate(true);
    setTimeout(() => {
      setAnimate(false);
    }, 500);
  }

  input.value = ''; /*clear input after click*/
  }

  useEffect(() => {
    
    setLoading(true);

     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`)
     .then((response) => response.json())
     .then((json) => {
      setTimeout(() => {
          setData(json);
          setLoading(false);
        }, 1000);
    })
    .catch((err) => {
      setLoading(false);
      setErrorMsg(err);
    });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('')
    }, 2000);
    return () => clearTimeout(timer);
  }, [errorMsg]);

 if (!data) {
  return (
    <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover flex flex-col justify-center items-center'> 
      <div> 
        <ImSpinner8 className='text-5x1 animate-spin text-white'/>
      </div>
    </div>
  )};


  let icon

  switch (data.weather[0].main) {
    case 'Clouds':
      icon = <IoMdCloudy className='text-[#d7dadc]'/>
      break;
    case 'Haze':
        icon = <BsCloudHaze2Fill/>
      break;
    case 'Rain':
          icon = <IoMdRainy className='text-[#6bc5e3d4]'/>
      break;
    case 'Clear':
      icon = <IoMdSunny className='text-[#e2d847d4]'/>
      break;
    case 'Drizzle':
      icon = <BsCloudDrizzleFill className='text-[#6bc5e3d4]'/>
      break ; 
    case 'Snow':
      icon = <IoMdSnow className='text-[#6bc5e3d4]'/>
      break;
    case 'Thunderstorm':
      icon = <IoMdThunderstorm className='text-[#6bc5e3d4]'/>
      break;
  };

  const date = new Date()

  return (

    <div className='w-full h-screen  bg-gradientBg bg-no-repeat bg-cover flex flex-col items-center justify-center lg:px-0'>  
      {errorMsg && <div>{`${errorMsg.response.data.message}`}</div>}
      
    {/*form*/}
      <form className={`${animate ? 'animate-shake' : 'animate-none'} h-16 sm:h-2px bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] sm:backdrop-blur-[8px] mb-8 sm:mb-[2px]`}>
        <div className='h-full relative flex items-center justify-between p-2'>
          <input  
            onChange={(e) => handleInput(e)}
            className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[15px] sm:text[6px]font-light pl-6 h-full sm:h-[6px]' type="text" placeholder='Search by city or country'
          />
          <button 
          onClick={(e) => handleSubmit(e)}
          className='bg-[#1ab8ed] hover:bg-[#15abdd] w-20 h-12 sm:h-6 rounded-full flex items-center justify-center transition'>
            <MdSearch className='text-2xl text-white'/>
          </button>
        </div>
      </form>
      {/*card*/}  
      <div className='w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6 sm:py-2px sm:px-2px '>
        {loading ? 
            ( <div className='w-full h-full flex justify-center items-center'>
                <ImSpinner8 className='text-white text-5Xl animate-spin'/>
            </div>
            )  : (
          <div>
            {/*card top*/}
            <div className='flex items-center gap-x-5'>
              {/*icon*/}
                <div className='text-[87px] sm:text-[67px]'>{icon}</div>
                <div>
                {/*country name*/}
                <div className='text-2xl font-semibold'>{data.name}, {data.sys.country}</div>
                {/*date*/}
                <div>{date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}</div>
                </div>
            </div>
              {/*card body*/}
            <div className='my-20 sm:my-[4px]'>
              <div className='flex justify-center'>
                <div className='flex-col'>
                {/*temp*/}
                <div className='text-[144px] sm:tex-[80px] leading-none font-light'>{parseInt(data.main.temp)}
                </div>
                </div>   
               {/*celsius icon*/}
                <div className='text-2xl flex justify-start'>
                    <TbTemperatureCelsius/>
                  </div>
                </div>
                {/*weahter description*/}
                <div className='capitalize text-center'>{data.weather[0].description}</div> 
            </div>
              {/*card botton*/}
            <div className='max-w-[378px] mx-auto flex flex-col gap-y-6 '>
              <div className='flex justify-between'>
                <div className='flex items-center gap-x-2 p-2'>
                  {/*icon*/}
                  <div className='text-[20px]'>
                    <BsEye/>
                  </div>
                  <div>Visibility {''}
                    <span className='ml-2'>
                      {data.visibility / 1000} Km
                    </span>
                  </div>
                </div>
                <div className='flex items-center gap-x-2 p-2'>
                  {/*icon*/}
                  <div className='text-[20px]'>
                    <BsThermometer/>
                  </div>
                  <div className='flex'>Feels Like
                    <span className='flex ml-2'>
                      {parseInt(data.main.feels_like)} 
                      <TbTemperatureCelsius/>
                    </span>
                  </div>
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='flex items-center gap-x-2 p-2'>
                  {/*icon*/}
                  <div className='text-[20px]'>
                    <BsWater/>
                  </div>
                  <div>Humidity
                    <span className='ml-2'>
                      {data.main.humidity} %
                    </span>
                  </div>
                </div>
                <div className='flex items-center gap-x-2 p-2'>
                  {/*icon*/}
                  <div className='text-[20px]'>
                    <BsWind/>
                  </div>
                  <div className='flex ml-2'>Wind
                    <span className='flex ml-2'>
                      {data.wind.speed} m/s 
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App;
