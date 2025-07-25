import { cn } from "src/utilities/cn";
import React from "react";

import type { Doctor } from "@/payload-types";

import { CardDoctor } from "@/components/CardDoctor"; // ✅ Updated import

export type Props = {
  doctors: Doctor[];
};

export const CollectionDoctor: React.FC<Props> = (props) => {
  const { doctors } = props;
  console.log("Doctors:", doctors);
  return (
    <div className={cn("")}>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {doctors
          ?.filter((doc) => doc && doc.slug && doc.title) // only valid doctors
          .map((result, index) => (
            <CardDoctor
              key={index}
              className="h-full"
              doc={result}
              relationTo="doctors"
              showCategories
            />
          ))}
      </div>
    </div>
  );
};
