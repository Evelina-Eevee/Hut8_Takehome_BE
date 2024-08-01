from fastapi import FastAPI, HTTPException, requests


from pydantic import ValidationError
from starlette.middleware.cors import CORSMiddleware
from api.bitcoin import get_bitcoin_data

from profit_calculator import calculate_profitability

from models.MinerInput import MiningInput

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify the allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/calculate")
async def calculate_profit(input: MiningInput):
    try:

        # Fetch external data
        bitcoin_data = get_bitcoin_data()

        # Calculate profitability
        profit = calculate_profitability(input, bitcoin_data)

        return profit

    except ValidationError as ve:
        # Handle validation errors from Pydantic
        raise HTTPException(status_code=400, detail=str(ve))

    except requests.RequestException as re:
        # Handle errors related to external API requests
        raise HTTPException(status_code=502, detail="Failed to fetch Bitcoin data")

    except Exception as e:
        # Handle any other unexpected errors
        print(e)
        raise HTTPException(status_code=500, detail="An unexpected error occurred,")


