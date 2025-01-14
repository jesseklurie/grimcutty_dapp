#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod grimcutty {
    use ink::prelude::*;
    use ink::storage::Mapping;
    use ink::prelude::string::String;

    #[ink(storage)]
    pub struct Grimcutty {
        total_supply: Balance,
        balances: Mapping<AccountId, Balance>,
        allowances: Mapping<(AccountId, AccountId), Balance>,
        locked_funds: Balance,
        owner: AccountId,
    }

    impl Grimcutty {
        const TOKEN_PRICE: Balance = 1; // 1 Polkadot per Grimcutty token
        const INITIAL_SUPPLY: Balance = 666_666_666;

        /// Constructor to initialize the contract with the initial supply.
        #[ink(constructor)]
        pub fn new() -> Self {
            let caller = Self::env().caller();
            let mut balances = Mapping::default();
            balances.insert(caller, &Self::INITIAL_SUPPLY);

            Self {
                total_supply: Self::INITIAL_SUPPLY,
                balances,
                allowances: Mapping::default(),
                locked_funds: 0,
                owner: caller,
            }
        }

        /// Returns the total supply of Grimcutty tokens.
        #[ink(message)]
        pub fn total_supply(&self) -> Balance {
            self.total_supply
        }

        /// Returns the balance of a specific account.
        #[ink(message)]
        pub fn balance_of(&self, account: AccountId) -> Balance {
            self.balances.get(account).unwrap_or(0)
        }
      
        /// Transfers tokens from the caller to a recipient.
        #[ink(message)]
        pub fn transfer(&mut self, to: AccountId, amount: Balance) -> Result<(), String> {
            let caller = self.env().caller();
            let caller_balance = self.balances.get(caller).unwrap_or(0);

            if caller_balance < amount {
                return Err("Insufficient balance".into());
            }
            
            // self.balances.insert(caller, &(caller_balance - amount));
            if let Some(new_balance) = caller_balance.checked_sub(amount) {
                self.balances.insert(caller, &new_balance);
            } else {
                // Handle underflow (insufficient funds)
            }
            let recipient_balance = self.balances.get(&to).unwrap_or(0);
            // self.balances.insert(&to, &(recipient_balance + amount));
            if let Some(new_recipient_balance) = recipient_balance.checked_add(amount) {
                self.balances.insert(&to, &new_recipient_balance);
            } else {
                // Handle overflow or any other error (optional)
                // println!("Overflow occurred while adding to recipient balance");
                return Err("Overflow occurred while adding to recipient balance".into());

            }

            Ok(())
        }

        /// Approves a spender to spend a specific amount of tokens on behalf of the caller.
        #[ink(message)]
        pub fn approve(&mut self, spender: AccountId, amount: Balance) -> Result<(), String> {
            let caller = self.env().caller();
            self.allowances.insert(&(caller, spender), &amount);
            Ok(())
        }

        /// Transfers tokens from one account to another, using the allowance mechanism.
        #[ink(message)]
        pub fn transfer_from(
            &mut self,
            from: AccountId,
            to: AccountId,
            amount: Balance,
        ) -> Result<(), String> {
            let caller = self.env().caller();
            let allowance = self.allowances.get(&(from, caller)).unwrap_or(0);

            if allowance < amount {
                return Err("Allowance exceeded".into());
            }

            let from_balance = self.balances.get(&from).unwrap_or(0);
            if from_balance < amount {
                return Err("Insufficient balance".into());
            }

            // self.allowances.insert(&(from, caller), &(allowance - amount));
            if let Some(new_allowance) = allowance.checked_sub(amount) {
                self.allowances.insert(&(from, caller), &new_allowance);
            } else {
                // Handle underflow or insufficient allowance (optional)
                // println!("Insufficient allowance or underflow occurred");
                return Err("Insufficient allowance or underflow occurred".into());

            }
            
            // self.balances.insert(&from, &(from_balance - amount));
            if let Some(new_from_balance) = from_balance.checked_sub(amount) {
                self.balances.insert(&from, &new_from_balance);
            } else {
                // Handle underflow or insufficient balance (optional)
                // println!("Insufficient balance or underflow occurred");
                return Err("Insufficient balance or underflow occurred".into());

            }
            

            let to_balance = self.balances.get(&to).unwrap_or(0);
            // self.balances.insert(&to, &(to_balance + amount));
            if let Some(new_to_balance) = to_balance.checked_add(amount) {
                self.balances.insert(&to, &new_to_balance);
            } else {
                // Handle overflow (optional)
                // println!("Overflow occurred while adding to recipient balance");
                return Err("Overflow occurred while adding to recipient balance".into());

            }
            
            Ok(())
        }

        /// Allows a user to purchase Grimcutty tokens by sending Polkadot.
        #[ink(message, payable)]
        pub fn buy_tokens(&mut self, amount: Balance) -> Result<(), String> {
            let caller = self.env().caller();
            let payment = self.env().transferred_value();

            if payment < amount * Self::TOKEN_PRICE {
                return Err("Insufficient payment".into());
            }

            let contract_balance = self.balances.get(&self.env().account_id()).unwrap_or(0);
            if contract_balance < amount {
                return Err("Not enough tokens available for sale".into());
            }

            // self.balances.insert(&self.env().account_id(), &(contract_balance - amount));
            if let Some(new_contract_balance) = contract_balance.checked_sub(amount) {
                self.balances.insert(&self.env().account_id(), &new_contract_balance);
            } else {
                // Handle underflow or insufficient balance (optional)
                // println!("Insufficient contract balance or underflow occurred");
                return Err("Insufficient contract balance or underflow occurred".into());

            }
            // self.balances.insert(&caller, &(self.balances.get(&caller).unwrap_or(0) + amount));
            let caller_balance = self.balances.get(&caller).unwrap_or(0);
            if let Some(new_caller_balance) = caller_balance.checked_add(amount) {
                self.balances.insert(&caller, &new_caller_balance);
            } else {
                // Handle overflow (optional)
                // println!("Overflow occurred while adding to caller balance");
                return Err("Overflow occurred while adding to caller balance".into());

            }
            let owner_share = payment / 2;
            // let locked_share = payment - owner_share;
            if let Some(locked_share) = payment.checked_sub(owner_share) {
                // Proceed with using locked_share
                // self.locked_funds += locked_share;
                if let Some(new_locked_funds) = self.locked_funds.checked_add(locked_share) {
                    self.locked_funds = new_locked_funds;
                } else {
                    // Handle overflow (optional)
                    // println!("Overflow occurred while adding locked share to locked funds");
                    return Err("Overflow occurred while adding locked share to locked funds".into());

                }
            } else {
                // Handle underflow (optional)
                // println!("Underflow occurred while subtracting owner share from payment");
                return Err("Underflow occurred while subtracting owner share from payment".into());

            }
           

            self.env().transfer(self.owner, owner_share).map_err(|_| "Transfer to owner failed")?;

            Ok(())
        }

        /// Allows a user to refund their Grimcutty tokens and get back 50% of their initial investment.
        #[ink(message)]
        pub fn refund_tokens(&mut self, amount: Balance) -> Result<(), String> {
            let caller = self.env().caller();
            let caller_balance = self.balances.get(&caller).unwrap_or(0);

            if caller_balance < amount {
                return Err("Insufficient Grimcutty balance".into());
            }

            let refund_amount = amount * Self::TOKEN_PRICE / 2;
            if self.locked_funds < refund_amount {
                return Err("Not enough locked funds for refund".into());
            }

            // self.balances.insert(&caller, &(caller_balance - amount));
            if let Some(new_caller_balance) = caller_balance.checked_sub(amount) {
                self.balances.insert(&caller, &new_caller_balance);
            } else {
                // Handle underflow or insufficient balance (optional)
                // println!("Insufficient balance or underflow occurred");
                return Err("Insufficient balance or underflow occurred".into());

            }
            
            // self.total_supply -= amount;
            if let Some(new_total_supply) = self.total_supply.checked_sub(amount) {
                self.total_supply = new_total_supply;
            } else {
                // Handle underflow (optional)
                // println!("Underflow occurred while subtracting from total supply");
                return Err("Underflow occurred while subtracting from total supply".into());
            }

            // self.locked_funds -= refund_amount;
            if let Some(new_locked_funds) = self.locked_funds.checked_sub(refund_amount) {
                self.locked_funds = new_locked_funds;
            } else {
                // Handle underflow or insufficient funds (optional)
                // println!("Underflow occurred while subtracting refund amount from locked funds");
                return Err("Underflow occurred while subtracting refund amount from locked funds".into());

            }

            self.env().transfer(caller, refund_amount).map_err(|_| "Refund transfer failed")?;

            Ok(())
        }

        /// Returns the amount of locked funds in the contract.
        #[ink(message)]
        pub fn get_locked_funds(&self) -> Balance {
            self.locked_funds
        }
    }

    #[cfg(test)]
    mod tests {
        use super::*;

        #[ink::test]
        fn new_works() {
            let grimcutty = Grimcutty::new();
            assert_eq!(grimcutty.total_supply(), Grimcutty::INITIAL_SUPPLY);
        }

        #[ink::test]
        fn buy_tokens_works() {
            let mut grimcutty = Grimcutty::new();
            let caller = AccountId::from([0x1; 32]);
            grimcutty.balances.insert(&AccountId::from([0x0; 32]), &Grimcutty::INITIAL_SUPPLY);

            // Simulate buying tokens
            grimcutty.env().set_caller(caller);
            grimcutty.env().set_transferred_value(10);
            assert!(grimcutty.buy_tokens(10).is_ok());
            assert_eq!(grimcutty.balance_of(caller), 10);
        }
    }
}
