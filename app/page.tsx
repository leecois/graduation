'use client'

import cn from 'clsx'
import { useRef, useState } from 'react'
import { CountdownBanner } from '~/components/countdown-banner'
import {
  ArrowRightIcon,
  type ArrowRightIconHandle,
} from '~/components/icon/arrow-right'
import { Image } from '~/components/image'
import RotateRevealText from '~/components/rotate-reveal-text'
import { Wrapper } from '~/components/wrapper'
import { useRotateReveal } from '~/hooks/use-rotate-reveal'

const CONTACT_LINKS = [
  {
    label: 'Directions to School',
    href: 'https://maps.app.goo.gl/',
    ariaLabel: 'Open Google Maps directions to the ceremony',
    borderSecondary: false,
    isExternal: true,
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/',
    ariaLabel: 'Open Facebook in a new tab',
    borderSecondary: true,
    isExternal: true,
  },
  {
    label: '+84 (00) 000 0000',
    href: '#',
    ariaLabel: 'Call',
    borderSecondary: true,
    isExternal: false,
  },
] as const

const TARGET_DATE = new Date('2026-11-21T09:00:00+07:00')

export default function Home() {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false)
  const sectionRef = useRef<HTMLElement | null>(null)
  const countdownSectionRef = useRef<HTMLElement | null>(null)
  const iconRefs = useRef<(ArrowRightIconHandle | null)[]>([])

  const handlePreloaderComplete = () => {
    setIsPreloaderComplete(true)
  }

  useRotateReveal({
    isActive: isPreloaderComplete,
    rootRef: sectionRef,
    selector: '[data-rotate-reveal]',
    duration: 2,
    delay: 0.8,
    initialRotate: 60,
    initialOpacity: 0,
    transformOrigin: 'bottom left',
    ease: 'power3.out',
    stagger: 0.1,
    perspective: 2000,
  })

  useRotateReveal({
    isActive: isPreloaderComplete,
    rootRef: countdownSectionRef,
    selector: '[data-rotate-reveal]',
    duration: 2,
    delay: 1.2,
    initialRotate: 60,
    initialOpacity: 0,
    transformOrigin: 'bottom left',
    ease: 'power3.out',
    stagger: 0.1,
    perspective: 2000,
  })

  return (
    <Wrapper
      theme="light"
      className="px-safe overflow-x-clip z-10"
      onPreloaderComplete={handlePreloaderComplete}
    >
      <section ref={sectionRef} className="relative coi-grid!">
        <h1 className="col-span-full coi-pt-20 bg-secondary coi-pl-4 dt:coi-pl-10 uppercase home-title text-primary relative z-10 overflow-hidden">
          <RotateRevealText>Final Chapter!</RotateRevealText>
        </h1>
        <div className="col-span-full coi-py-10 dt:coi-py-10 bg-contrast  border-solid coi-border-t-px coi-border-b-px border-secondary [border-top-style:solid] [border-bottom-style:solid] relative overflow-hidden">
          <CountdownBanner
            targetDate={TARGET_DATE}
            isActive={isPreloaderComplete}
          />
        </div>

        <div className="relative mobile-only col-span-full coi-mt-24">
          <h1 className="uppercase h2 font-chalmers">
            <RotateRevealText>Graduation</RotateRevealText>
          </h1>
          <div className="-z-1 absolute top-0 left-0 w-full h-full">
            <div className="dt:coi-w-480 coi-w-342 coi-h-px bg-contrast/20 dt:coi-mt-40 coi-mt-50 relative" />
          </div>
        </div>

        <div className="col-span-full dt:col-start-1 dt:col-span-3 coi-mt-30 dt:coi-border-r-px dt:border-secondary dt:[border-right-style:solid] order-2 dt:order-0">
          <div className="relative desktop-only">
            <h1 className="uppercase h2 coi-mb-24 font-chalmers">
              <RotateRevealText>Graduation</RotateRevealText>
            </h1>
            <div className="-z-1 absolute top-0 left-0 w-full h-full">
              <div className="dt:coi-w-480 coi-w-342 coi-h-px bg-contrast/20 dt:coi-mt-40 coi-mt-50 relative" />
            </div>
          </div>
          <div>
            <Image
              src="/SE170317-2.png"
              alt="Graduation Left"
              className="border-solid coi-border-px border-secondary"
              aspectRatio={53 / 68}
              mobileSize="130vw"
              priority
              desktopSize="33vw"
            />
          </div>
          <p className="cta font-chalmers uppercase coi-mt-30 flex items-center gap-10">
            <RotateRevealText>✦✦✦ Find me here</RotateRevealText>
          </p>
          <div className="flex flex-col dt:coi-gap-30 coi-gap-15 coi-mt-32 uppercase">
            {CONTACT_LINKS.map(
              (
                { label, href, ariaLabel, borderSecondary, isExternal },
                index
              ) => (
                <RotateRevealText
                  key={label}
                  as="a"
                  href={href}
                  aria-label={ariaLabel}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className={cn(
                    'contact coi-border-b-px [border-bottom-style:solid] flex items-center justify-between gap-16 group',
                    borderSecondary ? 'border-secondary' : undefined
                  )}
                  onMouseEnter={() => iconRefs.current[index]?.startAnimation()}
                  onMouseLeave={() => iconRefs.current[index]?.stopAnimation()}
                  onFocus={() => iconRefs.current[index]?.startAnimation()}
                  onBlur={() => iconRefs.current[index]?.stopAnimation()}
                >
                  <span>{label}</span>
                  <ArrowRightIcon
                    ref={(handle) => {
                      iconRefs.current[index] = handle
                    }}
                    aria-hidden="true"
                    className="shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1"
                  />
                </RotateRevealText>
              )
            )}
          </div>
        </div>
        <div className="col-span-full dt:coi-ml-20 coi-ml-0 dt:col-start-4 dt:col-span-5 coi-mt-30 order-1 dt:order-0">
          <div>
            <Image
              src="/SE170317-1.png"
              alt="Graduation Left"
              className="w-full border-solid coi-border-px border-secondary"
              aspectRatio={47 / 32}
              priority
              mobileSize="130vw"
              desktopSize="120vw"
            />
          </div>
          <div className="relative">
            <RotateRevealText
              as="h2"
              className="text-secondary coi-pt-30 dt:coi-pt-50 uppercase h1"
            >
              Friday, Nov 21, 2025
            </RotateRevealText>
            <RotateRevealText
              as="h2"
              className="text-secondary coi-pt-30 dt:coi-pt-45 uppercase h1"
            >
              From{' '}
              <span className="bg-contrast text-primary coi-px-12 coi-rounded-10">
                9:00 - 10:30
              </span>
            </RotateRevealText>
            <RotateRevealText
              as="h2"
              className="text-secondary coi-pt-30 dt:coi-pt-45 uppercase h1"
            >
              Or{' '}
              <span className="bg-contrast text-primary coi-px-12 coi-rounded-10">
                13:30 - 15:00
              </span>
            </RotateRevealText>
            <RotateRevealText
              as="h2"
              className="text-secondary coi-pt-30 dt:coi-pt-45 uppercase h1 -coi-tracking-px"
            >
              At Your University
            </RotateRevealText>
            <div className="-z-1 absolute top-0 left-0 w-full h-full">
              <div className="w-full coi-h-px bg-contrast/20 coi-mt-70 dt:coi-mt-105 relative" />
              <div className="w-full coi-h-px bg-contrast/20 coi-mt-74 dt:coi-mt-120 relative" />
              <div className="w-full coi-h-px bg-contrast/20 coi-mt-76 dt:coi-mt-120 relative" />
              <div className="w-full coi-h-px bg-contrast/20 coi-mt-76 dt:coi-mt-120 relative" />
            </div>
            <h1 className="col-start-1 col-span-4 dt:col-start-1 dt:col-span-6 coi-pt-10 dt:coi-pt-50 coi-mt-30 bg-secondary uppercase coi-text-60 dt:coi-text-160 home-title text-primary relative order-3 dt:order-0 mobile-only">
              <RotateRevealText>Your Name</RotateRevealText>
            </h1>
          </div>
        </div>
        <h1 className="col-start-1 col-span-4 dt:col-start-1 dt:col-span-6 coi-pt-10 dt:coi-pt-50 coi-mt-30 bg-secondary uppercase coi-text-53 dt:coi-text-182 home-title text-primary relative order-3 dt:order-0 coi-pl-6 desktop-only">
          <RotateRevealText>Your Name</RotateRevealText>
        </h1>
        <div className="col-span-full dt:col-start-7 dt:col-span-2 coi-mt-20 order-3 dt:order-0 coi-ml-21 dt:coi-ml-0">
          <Image
            src="/stamp.png"
            alt="Graduation Left"
            aspectRatio={5 / 4}
            mobileSize="100vw"
            desktopSize="33vw"
          />
        </div>
      </section>
    </Wrapper>
  )
}
