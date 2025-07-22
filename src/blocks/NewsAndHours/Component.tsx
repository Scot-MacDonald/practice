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
      <div className=" page-with-header mx-8">
        <h2 className="page-header">{t("welcome")}</h2>
      </div>
      <div className="w-full grid grid-cols-4 lg:grid-cols-12  gap-y-8  xl:bg-white lg:bg-black p-0 border-t  border-border">
        {news.slice(0, 2).map((item, index) => (
          <div
            key={index}
            className={cn(
              "col-span-4 lg:col-span-4 md:col-span-12 p-8",
              (index === 0 || index === 1) && "lg:border-r lg:border-border"
            )}
          >
            {index === 0 ? (
              <h2 className="text-lg font-semibold  mb-4">Latest Infos</h2>
            ) : (
              <h2 className="text-lg font-semibold text-transparent mb-4 select-none">
                Latest Infos
              </h2>
            )}
            <h2 className="text-lg font-semibold mb-2 ">
              {new Date(item.date).toLocaleDateString(
                locale === "de" ? "de-DE" : "en-GB"
              )}
            </h2>
            {item.summary && (
              <div className="mb-2 text-gray-600">
                <RichText content={item.summary} enableGutter={false} />
              </div>
            )}
          </div>
        ))}

        <div className="col-span-4 lg:col-span-4 md:col-span-12 p-8">
          {openingHours.title && (
            <h2 className="text-lg font-semibold  mb-4">
              {openingHours.title}
            </h2>
          )}
          <h2
            className={cn(
              "text-lg font-semibold mb-2",
              isOpenNow ? "text-[#7eb36a]" : "text-[#e15555]"
            )}
          >
            {isOpenNow ? t("open") : t("closed")}
          </h2>
          <div className="flex flex-col gap-2 text-[#4a5565] ">
            {openingHours.hours.map(({ dayKey, morning, afternoon }) => {
              const isToday = dayKey === currentDayKey;
              const isMorningNow =
                morning && isTimeInRange(morning, now) && isToday;
              const isAfternoonNow =
                afternoon && isTimeInRange(afternoon, now) && isToday;

              return (
                <div key={dayKey} className="flex items-start w-full">
                  <p className="w-1/2 text-left">
                    {t(`days.${dayKey}` as any)}
                  </p>

                  <p className="w-1/4 text-left">
                    {morning && (
                      <span className={cn(isMorningNow && "text-[#7eb36a]")}>
                        {morning}
                      </span>
                    )}
                  </p>

                  <p className="w-1/4 text-right">
                    {afternoon && (
                      <span className={cn(isAfternoonNow && "text-[#7eb36a]")}>
                        {afternoon}
                      </span>
                    )}
                  </p>
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
