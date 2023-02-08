# This repository contains the backend code for a Blood Bank Management System API. The API is developed using Node.js and Express.js framework.
Features
* Management of blood banks and their inventory
* Management of donors and their donations
* Endpoints for searching and requesting for blood


# To run the code locally, follow these steps:

## Setup & Installation


Clone the repository:

```bash
git clone https://github.com/SwethaChandru/BloodBankAPI-Backend.git
```


Navigate to the project directory:  

```bash
 cd BloodBankAPI-Backend/Backend
 ```

Install the required packages:
```bash
npm install
```

Start the server:
```bash
npm start
```



## The API has the following endpoints:

* POST / users/signup: create an account By Hospital and Receiver
* POST / users/login: to login an account By Hospital and Receiver
* POST /users/ addBloodSamples: add the blood sample information
* POST / users/updateBloodSamples: update the respective blood information
* POST/users/ deleteBloodSamples: delete the respective blood information
* POST/users/ bloodDetails: get all the blood info that the hospital uploaded
* GET/users/ allBloodSamples: list of all blood samples available in all hospitals
* POST/users/ ReceiversRequest: To get the list of all receivers who have requested a particular blood    group from its blood bank.
* POST/receivers/: To request a blood sample from Hospital



