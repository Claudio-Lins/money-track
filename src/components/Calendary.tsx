'use client'

import React, { useState, useEffect } from 'react'

export function Calendary() {
  const [month, setMonth] = useState(new Date())
  const [day, setDay] = useState(new Date())
  const [seg, setSeg] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setMonth(date)
      setDay(date)
      setSeg(date)
    }, 1000 * 60 * 60 * 10);
    return () => clearInterval(timer);
  }, []);

  
  return (
    <div className='bg-white/20 text-zinc-600 rounded-md flex flex-col justify-center items-center w-12 border h-14'>
      <strong className='border-b uppercase'>{month.toLocaleString('default', { month: 'short' })}</strong>
      <span>{day.toLocaleString('default', { day: '2-digit' })}</span>
    </div>
  )
}
