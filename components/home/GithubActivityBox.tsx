import GitHubCalendar from './GithubCalendar'

export default function GithubActivityBox() {
  return (
    <section className="card bg-light-blue-pink flex h-[12rem] w-[20rem] items-center justify-center overflow-hidden p-10">
      <GitHubCalendar className="text-white" />
    </section>
  )
}
