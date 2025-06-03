import React from 'react'

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="w-10 h-10 border-4 border-peach border-t-soft-yellow rounded-full animate-spin"></div>
    </div>
  )
}