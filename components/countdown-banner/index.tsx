'use client'

import { useEffect, useState } from 'react'
import RotateRevealText from '~/components/rotate-reveal-text'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownBannerProps {
  targetDate: Date
  isActive?: boolean
}

export function CountdownBanner({
  targetDate,
  isActive = true,
}: CountdownBannerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    if (!isActive) return

    const calculateTimeLeft = () => {
      const now = Date.now()
      const target = targetDate.getTime()
      const difference = target - now

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      )
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      return { days, hours, minutes, seconds }
    }

    setTimeLeft(calculateTimeLeft())

    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate, isActive])

  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0')
  }

  return (
    <div className="coi-layout-grid">
      <div className="col-start-1 flex flex-col coi-gap-10">
        <RotateRevealText as="div" className="text-primary uppercase time">
          {formatNumber(timeLeft.days)}
          <span className="text-primary/40">Ngày</span>
        </RotateRevealText>
      </div>

      <div className="dt:col-start-3 col-start-2 dt:items-end flex flex-col coi-gap-10">
        <RotateRevealText as="div" className="text-primary uppercase time">
          {formatNumber(timeLeft.hours)}
          <span className="text-primary/40">Tiếng</span>
        </RotateRevealText>
      </div>

      <div className="col-start-3 dt:col-start-6 flex flex-col coi-gap-10 items-center">
        <RotateRevealText as="div" className="text-primary uppercase time">
          {formatNumber(timeLeft.minutes)}
          <span className="text-primary/40">Phút</span>
        </RotateRevealText>
      </div>

      <div className="col-start-4 dt:col-start-8 dt:justify-self-end justify-self-end coi-gap-10">
        <RotateRevealText as="div" className="text-primary uppercase time">
          {formatNumber(timeLeft.seconds)}
          <span className="text-primary/40">Giây</span>
        </RotateRevealText>
      </div>
    </div>
  )
}
