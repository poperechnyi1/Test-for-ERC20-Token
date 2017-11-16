var erc20 = artifacts.require("MyToken");


contract("Testing simple ERC20 contract", function (accounts) {

    it("Deploy contract whitout parameters", function () {
        return erc20.deployed();
    });

    it("Current contract is compatibility with ERC20", function(){
        return erc20.deployed().then(function(instance){
            assert(instance.totalSupply && instance.balanceOf && instance.transfer && instance.transferFrom && instance.approve && instance.allowance, "Contract don`t have all methods to the ERC20 token.");
        })
    });

    it("Total token supply", function(){
        return erc20.deployed().then(function(instance){
            return instance.totalSupply.call();
        }).then(function(result){
            assert.equal(result, 1000000);
        })
    });

    it("Should send tokens", function () {
        var metaData;
        var account_one = accounts[0];
        var account_two = accounts[1];
        var account_one_starting_balance;
        var account_two_starting_balance;
        var account_one_ending_balance;
        var account_two_ending_balance;
        var amount = 100;
        return erc20.deployed().then(function (instance) {
                metaData = instance;
                return metaData.balanceOf.call(account_one);
            }
        ).then(function (balance) {
            account_one_starting_balance = balance.toNumber();
            // console.log("Balance of first account before sending",account_one_starting_balance);
            return metaData.balanceOf.call(account_two);
        }).then(function (balance) {
            account_two_starting_balance = balance.toNumber();
            // console.log("Balance of second account before receiv",account_two_starting_balance);
            return metaData.transfer(account_two, amount, {from: account_one});
        }).then(function () {
            return metaData.balanceOf.call(account_one);
        }).then(function (balance) {
            account_one_ending_balance = balance.toNumber();
            return metaData.balanceOf.call(account_two);
        }).then(function(balance){
            account_two_ending_balance = balance.toNumber();
            // console.log("Balance of first account after sending",account_one_ending_balance);
            // console.log("Balance of second account after receiv",account_two_ending_balance);
            
            assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
            assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
        });
    });

    //amoutn use for check how 
    var amountToSpend = 1000;


    it("Check approve", function(){
        var metaData;
        var owner = accounts[0];
        var spender = accounts[1];
        var spender_allowance_before_approve;
 
        return erc20.deployed().then(function(instance){
            metaData = instance;
            return instance.allowance.call(owner, spender);
        }).then(function(balance){
            spender_allowance_before_approve = balance.toNumber();
            return metaData.approve(spender, amountToSpend, {from: owner});
        }).then(function(){
            return metaData.allowance.call(owner, spender);
        }).then(function(remaining){
            assert.equal(remaining, spender_allowance_before_approve + amountToSpend, "Allowance do not work or don`t work approve");
        });
    });

    it("Check allowance", function(){
        var owner = accounts[0];
        var spender = accounts[1];
      
        var metaData;

        return erc20.deployed().then(function(instance){
            metaData = instance;
            return instance.allowance.call(owner, spender);
        }).then(function(result){
            // console.log(result.toNumber());
            assert.equal(result.toNumber(), amountToSpend, "Allowance don`t work");           
        });
    });

    it("Check transferFrom", function(){
        var metaData;
        var ammountSpend = 10000;
        var amountToTransferFrom = 900;
        var first_account = accounts[0];
        var second_account = accounts[1];
        var third_account = accounts[2]
        var from_account_before_transfer;
        var to_account_before_transfer;
        var from_account_after_transfer;
        var to_account_after_transfer;
        return erc20.deployed().then(function(instance){
            metaData = instance;
            return instance.balanceOf.call(first_account);
        }).then(function(balance){
            from_account_before_transfer = balance.toNumber();
            // console.log("from_account_before_transfer", from_account_before_transfer);
            return metaData.balanceOf.call(third_account);
        }).then(function(balance){
            to_account_before_transfer = balance.toNumber();
            // console.log("to_account_before_transfer", to_account_before_transfer);
            return metaData.approve(second_account, ammountSpend, {from: first_account});
        }).then(function(){
            return metaData.transferFrom(first_account, third_account, amountToTransferFrom, {from: second_account});
        }).then(function(){
            return metaData.balanceOf.call(first_account);
        }).then(function(result){
            from_account_after_transfer = result.toNumber();
            // console.log("from_account_after_transfer", from_account_after_transfer);
            return metaData.balanceOf.call(third_account);
        }).then(function(result){
            to_account_after_transfer = result.toNumber();
            // console.log("to_account_after_transfer", to_account_after_transfer);

            //check asserts ...
            assert.equal(from_account_after_transfer, from_account_before_transfer - amountToTransferFrom, "Not send tokens from spender or not approved account for spender");
            assert.equal(to_account_after_transfer, to_account_before_transfer + amountToTransferFrom, "Not receive tokens from spender");
            
        });
    });

});