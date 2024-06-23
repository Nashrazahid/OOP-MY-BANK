#! /usr/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"

console.log(chalk.blue("=".repeat(90)))
let text = "NASHRA BANK LIMITED"
console.log(text.padStart(52))
console.log(chalk.blue("=".repeat(90)))

class MyBank{
    private balance:number = 500000;
   accountNumber: number;
   accountHolder:string;
    
    constructor(accountNumber:number,accountHolder:string){
        this.accountNumber = accountNumber,
         this.accountHolder = accountHolder
        
    }
    Deposit (amount:number){
        if(amount > 100){
            this.balance += amount;
            console.log(chalk.yellow(`balance ${amount} is deposit in your account`))
        }else{
            console.log(chalk.red("enter valid amount"))
        }
    }
    
    withdraw (amount:number){
        if(amount > this.balance){
            console.log("insufficient balance")
        }else if(amount > 500){
            this.balance -= amount
            console.log(`withdraw successful ${amount}`)
        }else{
            console.log(chalk.red("enter valid amount"))
        }
    }
        getbalance(){
          console.log(chalk.yellowBright(`your account balance is ${this.balance}`))
        } 
    
}
async function manageAccount(){
let answer = await inquirer.prompt([{
        name:"Name",
        type:"input",
        message:"enter your name",
        validate: (value) => {
            if (value.trim() === "") {
              return "FILL OUT THIS FIELD";
            }
            return true;
        }
    },
{
    name:"password",
    type:"input",
    message:"enter your account number",
    validate: (value) => {
        if (value.trim() === "") {
          return "FILL OUT THIS FIELD";
        }
        return true;
    }
}]) 

let bank = new MyBank (answer.Name,answer.password)


while(true){
    let option =await inquirer.prompt({
        name:"select",
        type:"list",
        message:"select option",
        choices:["deposit","withdraw","check balance","exit"]
    })

    switch(option.select){
        case "deposit":
        let deposit = await inquirer.prompt({
            name:"amount",
            type:"number",
            message:"enter your amount",
        })
        bank.Deposit(deposit.amount)
        break;

       case "withdraw":
        let withdraw = await inquirer.prompt({
            name:"amount",
            type:"number",
            message:"enter your amount to withdraw",
        })
        bank.withdraw(withdraw.amount)
        break;

        case "check balance":
            bank.getbalance()
            break;

        case "exit":
        console.log(chalk.yellow("thanks for coming"))
        return;
    }

}
}
manageAccount()