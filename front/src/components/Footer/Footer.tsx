const Footer = () => {
    return (
    <footer>

      <div className="flex justify-evenly my-10">
        <div>
          <h4 className="font-medium text-xl mb-4">TIENDA</h4>
          <ul className="space-y-2">
            <li>MAS VENDIDOS</li>
            <li>MAQUILLAJE</li>
            <li>SKINCARE</li>
            <li>SETS</li>
          </ul>
        </div>

        <div className="mx-20 md:mx-30 lg:mx-50">
          <h4 className="font-medium text-xl mb-4">NAVEGACION</h4>
          <ul className="space-y-2">
            <li>NUESTRA VISION</li>
            <li>FAQS</li>
            <li>DEVOLUCIONES</li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-xl mb-4">SOCIAL</h4>
          <ul className="space-y-2">
            <li>INSTAGRAM</li>
            <li>X</li>
            <li>FACEBOOK</li>
            <li>TIKTOK</li>
            <li>YOUTUBE</li>
          </ul>
        </div>
      </div>

      <hr className="border-t border-gray-400 my-8" />

      <nav>
        <ul className="flex justify-evenly my-10">
          <li>SOPORTE</li>
          <li>CONTACTO</li>
          <li>LEGAL</li>
          <li>PRIVACIDAD</li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer