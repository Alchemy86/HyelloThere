'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'


interface SidebarLink {
  label: string;
  route: string;
  imgUrl: string;
}

const Sidebar = ({ sidebarLinks }: { sidebarLinks: SidebarLink[] }) => {
  const pathName = usePathname();
  return (
    <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>

      <div className='flex flex-1 flex-col gap-6'>
        {sidebarLinks.map((link) => {
          const isActive = pathName === link.route || 
            pathName?.startsWith(`${link.route}/`);

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn('flex gap-4 items-center p-4 rounded-lg justify-start', {
                'bg-blue-1': isActive // Blue 1 style if is active link
              })}
            >
              <Image 
                src={link.imgUrl}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className='font-semibold'>{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};


export default Sidebar