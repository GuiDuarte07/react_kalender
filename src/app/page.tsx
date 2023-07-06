"use client"
import { Calendar } from '@/components/Calendar'
import KalendEventDialog from '@/components/KalendEventDialog';
import MiniDrawer from '@/components/Drawer';
import { Container } from '@mui/material'
import { useState } from 'react'


export default function Home() {
  const [eventDialogOpen, setEventDialogOpen] = useState(false)
  
  return (
    <main className='min-w-full min-h-screen flex'>
      <KalendEventDialog/>
      <MiniDrawer/>
      <Container maxWidth="xl">
      <section className='w-full h-screen'><Calendar/></section>
      </Container>
    </main>
    
  )
}

{/* <main className='min-w-full min-h-screen'>
      <
    </main> */}