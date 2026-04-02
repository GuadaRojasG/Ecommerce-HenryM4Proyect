import Link from "next/link";

const HomeView = () => {
  return (
    <div>
      <div className="m-5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <Link href={'/product/11'}><img src={'/home.png'} alt='Home' className="rounded"></img></Link>
      </div>

      <div className='flex flex-col min-h-[350px] m-5 bg-white rounded-l justify-center px-6 sm:px-12 md:px-20 lg:px-32 xl:px-100'>
        <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] leading-tight sm:leading-snug md:leading-12 lg:leading-15 pb-4">herramientas multidimensionales para la expresión cotidiana</h2>
        <p className="text-[13px] sm:text-[14px] md:text-[15px]">soñadas y perfeccionadas por Ariana Grande, r.e.m. beauty te brinda herramientas para expresarte, acentuar y añadir un toque de magia a cada día — para soñar con los ojos bien abiertos. conoce el maquillaje del mañana: tonos futuristas, productos multifunción, híbridos con ingredientes de cuidado de la piel, aplicaciones innovadoras y fórmulas hipersensoriales. vegano y libre de crueldad animal, siempre.</p>
        <Link href={'/products'} className="flex justify-center bg-black text-white font-bold py-2 rounded-full mt-4 transition-colors hover:bg-white border-black border hover:text-black">VER PRODUCTOS</Link>
      </div>  

      <div className='flex flex-col rounded md:flex-row h-auto md:h-[700px] m-5 bg-white rounded-l'>
        <div className='w-full md:w-1/2'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={'/founder.webp'} alt='Ariana Grande' className='w-full h-125 md:h-full object-cover object-top'></img>
        </div>      
        <div className='w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-10 md:px-16 pb-10 md:pb-16 pt-10 md:pt-[290px]'>
          <h2 className="mb-6 text-[18px] sm:text-[20px]">la vision de nuestra fundadora</h2>
          <p className="text-[14px] sm:text-[15px]">“significa muchísimo para mí poder crear una línea de productos para absolutamente todas las personas que quieran usarla y sentirse increíbles. el maquillaje es algo muy personal y tener la oportunidad de ayudar a la gente a sentirse aún más hermosa de lo que ya es en su propia piel, y también simplemente ofrecer herramientas que apoyen y fomenten la creatividad y la autoexpresión de las personas, es un regalo que nunca daré por sentado.”</p>
        </div>
      </div>  
    </div>

  );
};

export default HomeView;
