var contractAddress = '0xc7edf381de1507604ff430213c0211db0e808eb6';
var abi = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "arg",
                "type": "int256"
            }
        ],
        "name": "setX",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "arg",
                "type": "int256"
            }
        ],
        "name": "setY",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "add",
        "outputs": [
            {
                "name": "",
                "type": "int256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getContractAddress",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getX",
        "outputs": [
            {
                "name": "",
                "type": "int256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getY",
        "outputs": [
            {
                "name": "",
                "type": "int256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "subtract",
        "outputs": [
            {
                "name": "",
                "type": "int256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

var calculatorContract;
var calculator;

window.addEventListener('load', function () {
    if (typeof web3 !== 'undefined') {
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.log('No web3? You should consider trying MetaMask!')
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    startApp();
});

function startApp() {
    calculatorContract = web3.eth.contract(abi);
    calculator = calculatorContract.at(contractAddress);
    document.getElementById('contractAddr').innerHTML = getLink(contractAddress);
    web3.eth.getAccounts(function (e, r) {
        document.getElementById('accountAddr').innerHTML = getLink(r[0]);
    });

    getValue();
}

function getLink(addr) {
    return '<a target="_blank" href=https://ropsten.etherscan.io/address/' + addr + '>' + addr + '</a>';
}

function getValue() {
    calculator.getX(function (e, r) {
        document.getElementById('valX').innerHTML = r.toNumber();

    });
    calculator.getY(function (e, r) {
        document.getElementById('valY').innerHTML = r.toNumber();
    });
}

function setValue(isX) {
    var from = isX ? 'inputX' : 'inputY';
    var newValue = document.getElementById(from).value;

    if (isX) {
        calculator.setX(newValue, function (e, r) {
            alert('Transaction 요청 완료 : ' + r);
        });
    }
    else {
        calculator.setY(newValue, function (e, r) {
            alert('Transaction 요청 완료 : ' + r);
        });
    }

    var filter = web3.eth.filter('latest');
    filter.watch(function (e, r) {
        getValue();
    });
}

function add() {
    calculator.add(function (e, r) {
        document.getElementById('result').innerHTML = r.toNumber();
    })
}

function subtract() {
    calculator.subtract(function (e, r) {
        document.getElementById('result').innerHTML = r.toNumber();
    })
}