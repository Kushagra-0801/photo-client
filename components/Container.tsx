import React from "react";

export default function Container({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto max-w-6xl px-2 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}
