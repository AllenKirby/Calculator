import { RiDeleteBack2Line } from "react-icons/ri";

import { useEffect, useRef, useState } from "react";

import History from './history'

const Container = () => {
  const [equation, setEquation] = useState('');
  const [startedTyping, setStartedTyping] = useState(false);
  const [toHistory, setToHistory] = useState([])
  const lastResult = useRef(null);
  const [IsNegative, setIsNegative] = useState(false)


  const getEquation = (input) => {
    setEquation(prevEquation => {

      const lastCharacterIsOperator = ['+', '-', 'x', '÷', '.'].includes(prevEquation.slice(-1));
      const isOperator = ['+', '-', 'x', '÷', '.'].includes(input);

      if(!startedTyping && prevEquation === '0'){
        if(input === '.'){
          return '0.';
        } 
        else if (isOperator || input === '0'){
          return 0;
        }
        else{
          return input;
        }
      }
      else if(lastCharacterIsOperator && isOperator){
        return prevEquation.slice(0, -1) + input;
      }
      return prevEquation.toString() + input.toString();
    });
    setStartedTyping(true);
  };

  const squared = () =>{
    if (!isNaN(Number(equation))) {
      const eq = equation;
      const squared = Math.pow(eq, 2)
      setEquation(squared.toString());
      const result = `${eq}^2 = ${squared}`;
      setToHistory(prevToHistory => [...prevToHistory, result]);
    }
  }

  const percentage = () =>{
    if (!isNaN(Number(equation))) {
      const eq = equation;
      const percentage = parseFloat(eq) / 100;
      setEquation(percentage.toString());
      const result = `${eq} = ${percentage}%`;
      setToHistory(prevToHistory => [...prevToHistory, result]);
    }
  }

  const squareRoot = () =>{
    if (!isNaN(Number(equation))) {
      const eq = equation;
      const squareRoot = Math.sqrt(parseFloat(eq));
      setEquation(squareRoot.toString());
      const result = `√${eq} = ${squareRoot}`;
      setToHistory(prevToHistory => [...prevToHistory, result]);
    }
  }

  const positiveNegative = () => {
    if (!IsNegative) {
      if (!isNaN(Number(equation)) && equation.slice(-1) !== '0') {
        setEquation(`(-${equation})`);
        setIsNegative(true)
      } else {
        let numbers = '';
        let eq = '';
  
        for (let i = equation.length - 1; i >= 0; i--) {
          if ('+-x÷'.includes(equation[i])) {
            if (i > 0) {
              numbers = equation.slice(i + 1);
              eq = equation.slice(0, i + 1);
            } else {
              numbers = equation;
            }
            break;
          }
        }
        setEquation(eq + (numbers !== '' ? `(-${numbers})` : ''));
        setIsNegative(true)
      }
    } else {
      let numbers = '';
      let eq = '';
  
      for (let i = equation.length - 1; i >= 0; i--) {
        if (equation[i] === '-' && equation[i - 1] === '(') {
          numbers = equation.slice(i + 1).replace(')', '');
          eq = equation.slice(0, i - 1);
          setEquation(eq + numbers);
          break;
        }
      }
      setIsNegative(false)
    }
  };
  

  useEffect(()=>{
    if(equation == ''){
      setStartedTyping(false);
      setEquation('0')
    }
  }, [equation])

  useEffect(()=>{
    if(positiveNegative && '+-x÷'.includes(equation.slice(-1))){
      setIsNegative(false);
    }
  }, [equation])
  

  const calculateEquation = () =>{
    try{
      const eq =  equation;
      const finalEquation = eq.replace(/x/g, '*').replace(/÷/g, '/');
      const newResult = eval(finalEquation);
      if(newResult === 0){
        setEquation('');
      }
      else{
        setEquation(newResult.toString())
      }
      const newHistory = `${eq} = ${newResult}`;
      setToHistory(prevToHistory => [...prevToHistory, newHistory]);
    }
    catch(error){
      console.log("Error in calculation:", error)
      setEquation('')
    }
  }

  return (
    <section className="md:w-auto w-full h-auto relative rounded-3xl shadow-black shadow-lg">
        <section className="py-8 px-12 bg-black rounded-3xl">
          <header className="w-full h-auto flex items-center justify-between">
            <p className="text-white text-2xl font-bold">Calculator</p>
            <History fullResult={toHistory} />
          </header>
          <div className="py-7 flex items-center justify-end">
            <input disabled ref={lastResult} className={`w-72 h-auto bg-transparent text-white font-bold text-right overflow-auto ${equation && equation.length >=10 ? 'text-3xl' : 'text-5xl'}`} value={equation}/>
          </div>
        </section>
        <section className="w-full h-auto p-7 rounded-2xl grid grid-cols-4 grid-rows-5 gap-y-4 gap-x-5">
          <button onClick={()=> {setEquation(''); setIsNegative(true); }} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-stone-500 text-3xl font-bold hover:scale-125 transition-all duration-300">C</button>
          <button onClick={()=> setEquation(prevEquation => prevEquation.slice(0, -1))} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-white text-3xl flex items-center justify-center hover:scale-125 transition-all duration-300 "><RiDeleteBack2Line color="rgb(115 115 115)" /></button>
          <button onClick={()=> getEquation('(')} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-stone-500 text-3xl font-bold hover:scale-125 transition-all duration-300">(</button>
          <button onClick={()=> getEquation(')')} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-stone-500 text-3xl font-bold hover:scale-125 transition-all duration-300">)</button>
          <button onClick={positiveNegative} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-stone-500 text-2xl font-bold hover:scale-125 transition-all duration-300">+/-</button>
          <button onClick={squared} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-stone-500 text-2xl font-bold hover:scale-125 transition-all duration-300">x²</button>
          <button onClick={squareRoot} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-stone-500 text-2xl font-bold hover:scale-125 transition-all duration-300">√</button>
          <button onClick={()=> getEquation('÷')} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-stone-500 text-4xl font-bold hover:scale-125 transition-all duration-300">÷</button>
          <button onClick={()=> getEquation('7')} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-black text-3xl font-bold hover:scale-125 transition-all duration-300">7</button>
          <button onClick={()=> getEquation('8')} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-black text-3xl font-bold hover:scale-125 transition-all duration-300">8</button>
          <button onClick={()=> getEquation('9')} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-black text-3xl font-bold hover:scale-125 transition-all duration-300">9</button>
          <button onClick={()=> getEquation('x')} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-stone-500 text-3xl font-bold hover:scale-125 transition-all duration-300">x</button>
          <button onClick={()=> getEquation('4')} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-black text-3xl font-bold hover:scale-125 transition-all duration-300">4</button>
          <button onClick={()=> getEquation('5')} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-black text-3xl font-bold hover:scale-125 transition-all duration-300">5</button>
          <button onClick={()=> getEquation('6')} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-black text-3xl font-bold hover:scale-125 transition-all duration-300">6</button>
          <button onClick={()=> getEquation('-')} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-stone-500 text-3xl font-bold hover:scale-125 transition-all duration-300">-</button>
          <button onClick={()=> getEquation('1')} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-black text-3xl font-bold hover:scale-125 transition-all duration-300">1</button>
          <button onClick={()=> getEquation('2')} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-black text-3xl font-bold hover:scale-125 transition-all duration-300">2</button>
          <button onClick={()=> getEquation('3')} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-black text-3xl font-bold hover:scale-125 transition-all duration-300">3</button>
          <button onClick={()=> getEquation('+')} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-stone-500 text-3xl font-bold hover:scale-125 transition-all duration-300">+</button>
          <button onClick={percentage} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-stone-500 text-3xl font-bold hover:scale-125 transition-all duration-300">%</button>
          <button onClick={()=> getEquation('0')} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-black text-3xl font-bold hover:scale-125 transition-all duration-300">0</button>
          <button onClick={()=> getEquation('.')} className="w-16 h-16 shadow-md shadow-stone-500 rounded-lg text-stone-500 text-3xl font-bold hover:scale-125 transition-all duration-300">.</button>
          <button onClick={calculateEquation} className="w-16 h-16 text-white text-3xl font-bold shadow-md shadow-stone-500 rounded-lg bg-black hover:scale-125 transition-all duration-300">=</button>
        </section>
    </section>
  )
}

export default Container  