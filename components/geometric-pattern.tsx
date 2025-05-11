export function GeometricPattern() {
  return (
    <div 
      className="fixed inset-0 w-full h-full opacity-20 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L100 25L100 75L50 100L0 75L0 25L50 0Z' fill='%23ffffff' fill-opacity='0.4'/%3E%3Cpath d='M50 10L90 30L90 70L50 90L10 70L10 30L50 10Z' fill='%230066FF' fill-opacity='0.4'/%3E%3Cpath d='M50 20L80 35L80 65L50 80L20 65L20 35L50 20Z' fill='%23ffffff' fill-opacity='0.4'/%3E%3C/svg%3E")`,
        backgroundSize: '100px 100px'
      }}
    />
  )
}
