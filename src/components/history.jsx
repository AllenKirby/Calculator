  import { FaHistory } from "react-icons/fa";

  import PropTypes from "prop-types";
  import { useState } from "react";


  const History = ({fullResult}) => {
    const [isHistoryVisible, setIsHistoryVisible] = useState(false);

    const showHistory = ()=>{
      setIsHistoryVisible(!isHistoryVisible)
    }

    return (
      <section>
          <header className="flex items-center justify-end py-3">
            <button onClick={showHistory} className="py-1 px-4 text-2xl text-white font-semibold flex items-center justify-center border-2 border-white rounded-lg hover:scale-110 transition-all divide-purple-300"><FaHistory size={20} color="white" /><p className="pl-3">History</p></button>
          </header>
          <div className={`absolute ${isHistoryVisible ? 'w-full h-4/5' : 'w-0 h-0'} bg-black right-0 rounded-t-lg rounded-b-2xl transition-all duration-100 flex flex-col-reverse`}>
            <ul className={`${isHistoryVisible ? 'block delay-200' : 'hidden'} text-right flex flex-col-reverse p-10 delay-200`}>
              {fullResult.map((equation, index)=>{
                return <li className="text-white text-3xl my-2" key={index}>{equation}</li>
              })} 
            </ul>
          </div>
      </section>
    )
  }
  History.propTypes = {
    fullResult: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  export default History