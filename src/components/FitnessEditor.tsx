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
  const [boneMass, setBoneMass] = useState<number>(0)
  const [totalBodyWater, setTotalBodyWater] = useState<number>(0)
  const [muscle, setMuscle] = useState<number>(0)
  const [bodyMassScore, setBodyMassScore] = useState<number>(0)
  const [basalMetabolicRate, setBasalMetabolicRate] = useState<number>(0)
  const [physicalAge, setPhysicalAge] = useState<number>(0)
  const [visceralFat, setVisceralFat] = useState<number>(0)
  const [setupDate, setSetupDate] = useState<Date>(startOfDay(new Date()))

  const [fitness, setFitness] = useFitnessByDate<Date>(setupDate)
  useEffect(() => {
    setWeight(fitness?.weight ?? weight)
    setBodyFat(fitness?.bodyFat ?? bodyFat)
    setBoneMass(fitness?.boneMass ?? boneMass)
    setTotalBodyWater(fitness?.totalBodyWater ?? totalBodyWater)
    setMuscle(fitness?.muscle ?? muscle)
    setBodyMassScore(fitness?.bodyMassScore ?? bodyMassScore)
    setBasalMetabolicRate(fitness?.basalMetabolicRate ?? basalMetabolicRate)
    setPhysicalAge(fitness?.physicalAge ?? physicalAge)
    setVisceralFat(fitness?.visceralFat ?? visceralFat)
  }, [fitness])

  const onSaveFitness = async () => {
    await saveFitnessByDate({
      ...fitness,
      weight: parseFloat(weight) ?? fitness?.weight,
      bodyFat: parseFloat(bodyFat) ?? fitness?.bodyFat,
      boneMass: parseFloat(boneMass) ?? fitness?.boneMass,
      totalBodyWater: parseFloat(totalBodyWater) ?? fitness?.totalBodyWater,
      muscle: parseFloat(muscle) ?? fitness?.muscle,
      bodyMassScore: parseFloat(bodyMassScore) ?? fitness?.bodyMassScore,
      basalMetabolicRate: parseFloat(basalMetabolicRate) ?? fitness?.basalMetabolicRate,
      physicalAge: parseFloat(physicalAge) ?? fitness?.physicalAge,
      visceralFat: parseFloat(visceralFat) ?? fitness?.visceralFat,
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
          inputMode="decimal"
          className="w-full px-3 py-2 border border-gray-400 rounded"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div className="mt-2">體脂率%</div>
      <div>
        <input
          type="number"
          inputMode="decimal"
          className="w-full px-3 py-2 border border-gray-400 rounded"
          value={bodyFat}
          onChange={(e) => setBodyFat(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div className="mt-2">推定骨量</div>
      <div>
        <input
          type="number"
          inputMode="decimal"
          className="w-full px-3 py-2 border border-gray-400 rounded"
          value={boneMass}
          onChange={(e) => setBoneMass(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div className="mt-2">總含水率%</div>
      <div>
        <input
          type="number"
          inputMode="decimal"
          className="w-full px-3 py-2 border border-gray-400 rounded"
          value={totalBodyWater}
          onChange={(e) => setTotalBodyWater(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div className="mt-2">肌肉量</div>
      <div>
        <input
          type="number"
          inputMode="decimal"
          className="w-full px-3 py-2 border border-gray-400 rounded"
          value={muscle}
          onChange={(e) => setMuscle(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div className="mt-2">體質分數</div>
      <div>
        <input
          type="number"
          inputMode="decimal"
          className="w-full px-3 py-2 border border-gray-400 rounded"
          value={bodyMassScore}
          onChange={(e) => setBodyMassScore(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div className="mt-2">基礎代謝率</div>
      <div>
        <input
          type="number"
          inputMode="decimal"
          className="w-full px-3 py-2 border border-gray-400 rounded"
          value={basalMetabolicRate}
          onChange={(e) => setBasalMetabolicRate(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div className="mt-2">身體年齡</div>
      <div>
        <input
          type="number"
          inputMode="decimal"
          className="w-full px-3 py-2 border border-gray-400 rounded"
          value={physicalAge}
          onChange={(e) => setPhysicalAge(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div className="mt-2">內臟脂肪</div>
      <div>
        <input
          type="number"
          inputMode="decimal"
          className="w-full px-3 py-2 border border-gray-400 rounded"
          value={visceralFat}
          onChange={(e) => setVisceralFat(e.target.value)}
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
