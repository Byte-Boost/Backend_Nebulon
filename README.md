<h1 align="center">🌀Nebulon Dashboard - Backend</h1>
   <p align="center">
   <image alt="header-nebulon-db" src="https://github.com/Byte-Boost/Backend_Nebulon/assets/105757405/5be8aa9f-1baf-4d62-aacc-433597affa75"/>   
   </p>
<hr>   


<h2 style="display: inline">Commissions <sub>(Endpoint)</sub></h2>
<p>Commissions são vendas de um produto a um cliente, feitas por um vendedor.</p>

<details>
<summary>GET - /commissions</summary>
Response example:
   
```json
[
	{
		"id": 1,
		"date": "2000-01-01T00:00:00.000Z",
		"value": 10,
		"paymentMethod": "Installments",
		"clientId": 1,
		"productId": 1,
		"sellerId": 1,
	}
]
```
</details>

<details>
<summary>GET - /commissions/{id}</summary>
Response example:
   
```json
{
	"id": 1,
	"date": "2000-01-01T00:00:00.000Z",
	"value": 10,
	"paymentMethod": "Installments",
	"clientId": 1,
	"productId": 1,
	"sellerId": 1,
}
```
</details>

<details>
<summary>POST - /commissions</summary>
Request body example:

```json
{
	"date": "2000-01-01",
	"value": 10,
	"paymentMethod": "Installments",
	"clientId": 1,
	"productId": 2,
	"sellerId": 1
}
```
</details>

<details>
<summary>PUT - /commissions/{id}</summary>
Request body example:

```json
{
	"date": "2000-01-01",
	"value": 10,
	"paymentMethod": "Installments",
	"clientId": 1,
	"productId": 2,
	"sellerId": 1
}
```
</details>

<details>
<summary>DELETE - /commissions/{id}</summary>

Retorna Status Code 200
</details>

<h2 style="display: inline">Commission <sub>(Type)</sub></h2>

name | Description | Type 
--- | --- | ---
id | The identifier for this resource. | integer
date | Date/time of recording | integer
value | Total value of commission in R$ | float
paymentMethod | Payment method | string
clientId | Commission's client identifier | integer
productId | Commission's product identifier | integer
sellerId | Commission's seller identifier | integer

