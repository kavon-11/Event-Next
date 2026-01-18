"use client";
import Image from "next/image";
import arrow from '@/public/icons/arrow-down.svg'
export default function  ExploreBtn() {
  return (
    <button type="button" id ='explore-btn' className="mt-7 mx-auto" >
        <a href="#events">Explore Events</a>
        <Image src={arrow} alt = "down arrow" width={24} height={24} className="inline-block ml-2"/>
    </button>
  );
}