import {Button} from '@heroui/button'; 
import { HomeIcon } from 'lucide-react';

export default function Page() {
  return (
    <div>
      <Button>Click me</Button>
      <HomeIcon color='red' size={48}/>
    </div>
  )
}