"use client";
import { useState } from "react";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { EntriesProps } from "@/@types/EntriesProps";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip,
  Legend
);

export default function BarChart({ entries }: any) {
  const [entriesData, setEntriesData] = useState({
    labels:
      entries &&
      entries
        .filter((entry: any) => entry.type === "EXPENSE")
        .map((entry: any) => new Date(entry?.createdAt).getDate()),

    datasets: [
      {
        label: "Expense",
        data:
          entries &&
          entries
            .filter((entry: any) => entry.type === "EXPENSE")
            .map((entry: any) => entry?.amount),
        backgroundColor: "rgba(240, 11, 11)",
      },
      {
        label: "Income",
        data:
          entries &&
          entries
            .filter((entry: any) => entry.type === "INCOME")
            .map((entry: any) => entry?.amount),
        backgroundColor: "rgba(11, 240, 11)",
      },
    ],
  });

  return (
    <div>
      <Bar
        data={entriesData}
        options={{
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: 'Chart.js Bar Chart'
            }
          },
        }}
      />
    </div>
  );
}
