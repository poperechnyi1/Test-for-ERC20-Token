var erc20 = artifacts.require("MyToken");

contract("Testing simple ERC20 contract", function (accounts) {
    it("Deploy contract whitout parameters", function () {
        return erc20.deployed();
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
        return erc20.deployed().then(
            function (instance) {
                metaData = instance;
                return metaData.balanceOf.call(account_one);
            }
        ).then(function (balance) {
            account_one_starting_balance = balance.toNumber();
            console.log("Balance of first account before sending",account_one_starting_balance);
            return metaData.balanceOf.call(account_two);
        }).then(function (balance) {
            account_two_starting_balance = balance.toNumber();
            console.log("Balance of second account before receiv",account_two_starting_balance);
            return metaData.transfer(account_two, amount, {from: account_one});
        }).then(function () {
            return metaData.balanceOf.call(account_one);
        }).then(function (balance) {
            account_one_ending_balance = balance.toNumber();
            return metaData.balanceOf.call(account_two);
        }).then(function(balance){
            account_two_ending_balance = balance.toNumber();

            assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
            assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");

        });
    });
});