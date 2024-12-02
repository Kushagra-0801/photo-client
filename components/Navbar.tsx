'use client';

import React, { useCallback, useState, useRef } from 'react'
import Image from 'next/image'
import { signOut } from 'next-auth/react';

import Logo from '@/public/android-chrome-512x512.png'
import Avatar from '@/public/stock-profile.jpg'
import Container from '@/components/Container'
import UploadPopup from '@/components/UploadPopup';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(cs => !cs), []);
  const modalRef = useRef<HTMLDialogElement | null>(null)
  const openModal = useCallback(() => {
    if (modalRef?.current) {
      modalRef.current.showModal()
    }
  }, [modalRef]);


  const tagMgmtLink = (<a href="#"
    className="inline-block rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
    Tag Management
  </a>
  )
  return (
    <nav className='bg-gray-800 sticky top-0'>
      <Container>
        <div className='flex h-16 items-center justify-between'>
          <div className="flex items-center sm:hidden">
            <button
              type="button" aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen ? "true" : "false"}
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <svg className={!isMobileMenuOpen ? "block size-6" : "hidden size-6"} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <svg className={isMobileMenuOpen ? "block size-6" : "hidden size-6"} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='flex shrink-0 items-center'>
              <Image src={Logo} alt={''} className='h-8 w-auto' />
            </div>
            <div className='hidden sm:ml-6 sm:block'>
              <div className="flex space-x-4">
                <SearchButton />
                <UploadButton onClick={openModal} />
                {tagMgmtLink}
              </div>
            </div>
          </div>
          <div className='ml-3 flex w-fit justify-between gap-4'>
            <Image className='size-8 rounded-full'
              src={Avatar} alt='' />
            <SignoutButton />
          </div>
        </div>
      </Container>
      <div className={isMobileMenuOpen ? "sm:hidden" : "hidden sm:hidden"} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <SearchButton />
          <UploadButton onClick={openModal} />
          {tagMgmtLink}
          <SignoutButton mobile={true} />
        </div>
      </div>
      <UploadPopup ref={modalRef} />
    </nav>
  )
}

function SearchButton() {
  return (
    <button
      type='button' aria-label='search'
      className='flex items-center rounded-md justify-between px-3 py-2 font-medium text-white w-52 bg-gray-700 hover:bg-gray-600'>
      <span className='inline-block text-sm'>Search</span>
      <kbd className='inline-block text-xs'>Ctrl K</kbd>
    </button>
  )
}

function UploadButton({ onClick }: { onClick: React.MouseEventHandler<HTMLButtonElement> }) {
  return (
    <button
      type='button' aria-label='upload' onClick={onClick}
      className='flex items-center rounded-md justify-between px-3 py-2 font-semibold text-white text-sm bg-yellow-700 hover:bg-yellow-600'>
      Upload
    </button>
  )
}

function SignoutButton({ mobile = false }: { mobile?: boolean }) {
  let classes = 'flex items-center rounded-md justify-between px-3 py-2 font-semibold text-white text-sm bg-red-700 hover:bg-red-600'
  if (!mobile) {
    classes += ' hidden sm:block'
  }
  return (
    <button
      type='button' aria-label='signOut'
      className={classes}
      onClick={() => signOut()}>
      Sign Out
    </button>
  )
}
