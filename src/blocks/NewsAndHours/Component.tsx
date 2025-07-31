"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/utilities/cn";
import { useTranslations } from "next-intl";
import Time from "@/components/Time";
import RichText from "@/components/RichText";
function parseTime(str: string): Date {
  const [hours, minutes] = str.split(":").map(Number);
  const now = new Date();
  now.setHours(hours);
  now.setMinutes(minutes);
  now.setSeconds(0);
  return now;
}

function isTimeInRange(range: string, now: Date): boolean {
  if (!range || range.toLowerCase() === "closed") return false;
  const [start, end] = range.split(" - ").map(parseTime);
  return now >= start && now <= end;
}

type Hour = {
  dayKey: string;
  morning?: string;
  afternoon?: string;
};

type NewsItem = {
  title: string;
  summary?: any; // RichText content
  link?: string;
  date: string;
};

type Props = {
  news: NewsItem[];
  openingHours: {
    title?: string;
    hours: Hour[];
  };
  id?: string;
  locale: string;
};

export const NewsAndHoursBlock: React.FC<Props> = ({
  news,
  openingHours,
  id,
  locale,
}) => {
  const t = useTranslations();
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const fullDayKeys = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const currentDayIndex = now.getDay();
  const currentDayKey = fullDayKeys[currentDayIndex];

  const today = openingHours.hours.find((day) => day.dayKey === currentDayKey);
  const isOpenNow = today
    ? [today.morning, today.afternoon].some(
        (range) => range && isTimeInRange(range, now)
      )
    : false;

  return (
    <div className=" p-0" id={id}>
      <div className="page-with-header mb-[70px] sm:mb-[14px] pt-0 sm:pt-[24px]">
        <h2 className="page-header px-4 sm:px-8 flex flex-col lg:flex-row items-start lg:items-center gap-2">
          <svg
            className="hidden lg:block"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" stroke="#7eb36a" strokeWidth="2">
              <line x1="3" x2="21" y1="12" y2="12" />
              <line
                x1="12"
                x2="12"
                y1="3"
                y2="21"
                className="AccordionVerticalLine"
              />
            </g>
          </svg>
          {t("welcome")}
        </h2>
      </div>
      <div
        className="w-full grid grid-cols-4 lg:grid-cols-12  p-0 
       "
      >
        {news.slice(0, 2).map((item, index) => (
          <div
            key={index}
            className="col-span-4 lg:col-span-4 md:col-span-12 px-4 py-0 sm:p-8"
          >
            {/* Heading (outside of bordered box) */}
            {index === 0 ? (
              <h2 className="text-xl font-semibold mb-4">Latest Infos</h2>
            ) : (
              <h2 className="text-xl font-semibold text-transparent mb-4 invisible">
                Latest Infos
              </h2>
            )}

            {/* Bordered content starts here */}
            <div className="lg:border-r lg:border-border">
              <h2 className="text-lg date font-semibold mb-2">
                {new Date(item.date).toLocaleDateString(
                  locale === "de" ? "de-DE" : "en-GB"
                )}
              </h2>
              {item.summary && (
                <div className="mb-2 text-gray-600 pr-4">
                  <RichText content={item.summary} enableGutter={false} />
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="col-span-4 lg:col-span-4 md:col-span-12 px-4 py-8 sm:p-8">
          {openingHours.title && (
            <h2 className="text-xl font-semibold  mb-4">
              {openingHours.title}
            </h2>
          )}
          <h2
            className={cn(
              "text-lg font-semibold mb-2",
              isOpenNow ? "text-[#7eb36a]" : "text-[#e5e2e2]"
            )}
          >
            {isOpenNow ? t("open") : t("closed")}
          </h2>
          <div className="flex flex-col gap-2  ">
            {openingHours.hours.map(({ dayKey, morning, afternoon }) => {
              const isToday = dayKey === currentDayKey;
              const isMorningNow =
                morning && isTimeInRange(morning, now) && isToday;
              const isAfternoonNow =
                afternoon && isTimeInRange(afternoon, now) && isToday;

              return (
                <div key={dayKey} className="w-full mb-2">
                  <div className="flex flex-row xl:flex-row lg:flex-col w-full">
                    {/* Day */}
                    <p className="w-1/3 lg:w-full xl:w-1/3 text-left mb-1 lg:mb-1 xl:mb-0">
                      {t(`days.${dayKey}` as any)}
                    </p>

                    {/* Times */}
                    <div className="flex flex-row w-2/3 lg:w-full xl:w-2/3">
                      <p className="w-1/2 text-left">
                        {morning && (
                          <span
                            className={cn(isMorningNow && "text-[#7eb36a]")}
                          >
                            {morning}
                          </span>
                        )}
                      </p>
                      <p className="w-1/2 text-left">
                        {afternoon && (
                          <span
                            className={cn(isAfternoonNow && "text-[#7eb36a]")}
                          >
                            {afternoon}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Time />
        </div>
      </div>
    </div>
  );
};
