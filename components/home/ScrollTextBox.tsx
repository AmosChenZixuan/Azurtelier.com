export default function ScrollTextBox() {
  const sm = 'h-[4rem] w-[10rem]'
  const xl = 'xl:h-[8rem] xl:w-[20rem]'

  return (
    <div className={`card bg-pink-blue-animated flex-center  overflow-hidden ${xl} ${sm}`}>
      <h1 className="font-zzz2 text-xl text-white">Coming Soon</h1>
    </div>
  )
}
