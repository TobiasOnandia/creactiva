export const BackgroundCanvas = () => (
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(114,186,232,0.03)_0%,_transparent_70%)]">
    <div
      className="absolute inset-0 opacity-20 [mask-image:linear-gradient(0deg,rgba(0,0,0,0.1),rgba(0,0,0,0.1))]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }}
    />
  </div>
);
