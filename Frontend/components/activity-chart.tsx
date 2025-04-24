"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ActivityChartProps {
  data: {
    date: string
    posts: number
    comments: number
    likes: number
  }[]
}

export function ActivityChart({ data }: ActivityChartProps) {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" fontSize={12} />
          <YAxis fontSize={12} />
          <Tooltip />
          <Line type="monotone" dataKey="posts" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="comments" stroke="#82ca9d" strokeWidth={2} />
          <Line type="monotone" dataKey="likes" stroke="#ffc658" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
