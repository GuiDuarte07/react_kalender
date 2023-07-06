"use client"
import { Calendar } from '@/components/Calendar'
import MiniDrawer from '@/components/Drawer';
import { Container } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer';


export default function Home() {
  return (
    <main className='min-w-full min-h-screen flex'>
      <Container>
      <MiniDrawer/>
      </Container>
      <Container maxWidth="xl">
      <section className='w-full h-[500px]'><Calendar/></section>
      </Container>
    </main>
    
  )
}

{/* <main className='min-w-full min-h-screen'>
      <
    </main> */}