import React from 'react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
  } from "recharts";
  


export default function ProfitChart(props) {
    const {dailyProfit, yearlyProfit} = props
    const increment =((yearlyProfit - dailyProfit) / 11).toFixed(0);
    const data = [];
    let uv = Number(dailyProfit);
    for (let i = 0; i < 12; i++) {
        data.push({
          name: `m${i + 1}`,
          uv: Math.round(uv),
        });
        uv+=Number(increment)
      }
      
      const gradientOffset = () => {
        const dataMax = Math.max(...data.map((i) => i.uv));
        const dataMin = Math.min(...data.map((i) => i.uv));
      
        if (dataMax <= 0) {
          return 0;
        }
        if (dataMin >= 0) {
          return 1;
        }
        return dataMax / (dataMax - dataMin);
      };
      
      const off = gradientOffset();
    return (
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="green" stopOpacity={1} />
              <stop offset={off} stopColor="red" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#000"
            fill="url(#splitColor)"
            baseValue={0}
          />
        </AreaChart>
      );
}

