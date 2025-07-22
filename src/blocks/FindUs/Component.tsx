"use client";

import dynamic from "next/dynamic";
import React from "react";

const Map = dynamic(() => import("@/blocks/FindUs/Map"), { ssr: false });

type TransportType = "u-bahn" | "s-bahn" | "tram" | "bus" | "other";

type Props = {
  heading: string;
  description: string;
  transports: {
    title: string;
    type: TransportType;
    lines: { line: string }[];
  }[];
  lat: number;
  lng: number;
  secondIconUrl?: string;
  thirdIconUrl?: string;
  fourthIconUrl?: string;
  fifthIconUrl?: string;
  sixthIconUrl?: string;
  seventhIconUrl?: string;
};

export default function FindUsBlock({
  heading,
  description,
  transports,
  lat,
  lng,
  secondIconUrl,
  thirdIconUrl,
  fourthIconUrl,
  fifthIconUrl,
  sixthIconUrl,
  seventhIconUrl,
}: Props) {
  const getIconForType = (type: TransportType) => {
    switch (type) {
      case "s-bahn":
        return secondIconUrl || "/media/S-Bahn-Logo.svg.webp";
      case "u-bahn":
        return thirdIconUrl || "/media/U-Bahn.svg";
      case "tram":
        return fifthIconUrl || "/media/Tram-Logo.svg";
      case "bus":
        return sixthIconUrl || "/media/Bus-Logo.svg";
      default:
        return fourthIconUrl || "/media/spp_logo.png";
    }
  };

  return (
    <>
      <div>
        <Map
          lat={lat}
          lng={lng}
          secondIconUrl={secondIconUrl}
          thirdIconUrl={thirdIconUrl}
          fourthIconUrl={fourthIconUrl}
          fifthIconUrl={fifthIconUrl}
          sixthIconUrl={sixthIconUrl}
          seventhIconUrl={seventhIconUrl}
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
              <div className="flex items-center mb-1 gap-2">
                <img
                  src={getIconForType(transport.type)}
                  alt={transport.type}
                  className="w-6 h-6"
                />
                <h2 className="text-xl font-bold">{transport.title}</h2>
              </div>
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
