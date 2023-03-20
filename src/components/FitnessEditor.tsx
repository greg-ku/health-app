import { useState, useEffect } from 'react'
import { startOfDay } from 'date-fns'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useFitnessByDate, saveFitnessByDate } from '/src/storage/fitness'

interface IFitnessEditorProps {
  onSavedFinished?: () => void
}

const FitnessEditor = ({ onSavedFinished }: IFitnessEditorProps) => {
  const [weight, setWeight] = useState<number>(0)
  const [bodyFat, setBodyFat] = useState<number>(0)
  const [muscle, setMuscle] = useState<number>(0)
  const [setupDate, setSetupDate] = useState<Date>(startOfDay(new Date()))

  const [fitness, setFitness] = useFitnessByDate<Date>(setupDate)
  useEffect(() => {
    setWeight(fitness?.weight ?? weight)
    setBodyFat(fitness?.bodyFat ?? bodyFat)
    setMuscle(fitness?.muscle ?? muscle)
  }, [fitness])

  const onSaveFitness = async () => {
    await saveFitnessByDate({
      ...fitness,
      weight: parseFloat(weight) ?? fitness?.weight,
      bodyFat: parseFloat(bodyFat) ?? fitness?.bodyFat,
      muscle: parseFloat(muscle) ?? fitness?.muscle,
      date: setupDate?.toISOString() || fitness?.date,
    })
    if (onSavedFinished) {
      onSavedFinished()
    }
    toast('儲存成功！')
  }

  return (
    <>
      <div className="mt-3">體重</div>
      <div>
        <input
          type="number"
          inputMode="numeric"
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
          inputMode="numeric"
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
          inputMode="numeric"
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
      <button
        className="w-full px-3 py-2 rounded bg-sky-500 text-white mt-4"
        onClick={onSaveFitness}
      >
        儲存
      </button>
    </>
  )
}

export default FitnessEditor
