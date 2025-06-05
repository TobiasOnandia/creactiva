export const LoadingCanvas = () => {
  return (
     <div className="min-h-screen flex items-center justify-center bg-neutral-900">
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-neutral-400">Cargando sitio...</p>
        </div>
      </div>
  )
}