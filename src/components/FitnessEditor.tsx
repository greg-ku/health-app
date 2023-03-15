import { useState } from 'react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const FitnessEditor = () => {
  const [weight, setWeight] = useState()
  const [bodyFat, setBodyFat] = useState()
  const [muscle, setMuscle] = useState()
  const [setupDate, setSetupDate] = useState(new Date())

  return (
    <>
      <div className="mt-3">體重</div>
      <div>
        <input
          type="number"
          inputmode="numeric"
          className="w-full px-3 py-2 border border-gray-400 rounded"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>
      <div className="mt-2">體脂肪</div>
      <div>
        <input
          type="number"
          inputmode="numeric"
          className="w-full px-3 py-2 border border-gray-400 rounded"
          value={bodyFat}
          onChange={(e) => setBodyFat(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>
      <div className="mt-2">肌肉量</div>
      <div>
        <input
          type="number"
          inputmode="numeric"
          className="w-full px-3 py-2 border border-gray-400 rounded"
          value={muscle}
          onChange={(e) => setMuscle(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>
      <div className="mt-2">設定日期</div>
      <div>
        <DatePicker
          selected={setupDate}
          onChange={(date) => setSetupDate(date)}
          className="w-full px-3 py-2 border border-gray-400 rounded"
        />
      </div>
      <button className="w-full px-3 py-2 rounded bg-sky-500 text-white mt-4">
        儲存
      </button>
    </>
  )
}

export default FitnessEditor
