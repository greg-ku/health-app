import { useState } from 'react'
import { toast } from 'react-toastify'

import { addWaterIntakeToDate } from '/src/storage/waterIntake'
import TextInput from '/src/components/TextInput'
import Button from '/src/components/Button'

interface IWaterIntakeEditorProps {
  onSavedFinished?: () => void
}

const WaterIntakeEditor = ({ onSavedFinished }: IWaterIntakeEditorProps) => {
  const [water, setWater] = useState<number>(0)

  const onAddWaterIntakeClick = async () => {
    await addWaterIntakeToDate({ value: parseInt(water), type: 'water' }, new Date())
    if (onSavedFinished) {
      onSavedFinished()
    }
    toast('儲存成功！')
  }

  return (
    <>
      <div className="mt-3">飲水量</div>
      <div>
        <TextInput
          type="number"
          inputMode="decimal"
          value={water}
          onChange={(e) => setWater(e.target.value)}
          onFocus={(e) => e.target.select()}
        />
      </div>
      <Button onClick={onAddWaterIntakeClick}>
        加水
      </Button>
    </>
  )
}

export default WaterIntakeEditor
