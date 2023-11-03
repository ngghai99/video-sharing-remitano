import Image from 'next/image'
import 'bootstrap/dist/css/bootstrap.css'
import styles from './page.module.css'
import { Nav, VideoList } from '@/components'

export default function Home() {
  return (
    <>
      <Nav />
      <VideoList />
    </>
  )
}
