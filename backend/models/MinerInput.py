from pydantic import BaseModel


class MiningInput(BaseModel):
    hash_rate: float
    electricity_cost: float
    power_consumption: float
    initial_investment: float