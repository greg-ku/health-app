import { useState, useEffect } from 'react'
import { startOfDay } from 'date-fns'
import DatePicker, { registerLocale } from "react-datepicker"
import zhTW from 'date-fns/locale/zh-TW'
import "react-datepicker/dist/react-datepicker.css"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { useFitnessByDate, saveFitnessByDate } from '/src/storage/fitness'
import TextInput from '/src/components/TextInput'
import Button from '/src/components/Button'

registerLocale('zh-TW', zhTW)

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
        <TextInput
          type="number"
          inputMode="decimal"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div className="mt-2">體脂率%</div>
      <div>
        <TextInput
          type="number"
          inputMode="decimal"
          value={bodyFat}
          onChange={(e) => setBodyFat(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div className="mt-2">推定骨量</div>
      <div>
        <TextInput
          type="number"
          inputMode="decimal"
          value={boneMass}
          onChange={(e) => setBoneMass(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div className="mt-2">總含水率%</div>
      <div>
        <TextInput
          type="number"
          inputMode="decimal"
          value={totalBodyWater}
          onChange={(e) => setTotalBodyWater(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div className="mt-2">肌肉量</div>
      <div>
        <TextInput
          type="number"
          inputMode="decimal"
          value={muscle}
          onChange={(e) => setMuscle(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div className="mt-2">體質分數</div>
      <div>
        <TextInput
          type="number"
          inputMode="decimal"
          value={bodyMassScore}
          onChange={(e) => setBodyMassScore(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div className="mt-2">基礎代謝率</div>
      <div>
        <TextInput
          type="number"
          inputMode="decimal"
          value={basalMetabolicRate}
          onChange={(e) => setBasalMetabolicRate(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div className="mt-2">身體年齡</div>
      <div>
        <TextInput
          type="number"
          inputMode="decimal"
          value={physicalAge}
          onChange={(e) => setPhysicalAge(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>

      <div className="mt-2">內臟脂肪</div>
      <div>
        <TextInput
          type="number"
          inputMode="decimal"
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
          locale="zh-TW"
        />
      </div>
      <Button onClick={onSaveFitness}>
        儲存
      </Button>
    </>
  )
}

export default FitnessEditor
