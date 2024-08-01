from fastapi import requests

from models.MinerInput import MiningInput


def calculate_profitability(input_data: MiningInput, bitcoin_data):


    hash_rate = input_data.hash_rate
    power_consumption = input_data.power_consumption
    electricity_cost = input_data.electricity_cost
    initial_investment = input_data.initial_investment

    bitcoin_price = bitcoin_data["price"]
    print(bitcoin_price)
    difficulty = bitcoin_data.get("difficulty", 1)  # default value if not provided

    # Calculate daily revenue in BTC
    daily_revenue_btc = (hash_rate * 1e12) / difficulty
    daily_revenue_usd = daily_revenue_btc * bitcoin_price

    # Calculate costs
    daily_cost = (power_consumption / 1000) * electricity_cost  # kWh * $/kWh
    monthly_cost = daily_cost * 30
    yearly_cost = daily_cost * 365

    # Profit calculation
    daily_profit_usd = daily_revenue_usd - daily_cost
    monthly_revenue_usd = daily_revenue_usd * 30
    yearly_revenue_usd = daily_revenue_usd * 365
    monthly_profit_usd = monthly_revenue_usd - monthly_cost
    yearly_profit_usd = yearly_revenue_usd - yearly_cost

    breakeven_timeline = initial_investment / daily_profit_usd  # in days

    # Cost to mine calculation (example)
    cost_to_mine = initial_investment / (daily_revenue_usd / daily_cost)

    return {
        "dailyCost": daily_cost,
        "monthlyCost": monthly_cost,
        "yearlyCost": yearly_cost,
        "dailyRevenueUSD": daily_revenue_usd,
        "monthlyRevenueUSD": monthly_revenue_usd,
        "yearlyRevenueUSD": yearly_revenue_usd,
        "dailyRevenueBTC": daily_revenue_btc,
        "monthlyRevenueBTC": daily_revenue_btc * 30,
        "yearlyRevenueBTC": daily_revenue_btc * 365,
        "dailyProfitUSD": daily_profit_usd,
        "monthlyProfitUSD": monthly_profit_usd,
        "yearlyProfitUSD": yearly_profit_usd,
        "breakevenTimeline": breakeven_timeline,
        "costToMine": cost_to_mine,
    }