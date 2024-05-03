'use client'
import React from 'react'
import GitHubCalendar, { ThemeInput, Activity } from 'react-github-calendar'

const minimalTheme: ThemeInput = {
  light: ['#eee6ff', '#884dff'],
  dark: ['#313244', '#cba6f7'],
}

const DAYS = 90

function selectLastNDays(contributions: Array<Activity>): Array<Activity> {
  const today = new Date()
  const startDate = new Date(today)
  startDate.setDate(today.getDate() - DAYS)

  return contributions.filter((activity) => {
    const activityDate = new Date(activity.date)
    return activityDate >= startDate && activityDate <= today
  })
}

export default function GithubCalendar({ className = '' }) {
  return (
    <section className={`${className} dark scale-[1.2] transform overflow-hidden`}>
      <GitHubCalendar
        username="amoschenzixuan"
        transformData={selectLastNDays}
        hideColorLegend={true}
        hideMonthLabels={false}
        hideTotalCount={true}
        blockRadius={5}
        theme={minimalTheme}
      />
    </section>
  )
}
