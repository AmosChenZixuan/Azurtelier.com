import GitHubCalendar from './GithubCalendar'

export default function GithubActivityBox() {
  const xl = 'xl:scale-[1.5]'

  return (
    <section className="card bg-light-blue-pink flex flex-grow items-center justify-center overflow-hidden">
      <GitHubCalendar className={`scale-[1.2] transform text-white ${xl}`} />
    </section>
  )
}
