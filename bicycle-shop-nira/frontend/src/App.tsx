import { sesiones } from './lab/sesiones'
import { Proyecto } from './Proyecto'

export function App() {
  const session = Number(new URLSearchParams(window.location.search).get('sesion'))
  const index = Number.isInteger(session) && session >= 1 && session <= sesiones.length ? session - 1 : 0
  const current = sesiones[index]

  const reference = (
    <figure>
      <img
        src={`${import.meta.env.BASE_URL}referencias/sesion-${index + 1}.svg`}
        alt={current.visual}
        className={index >= 3 ? "h-auto w-full rounded-xl" : current.styles ? "mx-auto h-auto w-full max-w-[568px] rounded-xl" : "mx-auto h-auto w-full max-w-2xl rounded-xl"}
      />
    </figure>
  )

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-8 dark:text-stone-100">
      <header className="mb-8">
        <p className="text-xl font-bold">BikeStore · Tailwind Lab</p>
        <nav aria-label="Guía de sesiones" className="mt-4 flex flex-wrap gap-2">
          {sesiones.map((item, position) => (
            <a key={item.title} href={`?sesion=${position + 1}`}
              aria-current={index === position ? 'page' : undefined}
              className="rounded-full border border-stone-300 px-3 py-2 text-sm underline underline-offset-4 aria-[current=page]:border-emerald-800 aria-[current=page]:bg-emerald-800 aria-[current=page]:text-white">
              Sesión {position + 1}
            </a>
          ))}
        </nav>
      </header>

      <section className="rounded-2xl border border-stone-200 bg-white p-5 sm:p-8 dark:border-stone-700 dark:bg-stone-900">
        <h1 className="text-2xl font-bold sm:text-3xl">{current.title}</h1>
        <p className="mt-2">{current.start}</p>
        <ol className="mt-5 list-decimal space-y-2 pl-5">
          {current.tasks.map(task => <li key={task}>{task}</li>)}
        </ol>
        {current.styles && (
          <div className={index >= 3 ? "mt-6 grid gap-6" : "mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]"}>
            <div>
              <h2 className="mb-2 font-semibold">Resultado esperado</h2>
              {reference}
            </div>
            <div>
              <h2 className="mb-2 font-semibold">Qué aplicar a cada elemento</h2>
              <dl className="divide-y divide-stone-200 rounded-xl border border-stone-200 text-sm dark:divide-stone-700 dark:border-stone-700">
                {current.styles.map(({ label, goal, docs }) => (
                  <div key={label} className="px-3 py-2">
                    <dt className="font-semibold">{label}</dt>
                    <dd>
                      <p>{goal}</p>
                      <ul className="mt-1 flex flex-wrap gap-x-3">
                        {docs.map(([name, path]) => (
                          <li key={path}><a className="text-emerald-800 underline underline-offset-4 dark:text-emerald-300" href={path.startsWith("https://") ? path : `https://tailwindcss.com/docs/${path}`}>{name}</a></li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}
        <p className="mt-5"><strong>Comprueba tu trabajo.</strong> {current.check}</p>
        {current.docs.length > 0 && (
          <>
            <h2 className="mt-5 font-semibold">Documentación oficial de Tailwind CSS</h2>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
              {current.docs.map(([label, path]) => (
                <li key={path}><a className="text-emerald-800 underline underline-offset-4 dark:text-emerald-300" href={path.startsWith("https://") ? path : `https://tailwindcss.com/docs/${path}`}>{label}</a></li>
              ))}
            </ul>
          </>
        )}
      </section>

      {!current.styles && <details open className="mt-8 rounded-2xl border border-stone-200 bg-white p-5 dark:border-stone-700 dark:bg-stone-900">
        <summary className="cursor-pointer font-semibold">Ejemplo visual del resultado esperado</summary>
        <div className="mt-4">{reference}</div>
      </details>}

      <section aria-labelledby="project-title" className="mt-8 rounded-2xl border border-dashed border-stone-400 p-5 sm:p-8">
        <h2 id="project-title" className="mb-4 text-xl font-bold">Tu escaparate</h2>
        <Proyecto />
      </section>
    </main>
  )
}
