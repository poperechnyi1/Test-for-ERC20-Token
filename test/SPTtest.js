var SPT = artifacts.require("StepanToken2");


contract("Testing ERC20 Contract", function(accounts){

    //check deploy contract
    it("Deploy contract whit two parameters", function(){
        return SPT.deployed('0xC0b4ec83028307053Fbe8d00ba4372384fe4b52B','0x959FD7Ef9089B7142B6B908Dc3A8af7Aa8ff0FA1');
    });

    //check on ERC20 compatibility
    it("Current token compatibility with ERC20", function(){
        return  SPT.deployed('0xC0b4ec83028307053Fbe8d00ba4372384fe4b52B',
        '0x959FD7Ef9089B7142B6B908Dc3A8af7Aa8ff0FA1').then(
            function(instance){
                // console.log(instance);
                assert(instance.totalSupply && instance.balanceOf && instance.transfer && instance.transferFrom && instance.approve && instance.allowance);
            }
        );
    });

    it("Check totalSupply()", function(){
        return SPT.deployed('0xC0b4ec83028307053Fbe8d00ba4372384fe4b52B',
        '0x959FD7Ef9089B7142B6B908Dc3A8af7Aa8ff0FA1').then(
            function(instance){
                return instance.totalSupply.call();
            }
        ).then(function(result){
            assert.equal(result, 100000000000000);
        })
    })

    it("Check transfer token", function(){
        // var meta;
        // var account_one = accounts[0];

        // var account_two = accounts[1];
      
        // var account_tree = accounts[2];
        // var amount = 100000000;
        var meta;
        
            // Get initial balances of first and second account.
            var account_one = accounts[0];
            var account_two = accounts[1];
            var account_tree = accounts[2];
            console.log("account_two", typeof(account_two));
        
            var account_one_starting_balance;
            var account_two_starting_balance;
            var account_one_ending_balance;
            var account_two_ending_balance;
        
            var amount = 10;

        // return SPT.deployed(account_one,
        //     account_two).then(
        //     function(instance){
        //         meta = instance;
        //         // var trasferToAddress = instance.transfer.call();
        //         // var balanceOfAddress = instance.balanceOf.call('0x4E90a36B45879F5baE71B57Ad525e817aFA54890');
        //         return meta.transfer.call(account_tree, amount,{from: account_two});
        //     }
        // ).then(
        //     function(result){
        //         assert(result, true);
        //     }
        // );

        return SPT.deployed(account_one,account_two).then(function(instance) {
            meta = instance;
            return meta.balanceOf.call(account_one);
          }).then(function(balance) {
            account_one_starting_balance = balance.toNumber();
            return meta.balanceOf.call(account_two);
          }).then(function(balance) {
            account_two_starting_balance = balance.toNumber();
            return meta.transfer(account_two, amount, {from: account_one});
          }).then(function() {
            return meta.balanceOf.call(account_one);
          }).then(function(balance) {
            account_one_ending_balance = balance.toNumber();
            return meta.balanceOf.call(account_two);
          }).then(function(balance) {
            account_two_ending_balance = balance.toNumber();
      
            assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
            assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
          });
        
    })

    
   
})