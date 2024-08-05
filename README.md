Crypto Mining Calculator 

Inputs 

````
Electricity Cost Input: Specify the cost of electricity per kilowatt-hour (kWh) in located region.
Power Consumption: Input of the power consumption mining hardware (in watts).
Hash Rate: Hash rate (mining power) of equipment, in terahashes per second (TH/s).
Initial Investment: Upfront costs associated with starting a mining operation
````


Assumptions:
* https://api.coingecko.com/api/v3/coins/bitcoin gives us data 
  * currently bitcoint price is set to $1?
* Make for profitability 
* Impact calculation
* 

# Running Frontend
### Requirements
* Must have `nodeJS v20.11.1` installed 

in the root directory ./sampleFrontend
```bash
cd frontend
npm install
npm run dev 
```

### Frontend application should app and running in http://localhost:3000/


## Backend Overview 

/calculator expects 
```
{
  "electricity_cost": 0.12,
  "power_consumption": 3500,
  "hash_rate": 100,
  "initial_investment": 50000
}
```

outputs 

````
    dailyCost: float 
    monthlyCost: float
    yearlyCost: float
    dailyRevenueUSD: float
    monthlyRevenueUSD: float
    yearlyRevenueUSD: float
    dailyRevenueBTC: float
    monthlyRevenueBTC: float
    yearlyRevenueBTC: float
    dailyProfitUSD: float
    monthlyProfitUSD: float
    yearlyProfitUSD: float
    breakevenTimeline: float 
    costToMine: float
````



# Running Backend
### Requirements
* Must have `python3` installed 

in the root directory ./sampleFrontend

** current commands are for Mac
```bash
cd backend
python3 -m venv venv
pip install -r requirements.txt
source venv/bin/activate
uvicorn main:app --reload 
```
