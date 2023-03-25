const AppLogo = () => {
  return (
    <>
      <img src={`${import.meta.env.BASE_URL}/vite.svg`} className="w-10 h-10" alt="Vite logo" />
      <div className="text-3xl font-bold">
        Health App
      </div>
    </>
  )
}

export default AppLogo
