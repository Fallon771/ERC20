App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7575');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  // Get the contract
  initContract: function() {
    $.getJSON("HelloWorld.json", function(helloworld) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.HelloWorld = TruffleContract(helloworld);
      // Connect provider to interact with contract
      App.contracts.HelloWorld.setProvider(App.web3Provider);
      return App.render();
    });
  },
  render: function() {
    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
        $("#head").html("head: " + account);
      }
    });
  },

  readData: function() {
    var data = $('#userdata').val();
    var mess;
    App.contracts.HelloWorld.deployed().then(function(instance) {
      return instance.message().then(function(res){
        $("#userdata").html( res);
      }).then(function(result){
        console.log(result);
      });

    })
  },

  changeName: function() {
    var data = $('#userdata').val();
    var mess;
    var text;
    text = document.getElementById("usertext").value;
    console.log(text);
    App.contracts.HelloWorld.deployed().then(function(instance) {
      return instance.setName(text).then(function(res){
      })
    })
    location.reload();
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
