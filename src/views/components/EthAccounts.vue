<template>
    <div class='fixed-bottom account'>
        <div class='row text-right'>
            <div class='offset-sm-8 col-sm-2 offset-md-9 col-sm-3'>
                <span class='details shadow' @click='getAccount()'>{{displayAddr(account)}}</span>
                <span class='status' @click='getAccount()' :class='[pending, isconnected]' ><svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 256 417" preserveAspectRatio="xMidYMid"><path fill="#343434" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"/><path fill="#8C8C8C" d="M127.962 0L0 212.32l127.962 75.639V154.158z"/><path fill="#3C3C3B" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"/><path fill="#8C8C8C" d="M127.962 416.905v-104.72L0 236.585z"/><path fill="#141414" d="M127.961 287.958l127.96-75.637-127.96-58.162z"/><path fill="#393939" d="M0 212.32l127.96 75.638v-133.8z"/></svg></span>            
            </div>
        </div>

        <modal :show.sync="modal"
                gradient="tek"
                modal-classes="modal-danger modal-dialog-centered">
            <h6 slot="header" class="modal-title" id="modal-title-notification">Please Select Your Account</h6>

            <div v-for='acnt in accounts' :key=acnt class='text-center'>
                    <input type='radio' name='account' :value=acnt :id=acnt v-model=selected style='display:none;' /><label :for=acnt>{{displayAddr(acnt)}}</label>
            </div>
            <hr />
            <div>
                <p class='text-white'>Pending Transactions</p>
                <a class='tx' v-for='tx in pendingTxs' :key=tx :href='"https://ropsten.etherscan.io/tx/" + tx'>{{displayAddr(tx)}} <i class="fa fa-external-link"></i></a>
            </div>
            <template slot="footer">
                <base-button type="link"
                                text-color="white"
                                class="ml-auto"
                                @click="modal = false">
                    Close
                </base-button>
            </template>
        </modal>
    </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import { mapMutations, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: "ethaccounts",
  props: ['accounts', 'account', 'contract', 'pendingTxs'],
  components: {
    Modal
  },
    data: function() {
        return {
            status: "Connect",
            isconnected:'',
            pclass: '',
            modal: false,
            selected: false,
        }
    },
    model: {
        event: ['accounts', 'account']
    },
    computed: {
        pending: function (){
            if(this.Pending)
                return "pending"
            return ""
        },
        ...mapGetters([
            'Pending'
        ])        
    },
    watch: {
        selected: function(val) {
            if(val)
                this.selectAccount(val)
        }
    },
    methods: {
        getAccount: async function() {
            await window.web3.eth.requestAccounts(this.emitAccounts)
            this.selected=false            
            this.modal = true
        },
        emitAccounts: function(err, accounts) {
            this.$emit('accounts', accounts)
        },
        selectAccount: async function(account, event) {
            this.$emit('account', account)
            this.modal = false
            this.isconnected = 'connected'
        },
        displayAddr: function(addr) {
            if(!addr)
                return "Connect"
            return window.web3.displayAddr(addr)
        },
        togglePending: function() {
            this.pending = !this.pending
            if(this.Pending)
                this.pclass = 'pending'
            else
                this.pclass = ''
        },
    }
};

</script>
<style>
    .pending {
        animation: rotate 2s infinite linear;
        border-collapse: separate;
        border-spacing: 15px;

        padding-left: 5px;
    }
    @keyframes rotate {
        0% {    border-top: 3px solid green;
                border-right: 3px solid white;
                border-bottom: 3px solid green;
                border-left:3px solid white;
            }
        25% {    border-top: 3px solid white;
                border-right: 3px solid green;
                border-bottom: 3px solid white;
                border-left: 3px solid green;
            }       
        50% {    border-top: 3px solid green;
                border-right: 3px solid white;
                border-bottom: 3px solid green;
                border-left:3px solid  white;
            }
        75% {    border-top: 3px solid white;
                border-right: 3px solid green;
                border-bottom: 3px solid white;
                border-left:3px solid green;
            }                        
        100% {  border-top: 3px solid green;
                border-right: 3px solid white;
                border-bottom: 3px solid green;
                border-left:3px solid white;
            }            
    }
    .bg-gradient-tek {
        background: linear-gradient(87deg, #812ae5 0, #148176 100%) !important;    
    }
    .footer.has-cards:before
    {
            background: linear-gradient(87deg, #812ae5 0, #148176 100%) !important;
    }
</style>
<style scoped>
    label {
        display: block;
        border: 1px solid #39ff14;
        padding: 15px;
        border-radius: 20px;
    }
    input[type="radio"]:checked+label {
        background-color:white;
    }


    .account {
        bottom: 100px;
        color:black;

    }
    .shadow {
        -webkit-box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
        box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07) !important;
    }
    .status {
        border-top: 3px solid red;
        border-right: 3px solid red;
        border-bottom: 3px solid red;
        border-left:0px;
        border-radius: 90%;
        padding: 6px;
        padding-top: 12px;
        padding-bottom: 12px;
        margin-right:10px;
        background-color: white;
        cursor: pointer;
        min-height: 50px;
    }
    .connected{
        border-top: 3px solid greenyellow;
        border-right: 3px solid greenyellow;
        border-bottom: 3px solid greenyellow;
        
    }    
    .details {
        line-height: 50px;
        padding: 15px;
        background-color:rgba(255,255,255, 0.21);        
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
        cursor: pointer;
        margin-right:-25px;
        padding-right: 35px;
    }
    .tx {
        color: white;
    }

</style>
