'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'

interface NavlinkProps {
  href: string
  children: React.ReactNode
  onClick?: () => void
}

export function Navlink({href, onClick, children }: NavlinkProps) {
  const activeHref = usePathname()
  return (
    <Link
      onClick={onClick}
      data-active={activeHref === href}
      className='px-4 py-2 rounded-md hover:bg-cyan-200 dark:hover:bg-cyan-700 transition duration-300 ease-in-out data-[active=true]:bg-cyan-400' 
      href={href}>
      {children}
    </Link>
  )
}
