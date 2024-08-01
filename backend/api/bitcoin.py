import requests


def get_bitcoin_data():

    url = "https://api.coingecko.com/api/v3/coins/bitcoin"
    headers = {"accept": "application/json"}
    response = requests.get(url, headers=headers)

    print(response.json)

    if response.status_code == 200:
        data = response.json()
        return {
            "price": data["market_data"]["current_price"]["btc"],
        }
    else:
        raise Exception("Failed to fetch Bitcoin data from API")