import { useState } from 'react'

import TextInput from '/src/components/TextInput'
import Button from '/src/components/Button'


const WaterIntakeEditor = () => {
  const [water, setWater] = useState<number>(0)

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
      <Button>
        加水
      </Button>
    </>
  )
}

export default WaterIntakeEditor
