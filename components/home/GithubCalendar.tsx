'use client'
import React from 'react'
import GitHubCalendar, { ThemeInput, Activity } from 'react-github-calendar'

const minimalTheme: ThemeInput = {
  light: ['#eee6ff', '#884dff'],
  dark: ['#313244', '#cba6f7'],
}

const DAYS = 98

function selectLastNDays(contributions: Array<Activity>): Array<Activity> {
  return contributions.slice(-DAYS)
}

export default function GithubCalendar({ className = '' }) {
  return (
    <section className={`${className} p-5`}>
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
