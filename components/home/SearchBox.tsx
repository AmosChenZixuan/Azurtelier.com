import SearchButton from '../SearchButton'

export default function SearchBox() {
  return (
    <div className="card bg-pink-blue relative flex h-[4rem] w-[4rem] items-center justify-center">
      <div className="absolute m-auto scale-[1.7] transform">
        <SearchButton />
      </div>
    </div>
  )
}
