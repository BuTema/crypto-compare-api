### **Cryptocurrency Comparison Api**

**Description**
This API service is designed to compare cryptocurrency prices across various exchanges (Binance, KuCoin, Uniswap). It provides two primary endpoints:

- **/estimate**: Determines the most profitable exchange for exchanging a specified amount of cryptocurrency.
- **/getRates**: Returns the current prices of a specified cryptocurrency pair on all supported exchanges.

**Installation**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/butema/crypto-compare-api.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```

**Configuration**
Create a `.env` file in the project root and add the following variables:

```
SERVER_URL = http://localhost/
PORT = 3000
```

**Running the application**

```bash
npm start
```

**Project Structure**

- **models:** Data models representing exchanges, cryptocurrencies, and prices.
- **services:** Services for interacting with exchange APIs and performing calculations.
- **controllers:** Routes for handling HTTP requests.

**Using the API**

- **Endpoint /estimate**
  - **Request:**
    ```
    GET /estimate?inputAmount=10&inputCurrency=BTC&outputCurrency=USDT
    ```
  - **Response:**
    ```json
    {
      "exchangeName": "Uniswap",
      "outputAmount": 661113.3407700001
    }
    ```
- **Endpoint /getRates**
  - **Request:**
    ```
    GET //getRates?baseCurrency=BTC&quoteCurrency=USDT
    ```
  - **Response:**
    ```json
    [
      {
        "exchangeName": "Uniswap",
        "exchangeRate": 66100.643413
      },
      {
        "exchangeName": "Binance",
        "exchangeRate": 66077.97
      },
      {
        "exchangeName": "Kucoin",
        "exchangeRate": 66072.01850016518
      }
    ]
    ```

**Technologies**

- Node.js
- TypeScript
- dotenv
- ethers.js
- express.js
- node-fetch
