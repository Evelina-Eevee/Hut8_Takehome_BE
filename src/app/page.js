"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfitChart from '@/components/ProfitChart';

export default function Home() {
  const [hashRate, setHashRate] = useState('');
  const [electricityCost, setElectricityCost] = useState('');
  const [powerConsumption, setPowerConsumption] = useState('');
  const [initialInvestment, setInitialInvestment] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    try {
      const params = {
        hash_rate: parseFloat(hashRate),
        electricity_cost: parseFloat(electricityCost),
        power_consumption: parseFloat(powerConsumption),
        initial_investment: parseFloat(initialInvestment),
      };
      const response = await axios.post('http://localhost:8000/calculate/', params);
      setResult(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Crypto Profit Calculator</h2>
      </div>

      <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="e-cost" className="block text-sm font-semibold leading-6 text-gray-900">
              Electricity Cost
            </label>
            <div className="mt-2.5">
              <input
                id="e-cost"
                name="e-cost"
                type="number"
                value={electricityCost}
                onChange={(e) => setElectricityCost(e.target.value)}
                placeholder='$/kWh'
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="e-consum" className="block text-sm font-semibold leading-6 text-gray-900">
              Power Consumption
            </label>
            <div className="mt-2.5">
              <input
                id="e-consum"
                name="e-consum"
                type="number"
                value={powerConsumption}
                onChange={(e) => setPowerConsumption(e.target.value)}
                placeholder='W'
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="hast-rate" className="block text-sm font-semibold leading-6 text-gray-900">
              HashRate
            </label>
            <div className="mt-2.5">
              <input
                id="hast-rate"
                name="hast-rate"
                type="number"
                value={hashRate}
                onChange={(e) => setHashRate(e.target.value)}
                placeholder='TH/s'
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="investment" className="block text-sm font-semibold leading-6 text-gray-900">
              Initial Investment
            </label>
            <div className="mt-2.5">
              <input
                id="initialInvestment"
                name="initialInvestment"
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
                placeholder='$-$$$'
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="button"
            onClick={handleCalculate}
            className="
            block w-full 
            rounded-md bg-indigo-600 px-3.5 
            py-2.5
            text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 
            focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Calculate
          </button>
        </div>
      </form>
      {result && (
        <div className="mx-auto max-w-4xl text-left mt-20 text-black text-center" >
          <h2>Results</h2>
          <br></br><br></br>
          <div className="flex flex-col items-center">
            <div className="flex flex-col">
              <div className="lg:basis-1/2 text-black flex flex-row">
                <div>
                  <p> COSTS </p>
                  <div className="rounded-md border border-color-indigo-500 border-radius-3 mx-5 p-5">
                    <p>Daily Cost:</p>
                    <p> ${result.dailyCost.toFixed(2)}</p>
                    <br></br>
                    <p>Monthly Cost:</p>
                    <p>${result.monthlyCost.toFixed(2)}</p>
                    <br></br>
                    <p>Yearly Cost:</p>
                    <p> ${result.yearlyCost.toFixed(2)}</p>
                  </div>
                </div>
                <div>
                  <p> USD REVENUE </p>
                  <div className="rounded-md border border-color-indigo-500 border-radius-3 mx-5 p-5">
                    <p>Daily Revenue:</p>
                    <p> ${result.dailyRevenueUSD.toFixed(2)}</p>
                    <br></br>
                    <p>Monthly Revenue:</p>
                    <p>${result.monthlyRevenueUSD.toFixed(2)}</p>
                    <br></br>
                    <p>Yearly Revenue:</p>
                    <p> ${result.yearlyRevenueUSD.toFixed(2)}</p>
                  </div>
                </div>
                <div>
                  <p> BTC REVENUE</p>
                  <div className="rounded-md border border-color-indigo-500 border-radius-3 mx-5 p-5">
                    <p>Daily Revenue:</p>
                    <p> {result.dailyRevenueBTC.toFixed(8)} BTC</p>
                    <br></br>
                    <p>Monthly Revenue:</p>
                    <p> {result.monthlyRevenueBTC.toFixed(8)} BTC</p>
                    <br></br>
                    <p>Yearly Revenue:</p>
                    <p> {result.yearlyRevenueBTC.toFixed(8)} BTC</p>
                  </div>
                </div>
                <div>
                  <p> USD PROFIT</p>
                  <div className="rounded-md border border-color-indigo-500 border-radius-3 mx-5 p-5">
                    <p>Daily Profit:</p>
                    <p> ${result.dailyProfitUSD.toFixed(2)}</p>
                    <br></br>
                    <p>Monthly Profit:</p>
                    <p> ${result.monthlyProfitUSD.toFixed(2)}</p>
                    <br></br>
                    <p>Yearly Profit:</p>
                    <p> ${result.yearlyProfitUSD.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <br></br>
              <div className="text-center text-black">
                <p>Breakeven Timeline: {result.breakevenTimeline.toFixed(0)} months</p>
                <p>Cost to Mine 1 BTC (USD): ${result.costToMine.toFixed(2)}</p>
              </div>
            </div>
            <br></br><br></br>
            <div className="basis-1/2 ml-10">
              <ProfitChart dailyProfit={result.dailyProfitUSD.toFixed(0)} yearlyProfit={result.yearlyProfitUSD.toFixed(0)} />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
