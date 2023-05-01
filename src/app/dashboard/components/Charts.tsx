"use client";

import React from "react";
import dynamic from "next/dynamic";
import { EntryProps } from "@/@types/EntryProps";
import { CategoryProps } from "@/@types/CategoryProps";
import { dateFormatter, priceFormatter } from "@/utils/formatter";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ChartsProps {
  entries: EntryProps[];
  categories: CategoryProps[];
}

export function Charts({ entries, categories }: ChartsProps) {
  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: entries
      .map((entry: EntryProps) => dateFormatter.format(new Date(entry.createdAt)))
    },

  };

  const series = [
    {
      name: "series-1",
      data: entries.map((entry: EntryProps) => entry.amount),
    },

  ];

  return (
    <>
      <Chart
        options={options}
        series={series}
        type="bar"
        width="100%"
        height="320"
        className="bg-white/50 rounded-md w-full mt-6"
      />
      <div className="">
        {entries.map((entry: EntryProps) => {
          return (
            <div key={entry.id} className="flex justify-between">
              <p>{entry.description}</p>
              <p>{entry.amount}</p>
            </div>
          );
        })}
      </div>

     
    </>
  );
}
