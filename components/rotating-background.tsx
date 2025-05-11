'use client'

import React from 'react'

const COLORS = ['#1E3A8A', '#1E40AF', '#1E3A8A', '#1E40AF', '#1E3A8A']

export function RotatingBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="w-full h-full bg-blue-900 relative overflow-hidden">
        {COLORS.map((color, index) => (
          <div
            key={index}
            className="absolute inset-0 transform rotate-45"
            style={{
              backgroundColor: color,
              opacity: 0.1,
              left: `${index * 20}%`,
              top: `${index * 20}%`,
              width: '200%',
              height: '200%',
            }}
          />
        ))}
        <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")", backgroundSize: '60px 60px' }}
        />
      </div>
    </div>
  )
}
