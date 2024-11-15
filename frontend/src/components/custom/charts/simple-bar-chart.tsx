"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
const chartData = [
  { month: "January", arrestos: 186 },
  { month: "February", arrestos: 305 },
  { month: "March", arrestos: 237 },
  { month: "April", arrestos: 73 },
  { month: "May", arrestos: 209 },
  { month: "June", arrestos: 214 },
]

const chartConfig = {
  arrestos: {
    label: "arrestos",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function SimpleBarChartComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Arestos Mensuales</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="arrestos" fill="var(--color-arrestos)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
            Tendencia <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
            Se muestran los ultimos 6 meses
        </div>
      </CardFooter>
    </Card>
  )
}
