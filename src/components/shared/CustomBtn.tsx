import { Button } from 'antd'
import { ReactNode } from 'react'

const CustomBtn = ({children}:{children:ReactNode}) => {
  return <Button className="mt-6 text-white py-[1.5rem] hover:border-slate-800 hover:border-2 hover:bg-transparent font-bold hover:text-slate-800 bg-slate-800 rounded-none">
  {children}
</Button>
}

export default CustomBtn