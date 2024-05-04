import GitHubCalendar from './GithubCalendar'

export default function GithubActivityBox() {
  return (
    <section className={`card bg-light-blue-pink flex flex-grow items-center justify-center `}>
      <GitHubCalendar className="transform text-white xl:scale-[1.5]" />
    </section>
  )
}
