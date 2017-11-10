var SPT = artifacts.require("StepanToken2");


contract("Testing ERC20 Contract", function(){

    
    it("Deploy contract", function(){
        assert(TestContract.deployed());
    })
})