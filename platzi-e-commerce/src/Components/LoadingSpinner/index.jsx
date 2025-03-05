'use client'

import React, { useState, useEffect } from 'react'

const LoadingSpinner = ({
  size = 'medium',
  color = 'blue',
  showText = true,
  text = 'Loading',
  variant = 'pulse'
}) => {
  const [dots, setDots] = useState('.')

  // Animated dots for the loading text
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '.' : prev + '.')
    }, 400)

    return () => clearInterval(interval)
  }, [])

  // Size classes
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-16 w-16',
    large: 'h-24 w-24'
  }

  // Color classes
  const colorClasses = {
    blue: 'border-blue-500 from-blue-400 to-blue-600',
    purple: 'border-purple-500 from-purple-400 to-purple-600',
    green: 'border-green-500 from-green-400 to-green-600',
    red: 'border-red-500 from-red-400 to-red-600',
    amber: 'border-amber-500 from-amber-400 to-amber-600',
    teal: 'border-teal-500 from-teal-400 to-teal-600'
  }

  // Spinner variants
  const renderSpinner = () => {
    switch (variant) {
      case 'pulse':
        return (
          <div className={`relative ${sizeClasses[size]}`}>
            <div className={`absolute inset-0 rounded-full border-4 border-t-transparent animate-spin ${colorClasses[color]}`} />
            <div className={`absolute inset-0 rounded-full border-4 border-opacity-30 ${colorClasses[color]} animate-pulse`} />
          </div>
        )
      case 'ripple':
        return (
          <div className={`relative ${sizeClasses[size]}`}>
            <div className={`absolute inset-0 rounded-full border-4 border-t-transparent animate-spin ${colorClasses[color]}`} />
            <div className='absolute inset-0 flex justify-center items-center'>
              <div className={`h-2/3 w-2/3 rounded-full bg-gradient-to-br ${colorClasses[color]} opacity-70 animate-ping`} />
            </div>
          </div>
        )
      case 'dots':
        return (
          <div className='flex space-x-2'>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`rounded-full ${sizeClasses.small} bg-gradient-to-br ${colorClasses[color]}`}
                style={{
                  animation: 'bounce 1.4s infinite ease-in-out both',
                  animationDelay: `${i * 0.16}s`
                }}
              />
            ))}
          </div>
        )
      default:
        return (
          <div className={`rounded-full border-4 border-t-transparent animate-spin ${sizeClasses[size]} ${colorClasses[color]}`} />
        )
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className='flex flex-col items-center'>
        {renderSpinner()}
        {showText && (
          <div className='mt-4 text-center'>
            <span className={`text-${color}-600 font-medium text-lg`}>
              {text}{dots}
            </span>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0);
          } 
          40% { 
            transform: scale(1.0);
          }
        }
      `}
      </style>
    </div>
  )
}

export default LoadingSpinner
