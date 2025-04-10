
import './App.css'
import { Button } from './components/ui/Button'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

function App() {


  return (
    <div className='flex justify-center items-center gap-12 mt-4'>
      <Button onclick={()=>{}} startIcon={<PlusIcon size='lg' />}  size='sm' variant='primary' text='Share' />
      <Button onclick={()=>{}} startIcon={<ShareIcon size='md'/>} size='sm' variant='secondary' text='Add Content' />
      
    </div>
  )
}

export default App
