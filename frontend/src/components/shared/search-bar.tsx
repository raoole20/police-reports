import React from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import { Button } from '../ui/button'

export default function SearchBar() {
  return (
    <div className='flex gap-1'>
        <Input />
        <Button type='button' size={'icon'} className='aspect-square' variant={'outline'}>
            <Search />
        </Button>
    </div>
  )
}
