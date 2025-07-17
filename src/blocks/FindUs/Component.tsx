"use client";

import dynamic from "next/dynamic";
import React from "react";

const Map = dynamic(() => import("@/blocks/FindUs/Map"), { ssr: false }); // You can rename this

type Props = {
  heading: string;
  description: string;
  transports: {
    title: string;
    lines: { line: string }[];
  }[];
  lat: number;
  lng: number;
  secondIconUrl?: string;
  thirdIconUrl?: string;
};

export default function FindUsBlock({
  heading,
  description,
  transports,
  lat,
  lng,
  secondIconUrl,
  thirdIconUrl,
}: Props) {
  return (
    <>
      <div className="">
        <Map
          lat={lat}
          lng={lng}
          secondIconUrl={secondIconUrl}
          thirdIconUrl={thirdIconUrl}
        />
      </div>
      <div className="w-full grid grid-cols-12 border-t border-border">
        <div className="col-span-12 lg:col-span-4 p-8 border-b lg:border-b-0 lg:border-r border-border">
          <h2 className="text-2xl font-bold mb-4">{heading}</h2>
          <p>{description}</p>
        </div>

        <div className="col-span-12 lg:col-span-8 p-8 grid grid-cols-2 gap-4">
          {transports.map((transport, i) => (
            <div key={i} className="border rounded-lg p-4 flex flex-col">
              <h2 className="text-xl font-bold mb-1">{transport.title}</h2>
              {transport.lines.map((l, j) => (
                <span key={j}>{l.line}</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
