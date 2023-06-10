import Head from 'next/head';
import 'app/globals.css';
import { Menu } from '@/componentes/Menu';
import style from './Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Home() {
  return (
  <div >
    <Head>
      <title>Loja Next</title>
    </Head>
    <Menu />
    <div  className="container">
      <main className={style.main} >
        <h1 className="title" >Página Inicial</h1>
      </main>

    </div>
  </div>
  )
}

