'use client'
import React, { useCallback, useEffect, useState } from 'react'
import ActivityCalendar, { ThemeInput, Activity } from 'react-activity-calendar'
import Spinner from '@/components/Spinner'

const minimalTheme: ThemeInput = {
  light: ['#eee6ff', '#884dff'],
  dark: ['#313244', '#cba6f7'],
}

const DAYS = 98
const USERNAME = 'amoschenzixuan'

function selectLastNDays(contributions: Array<Activity>): Array<Activity> {
  return contributions.slice(-DAYS)
}

export default function GithubCalendar({ className = '' }) {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(() => {
    setLoading(true)
    setError(null)
    fetchCalendarData(USERNAME)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  useEffect(fetchData, [fetchData])

  if (error) {
    return <h1 className="w-48 text-center">❌{error.message}</h1>
  }

  if (loading || !data) {
    return <Spinner />
  }

  return (
    <section className={`${className} p-5`}>
      <ActivityCalendar
        data={selectLastNDays(data.contributions)}
        hideColorLegend={true}
        hideMonthLabels={false}
        hideTotalCount={true}
        blockRadius={5}
        theme={minimalTheme}
      />
    </section>
  )
}

interface ApiResponse {
  total: {
    [year: number]: number
    [year: string]: number
  }
  contributions: Array<Activity>
}

interface ApiErrorResponse {
  error: string
}

async function fetchCalendarData(username: string): Promise<ApiResponse> {
  const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
  const data: ApiResponse | ApiErrorResponse = await response.json()

  if (!response.ok) {
    throw Error(`Error fetching GitHub activity: ${(data as ApiErrorResponse).error}`)
  }

  return data as ApiResponse
}
