// layout Next 13
//

import React from "react";

export default function LayoutEntry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-auto md:mt-20 flex justify-center">
      {children}
    </div>
  );
}
