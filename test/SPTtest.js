var SPT = artifacts.require("StepanToken2");


contract("Testing ERC20 Contract", function(){

    //check deploy contract
    it("Deploy contract whit two parameters", function(){
        return SPT.deployed('0xC0b4ec83028307053Fbe8d00ba4372384fe4b52B','0x959FD7Ef9089B7142B6B908Dc3A8af7Aa8ff0FA1');
    });

    //check on ERC20 compatiblity
    it("Current token compitibility with ERC20", function(){
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

    
   
})