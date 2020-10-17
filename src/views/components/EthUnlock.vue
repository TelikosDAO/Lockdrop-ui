<template>
    <section class="section section-components pb-0" id="section-components">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <!-- Basic elements -->


                    <h2 class="mb-5 bg-gradient-tek header">
                        <span>Unlock Ethereum</span>
                    </h2>
                    <div class='row'>
                        <div class="col-md-6"  v-for='e in unlockables'>
                            <card class='bg-gradient-tek unlockcard'>
                                <div  class='unlock'>
                                    <p><a :href='"https://ropsten.etherscan.io/address/" + e.returnValues.lock'>{{displayAddr(e.returnValues.lock)}}  <i class="fa fa-external-link"></i></a></p>
                                    <p class='eth'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 256 417" preserveAspectRatio="xMidYMid"><path fill="#343434" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"/><path fill="#8C8C8C" d="M127.962 0L0 212.32l127.962 75.639V154.158z"/><path fill="#3C3C3B" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"/><path fill="#8C8C8C" d="M127.962 416.905v-104.72L0 236.585z"/><path fill="#141414" d="M127.961 287.958l127.96-75.637-127.96-58.162z"/><path fill="#393939" d="M0 212.32l127.96 75.638v-133.8z"/></svg> {{displayWei(e.returnValues.eth)}}ETH</p>
                                </div>
                                <button @click='attainEth(e.returnValues.lock)' class='btn btn-primary btn-unlock'>Unlock</button>
                            </card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'ethunlock',
    props: ['unlockables', 'account',],    
    watch: {
    },
    computed: {
        ...mapGetters([
            'LockABI'
        ])        
    },
    methods: {
        attainEth: async function(addr) {
            let contract = new window.web3.eth.Contract(this.LockABI, addr);
            let blockHeight = await web3.eth.getBlock("latest").number
            web3.eth.sendTransaction({to: addr, from: this.account, value: 0, gas: 200000})
            //this.setPending(true)            
        },
        displayAddr: function(addr) {
            return window.web3.displayAddr(addr)
        },
        displayWei: function(val) {
            return window.web3.displayWei(val)
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
    .unlock {
        color: white;
        padding: 10px;
    }
    .unlock > p >  a {
        color:white;
    }
    .btn-unlock {
        margin-bottom: 45px !important;
    }
    h2 {
        color: white;
    }
    .header {
        text-align: center;
        padding: 15px;
        border-radius: 15px;
    }
    .unlockcard {
        margin: 20px;
        text-align:center;
    }
    .eth {
        font-size: 20pt;
    }
</style>
