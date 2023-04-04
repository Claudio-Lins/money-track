"use client"
import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  cor?: 'primary' | 'secondary' | 'tertiary' | 'green'
  onClick?: () => void
  type: 'button' | 'submit' | 'reset'
  icon?: boolean
  disabled?: boolean
  className?: string
}

export function Button({ children, cor, onClick, type, icon, className, disabled, ...rest   }: ButtonProps) {
  const color = cor ?? 'gray'
  return (
    <button
      type={type}
      onClick={onClick}
      {...rest}
      className={`
      flex items-center justify-center gap-2 rounded-md bg-gradient-to-r px-4 py-2
      font-bold text-white shadow-md hover:shadow-none hover:saturate-150 w-full
      ${cor === 'primary' && 'from-gray-400 to-gray-600'}
      ${cor === 'secondary' && 'from-blue-400 to-blue-600'}
      ${cor === 'tertiary' && 'from-red-400 to-red-600'}
      ${cor === 'green' && 'from-green-400 to-green-800'}
      ${className}
      `}
    >
      {icon && <span>{children}</span>}
      {children}
      {icon && <span>{children}</span>}
    </button>
  )
}
