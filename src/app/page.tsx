"use client"
import { Calendar } from '@/components/Calendar'

export default function Home() {
  return (
    <main className='min-w-full min-h-screen'>
      <section className='w-full h-[500px]'><Calendar/></section>
    </main>
  )
}
