  import { FaHistory } from "react-icons/fa";

  import PropTypes from "prop-types";
  import { useState } from "react";


  const History = ({fullResult}) => {
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);
    //const [history, setHistory] = useState([]);

    const showHistory = ()=>{
      setIsHistoryVisible(!isHistoryVisible)
    }

    /*useEffect(()=>{
      localStorage.setItem('historyData', JSON.stringify(fullResult));
    }, [fullResult])

    useEffect(() => {
      const storedData = localStorage.getItem('historyData');
      if (storedData) {
        setHistory(JSON.parse(storedData));
      }
    }, []);*/

    return (
      <section>
          <header className="flex items-center justify-end py-3">
            <button onClick={showHistory} className="p-3 text-xl text-white font-semibold flex items-center justify-center border-2 border-white rounded-lg hover:scale-110 transition-all"><FaHistory size={20} color="white"/></button>
          </header>
          <div className={`absolute w-full left-0 ${isHistoryVisible ? 'h-4/5' : 'h-0'} bg-black rounded-t-lg rounded-b-2xl transition-all duration-100 flex flex-col-reverse overflow-auto`}>
            <ul className={`${isHistoryVisible ? 'block delay-200' : 'hidden'} text-right flex flex-col-reverse p-10 delay-200 overflow-auto`}>
              {fullResult.map((equation, index)=>{
                return <li className="text-white text-3xl my-2" key={index}>{equation}</li>
              })} 
            </ul>
          </div>
      </section>
    )
  }
  History.propTypes = {
    fullResult: PropTypes.array.isRequired,
  };

  export default History