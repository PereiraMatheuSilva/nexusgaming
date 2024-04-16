import { Container } from '@/components/container';
import { GameProps } from '@/utils/types/game';
import Image from 'next/image';
import Link from 'next/link';

import { BsArrowRightCircle } from 'react-icons/bs';
import { Input } from '@/components/input';
import { GameCard } from '@/components/GameCard';


async function getNexusGaming() {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      {next:{ revalidate: 320 }}
    )
    return res.json();

  } catch (error) {
    throw new Error(`Failed to fetch data`)
  }
}

async function  getNexusData() {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=games`,{next: {revalidate: 320}})
    return res.json();
  } catch (error) {
    throw new Error(`Failed to fetch data`)
  }
}


export default async function Home(){
  const nexusGaming: GameProps = await getNexusGaming();
  const data: GameProps[] = await getNexusData();

  return (
    <main className="w-full">
      <Container>
        <h1 className='text-center font-bold mt-8 mb-5'>
          Separamos um Jogo Exclusivo para você!
        </h1>

        <Link href={`/game/${nexusGaming.id}`}>
          <section className='w-full bg-black rounded-lg '>
            <div className='w-full max-h-96 h-96 relative rounded-lg '>

              <div className='absolute z-20 bottom-0 p-3 flex justify-center items-center
              gap-2'>
                <p className='font-bold text-xl text-white'>{nexusGaming.title}</p>
                <BsArrowRightCircle size={24} color='#fff' />
              </div>

              <Image 
                src={nexusGaming.image_url}
                alt={nexusGaming.title}
                priority={true}
                quality={100}
                fill={true}
                className='max-h-96 object-cover rounded-lg opacity-50 hover:opacity-100
                transition-all duration-300
                '
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 33vw'
              />
            </div>
          </section>
        </Link>

        <Input />

        <h2 className='text-lg font-bold mt-8 mb-5'>
          Jogos para conhecer
        </h2>

        <section className='
          grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        '>
          {data.map((item)=>(
            <GameCard key={item.id} data={item} />
          ))}
        </section>


      </Container>
    </main>
  )
}