<template>
    <section class="section section-components pb-0" id="lockdrop">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <!-- Basic elements -->
                    <h2 class="mb-5">
                        <span>Telikos Initial DAO Lockdrop</span>
                    </h2>
                    <card shadow ><p>This will lockup your Ethereum in a Smart Contract for the amount of time you set. After which, a form will appear to unlock your Eth, or you can send 0ETH to the contract holding it, anytime after expiration from the wallet address you locked it up from.</p>
                    <p class='text-danger'>Please note. We never hold your Ethereum, and have no way to unlock it. The only way to unlock your Ethereum is to send 0Eth to the contract from the wallet address you originally locked it up from.</p>
                    <p>You must use a web3 enabled browser like Brave, or have Metamask installed to use this site.</p>
                    <p>We are using a modified version of the <a href='https://lockdrop.plasmnet.io/#/'>Plasm Lockdrop</a> smart contracts.
                    <hr />
                    <div class='row'>
                        <div class="col-lg-6 col-sm-6">
                            <label>Ethereum to Lockup</label> <span class='float-right'>Balance<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 417" preserveAspectRatio="xMidYMid"><path fill="#343434" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"/><path fill="#8C8C8C" d="M127.962 0L0 212.32l127.962 75.639V154.158z"/><path fill="#3C3C3B" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"/><path fill="#8C8C8C" d="M127.962 416.905v-104.72L0 236.585z"/><path fill="#141414" d="M127.961 287.958l127.96-75.637-127.96-58.162z"/><path fill="#393939" d="M0 212.32l127.96 75.638v-133.8z"/></svg><span class='text-primary font-weight-bold '><u><span class='balance' @click='maxStake()'>{{displayBalance(balance)}}</span></u></span></span>
                            <base-input
                                        placeholder="0.0000000" v-model=stake :valid=properWei>
                            </base-input>
                            <base-slider v-model="slider"></base-slider>

                        </div>
                    
                        <div class='col-lg-6 col-sm-6'>
                            <label>Duration</label>
                            <select class='form-control' v-model=days>
                                <option value=30 selected>30 Days</option>
                                <option value=45 selected>45 Days</option>
                                <option value=60>60 Days</option>
                                <option value=90>90 Days</option>
                                <option value=120>120 Days</option>
                                <option value=180>180 Days</option>
                            </select>
                        </div>
                    </div>
                    <div class='row'>
                        <div class="col-lg-8 col-sm-12">
                            <label>Estimated Telikos</label>
                            <base-input alternative v-model=reward
                                        placeholder="12213.12112">
                            </base-input>

                        </div>
                    </div>
                    <base-button class='btn-primary btn-block bg-gradient-tek' icon='fa fa-rocket mr-2' @click='attainTek()' :disabled=disabled>Attain Telikos</base-button>                        
                   </card>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'EthLockdrop',
    props: ['account', 'contract', 'balance', 'start', 'end'],
    created() {
        window.setInterval(() => {
                this.updateDisabled()
            }, 900);
    },
    data: function() { return  {
            slider: 0,
            stake: '',
            accounts: {},
            noslide: false,
            nostake: false,
            days: 30,
            reward: 0,
            disabled: false,
            properWei: false,
        }
    },
    watch: {
        slider: async function() {
            var balance
            if(!this.account)
                return
            balance = await window.web3.eth.getBalance(this.account)
            balance = parseInt(balance * (this.slider / 100))
            
            balance = window.web3.utils.fromWei(balance.toString())
            this.noslide = true;
            if(!this.nostake)
                this.stake = balance
            else
                this.nostake = false
        },
        stake: async function(val) {
            let balance = await window.web3.eth.getBalance(this.account)
            var percentage, wei, weit;
            wei = parseInt(balance)
            weit = parseInt(window.web3.utils.toWei(this.stake))
            balance = window.web3.utils.fromWei(balance.toString())
            percentage = parseInt(( val / balance) * 100)
            percentage = Math.min(100, percentage)
            this.nostake = true;
            this.calculateReward()
            if(weit && weit > 0 && weit <= wei) {
                this.properWei = true
            }
            else {
                this.properWei = false
            }
            if(!this.noslide)
                this.slider = percentage
            else
                this.noslide = false;
        },
        days: function() {
            this.calculateReward();
        }
    },
    computed: {
        ...mapGetters([
            'ABI',
        ])        
    },
    methods: {
        maxStake: async function() {
            let balance = await window.web3.eth.getBalance(this.account)
            balance = window.web3.utils.fromWei(balance.toString())
            this.stake = balance
            this.$emit('balance', balance)            
        },
        calculateReward: async function () {
            let reward = await this.contract.methods.calculateReward(web3.utils.toWei(this.stake.toString()), this.days).call();
            if(reward)
                this.reward = web3.utils.fromWei(reward);
        },
        attainTek: async function() {
            let blockHeight = await web3.eth.getBlock("latest").number
            let getData = web3.eth.abi.encodeFunctionCall(  {   "inputs": [
                                                                {
                                                                    "internalType": "uint256",
                                                                    "name": "_days",
                                                                    "type": "uint256"
                                                                }
                                                                ],
                                                                "name": "lock",
                                                                "outputs": [],
                                                                "stateMutability": "payable",
                                                                "type": "function"
                                                            }, [this.days])
            this.contract.once('Locked', { filter: { lock: this.account }, fromBlock: blockHeight }, this.lockWait);            
            web3.eth.sendTransaction({to: this.contract.options.address, from: this.account, value: web3.utils.toWei(this.stake), gas: 200000, data: getData})
                                 .on('error', this.handleError)
                                 .on('transactionHash', this.recordHash)
                                 .on('receipt', this.handleReceipt)
            this.setPending(true)            
        },
        lockWait: async function(error, event) {
            let eth =  event.returnValues.eth
            let tek = event.returnValues.tek
            let addr = event.returnValues.lock
            let dur = event.returnValues.duration
            let balance = await window.web3.eth.getBalance(this.account);

            this.addMessage('You locked up <span style="color:white">' + window.web3.displayWei(eth) + 'ETH</span> in <a href="https://etherscan.io/address/' + addr +'/">' + window.web3.displayAddr(addr) + '</a> for ' + dur + ' days, and recieved <span style="color:white">' + window.web3.displayWei(tek) + 'TEK</span> in <a href="https://etherscan.io/address/' + this.account +'/">' + window.web3.displayAddr(this.account) + '.')
            this.days = 30
            this.reward = 0
            this.stake = 0
            this.$emit('Balance', balance)
            this.setPending(false)            
        },
        displayBalance: function(bal) {
            return window.web3.displayWei(bal)
        },
        updateDisabled: function() {
            var now = Math.floor(Date.now() / 1000)
            this.disabled = false            
            if(now > this.end)
                this.disabled = true
            if(now < this.start)
                this.disabled = true
            if(!this.account)
                this.disabled = true
            if(!this.properWei)
                this.disabled = true
        },
        handleError(err, tx) {
            console.log(err)
            console.log(tx)
            if(err.code == 4001)
                this.addMessage("Metamask rejected the transaction.")
            else
                this.addMessage("An error occured.")
            this.setPending(false)            
        },
        recordHash(hash) {
            this.$emit('tx', hash)
        },
        handleReceipt(hash) { 
            console.log(hash)
        },
        ...mapMutations([
            'setPending', 'addMessage',
        ]),          
    }
}

</script>
<style>
 svg {
     margin-bottom: 5px;
 }
</style>

<style scoped>
    .balance {
        cursor: pointer;
    }
    .flashmsg {

    }
    .mb-5 {
        text-align:center;
    }
    .flashmsg
    {   position: fixed;
        top: 0;
        left: 0;
        padding: 10px;
        background-color: var(--dark);
        color: white;
    }
    .flash__close-button {
        border-radius: 66% !important;
    }
    h2 > span {
        color: white;
    }
</style>
