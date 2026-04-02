import Link from "next/link";

const NotFoundPage = () => {
    return (
        <div className="flex flex-col bg-white justify-start h-[350] m-5 rounded-l">
            <div className="flex flex-col items-center p-12 gap-8">
                <h1 className="text-[48px]">404 - PAGE NOT FOUND</h1>
                <div className="flex flex-col items-center">
                    <p className="pb-3 text-[14px]">La pagina que has solicitado no existe</p>
                    <Link href="/" className="underline text-[14px]">Haz click aqui para volver al inicio</Link>            
                </div>

            </div>    
        </div>

    )
}

export default NotFoundPage;
