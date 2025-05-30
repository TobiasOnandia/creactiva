export const  BackgroundForm = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/3 -right-1/4 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,_rgba(114,186,232,0.03)_0%,_transparent_70%)]" />
        <div 
          className="absolute inset-0 opacity-10 [mask-image:linear-gradient(0deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1))]"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-cyan-500/10 blur-[80px]" />
        <div className="absolute top-10 right-10 w-48 h-48 rounded-full bg-purple-500/10 blur-[80px]" />
      </div>
    )
}