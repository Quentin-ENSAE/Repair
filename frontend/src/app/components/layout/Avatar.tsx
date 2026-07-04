export function Avatar({ pseudonyme, size = 48 }: { pseudonyme: string; size?: number }) {
  return (
    <div
      className="rounded-full bg-primary text-primary-foreground flex items-center justify-center font-black shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {pseudonyme.charAt(0).toUpperCase()}
    </div>
  );
}
