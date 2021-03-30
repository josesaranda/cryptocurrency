# CryptoCurrency

This project is an example of how to use NestJS and Angular together.

## Requirements

**Node** and **npm** installed

## Structure

The structure of this project has been splitted in different parts (server, app) to allow the execution of these parts independiently. Also, is possible to run everything by only running from the command line `npm start`.

## Technologies

- NodeJS
- Angular
- NestJS
- Typescript
- Socket.io

## Installation

In root folder, run:

`npm install`

## Execution

In root folder, run:

`npm start`

## Project goals

#### Part 1

Create a web application that displays a list of accounts (data table) showing the  balance and available balance in both BTC (bitcoin) and the equivalent in Dollars.  There is an example below (screenshot), where the column names are Account  Name, Category, Tag, Balance and Available balance. Category and Tag are not  important and return something at random.  
The NestJS / NodeJS backend should return from a REST endpoint a minimum of  15 accounts (rows) so we have data to view. Balance and Available Balance are  displayed both in BTC and Dollars. Your dataset should only contain BTC, the  value of the Dollar is calculated using an exchange rate.  
The backend should return the current exchange rate when the web page is first  loaded and this value should be used to calculate the Balance and Available  Balance. The current exchange rate should be displayed on the screen (like in the  screenshot).

#### Part 2

Now, lets make it more interesting. A new exchange rate should be pushed from  the backend to the frontend every 30 seconds using websockets. The value of the  new exchange rate is random but try to send within a realistic range (e.g from  $5000 to $12000). 
As new values arrive at the frontend the UI should update the exchange rate  displayed at the top of the page (screenshot above) and also re-calculate all  balance and available balances inside the table.  

#### Part 3

As users can send or receive BTC within an account, the balance and available  balance can eventually change. 
Each time the balance of an account changes the frontend should receive an  update of the BTC balance and available balance.

To simulate this changes just set  a random interval (between 20 to 40 seconds) to send this update to the front end  for the specific account (data table row).

To highlight the change, the background color of the specific row should flash one  of the following colors:

* Red: if the new available balance is lower than the previous value.

* Green: if the new available balance is higher than the previous value.

* No flash color if the available balance does not change. 

#### Part 4

Finally clicking on an account row should open a new page with the account  details (but keeping within the Single Page application). This is a pure Master /  Detail implementation. Master being the account list and details being the  information of the account the user clicked on.

The detailed page should show some transactions that belong to the specific  account in a data table. Here is an example:  

The transactions table should show an Order Code and Order Id – these should be  unique values and also an amount for the Debit or Credit columns (depending if  the user sent or received BTC in this transaction). Use the example mock above. Again the transaction should be related to the account (do not show transactions that belong to one account in another).

As you can notice the Debit, Credit and Balance fields in the transactions displays  BTC and Dollar. The Dollar values has to be calculated according the current  exchange rate and re-calculated each time a new exchange rate is received in the  front end.
 
Also if an update for the Balance and Available Balance for this specific account is  received this should be highlighted with a flash color of the text for the account  Balance and Available Balance displayed in the details page. Use the same colors  flash conditions described in the part 3.
