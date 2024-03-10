import { RiDeleteBack2Line } from "react-icons/ri";

import { useEffect, useState } from "react";

import History from './history'

const Container = () => {
  const [equation, setEquation] = useState('');
  const [startedTyping, setStartedTyping] = useState(false);
  const [result, setResult] = useState('');
  const [toHistory, setToHistory] = useState([])


  const getEquation = (number) => {
    setEquation(prevEquation => {
      if (!startedTyping && prevEquation === '0') {
        if (number === '.' || number === '+' || number === '-' || number === 'x' || number === '÷') {
          return prevEquation + number;
        }
        return number;
      }
      else if(equation.slice(-1) === '.' && number === '.' || equation.slice(-1) === '+' && number === '+' || equation.slice(-1) === '-' && number === '-' || equation.slice(-1) === 'x' && number === 'x' || equation.slice(-1) === '÷' && number === '÷'){
        return equation;
      }
      else if (prevEquation === '0' && number === '0') {
        return prevEquation;
      }
      else if (number === '%') {
        const percentage = parseFloat(prevEquation) / 100;
        return percentage.toString();
      }
      return prevEquation + number;
    });
    setStartedTyping(true);
  };

  useEffect(()=>{
    if(equation == ''){
      setStartedTyping(false);
      setEquation('0')
    }
  }, [equation])

  const calculateEquation = () =>{
    try{
      const finalEquation = equation.replace(/x/g, '*').replace(/÷/g, '/');
      const newResult = eval(finalEquation);
      setResult(newResult);
      const newHistory = `${equation} = ${newResult}`;
      setToHistory(prevToHistory => [...prevToHistory, newHistory]);
    }
    catch(error){
      console.log("Error in calculation:", error)
      setEquation('')
    }
  }

  return (
    <section className="md:w-auto w-full h-auto relative bg-slate-900 rounded-2xl shadow-2xl shadow-sky-900 opacity-85">
        <section className="py-8 px-12 bg-blue-900 rounded-t-2xl">
          <History fullResult={toHistory} />
          <div className="flex items-center justify-end">
            <input disabled className="w-80 h-auto bg-transparent text-white text-5xl text-right overflow-auto" value={equation} style={{ direction: 'rtl' }}/>
          </div>
          <div className="flex items-center justify-end py-3">
            <p className="w-auto h-auto text-white text-5xl text-right">{result}</p>
          </div>
        </section>
        <section className="w-full h-auto p-7 grid grid-cols-4 grid-rows-5 gap-10">
          <button onClick={()=> {setEquation(''); setResult('');}} className="w-14 h-14 text-blue-900 text-4xl font-bold hover:text-5xl transition-all duration-300">C</button>
          <button onClick={()=> setEquation(prevEquation => prevEquation.slice(0, -1))} className="w-14 h-14 text-white text-4xl flex items-center justify-center"><RiDeleteBack2Line color="rgb(30 58 138)" /></button>
          <button onClick={()=> getEquation('%')} className="w-14 h-14 text-blue-900 text-4xl font-bold hover:text-5xl transition-all duration-300">%</button>
          <button onClick={()=> getEquation('÷')} className="w-14 h-14 text-blue-900 text-5xl font-bold hover:text-6xl transition-all duration-300">÷</button>
          <button onClick={()=> getEquation('7')} className="w-14 h-14 text-white text-4xl hover:text-5xl transition-all duration-300">7</button>
          <button onClick={()=> getEquation('8')} className="w-14 h-14 text-white text-4xl hover:text-5xl transition-all duration-300">8</button>
          <button onClick={()=> getEquation('9')} className="w-14 h-14 text-white text-4xl hover:text-5xl transition-all duration-300">9</button>
          <button onClick={()=> getEquation('x')} className="w-14 h-14 text-blue-900 text-4xl font-bold hover:text-5xl transition-all duration-300">x</button>
          <button onClick={()=> getEquation('4')} className="w-14 h-14 text-white text-4xl hover:text-5xl transition-all duration-300">4</button>
          <button onClick={()=> getEquation('5')} className="w-14 h-14 text-white text-4xl hover:text-5xl transition-all duration-300">5</button>
          <button onClick={()=> getEquation('6')} className="w-14 h-14 text-white text-4xl hover:text-5xl transition-all duration-300">6</button>
          <button onClick={()=> getEquation('-')} className="w-14 h-14 text-blue-900 text-4xl font-bold hover:text-5xl transition-all duration-300">-</button>
          <button onClick={()=> getEquation('1')} className="w-14 h-14 text-white text-4xl hover:text-5xl transition-all duration-300">1</button>
          <button onClick={()=> getEquation('2')} className="w-14 h-14 text-white text-4xl hover:text-5xl transition-all duration-300">2</button>
          <button onClick={()=> getEquation('3')} className="w-14 h-14 text-white text-4xl hover:text-5xl transition-all duration-300">3</button>
          <button onClick={()=> getEquation('+')} className="w-14 h-14 text-blue-900 text-4xl font-bold hover:text-5xl transition-all duration-300">+</button>
          <button className="w-14 h-14 text-blue-900 text-4xl font-bold hover:text-5xl transition-all duration-300">+/-</button>
          <button onClick={()=> getEquation('0')} className="w-14 h-14 text-white text-4xl hover:text-5xl transition-all duration-300">0</button>
          <button onClick={()=> getEquation('.')} className="w-14 h-14 text-blue-900 text-4xl font-bold hover:text-5xl transition-all duration-300">.</button>
          <button onClick={calculateEquation} className="w-16 h-16 text-white text-3 xl font-bold rounded-full bg-blue-900 hover:scale-125 transition-all duration-300">=</button>
        </section>
    </section>
  )
}

export default Container  