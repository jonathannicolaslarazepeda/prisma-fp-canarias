const aljibeImage = new URL('./features/bicycles/images/aljibe.jpg', import.meta.url).href
const calderaImage = new URL('./features/bicycles/images/caldera.jpg', import.meta.url).href
const pinarImage = new URL('./features/bicycles/images/pinar.jpg', import.meta.url).href

export function Proyecto() {
  return (
<> 
  <header className="bg-emerald-800 p-6 rounded-xl">
    <h3 className="text-white text-xl font-bold">BikeStore</h3>
  </header>

    <ul className="mt-6 grid grid-cols-2 gap-4">
      <li>
        <article className="h-full bg-white rounded-xl border-x1 border-stone-200 shadow-sm overflow-hidden">
          <img src={aljibeImage} alt="Bicicleta urbana verde con guardabarros y portaequipajes" className="w-full aspect-3/2" />
          <div className="p-4">  
            <p className="text-sm font-semibold text-emerald-800">Urbana</p>
            <h3 className="text-xl font-bold text-gray-800 mt-1">Aljibe City</h3>
            <p className="mt-2 text-stone-600 text-sm">Postura cómoda y guardabarros para tus desplazamientos diarios.</p>
            <p className="mt-4 font-semibold text-stone-800 text-base">549 €</p>
          </div>
        </article>
      </li>
      <li>
        <article className="h-full bg-white rounded-xl border-x1 border-stone-200 shadow-sm overflow-hidden">
          <img src={calderaImage} alt="Bicicleta naranja con manillar curvo" className="w-full aspect-3/2" />
          <div className="p-4">  
            <p className="text-sm font-semibold text-emerald-800">Gravel</p>
            <h3 className="text-xl font-bold text-gray-800 mt-1">Caldera Gravel</h3>
            <p className="mt-2 text-stone-600 text-sm">Cubiertas mixtas para alternar asfalto y pistas de tierra.</p>
            <p className="mt-4 font-semibold text-stone-800 text-base">989 €</p>
          </div>
        </article>
      </li>
      <li>
        <article className="h-full bg-white rounded-xl border-x1 border-stone-200 shadow-sm overflow-hidden">
          <img src={pinarImage} alt="Bicicleta de montaña con suspensión delantera" className="w-full aspect-3/2" />
          <div className="p-4">  
            <p className="text-sm font-semibold text-emerald-800">Montaña</p>
            <h3 className="text-xl font-bold text-gray-800 mt-1">Pinar Trail</h3>
            <p className="mt-2 text-stone-600 text-sm">Suspensión delantera para rutas con terreno irregular.</p>
            <p className="mt-4 font-semibold text-stone-800 text-base">749 €</p>
          </div>
        </article>
      </li>
    </ul>

  </>
   


  )
}
