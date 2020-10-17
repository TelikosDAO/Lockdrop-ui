<template>
    <div>
        <Hero :eth=ethLocked :tek=tekAwarded :start=startTime :end=endTime></Hero>
        <EthLockdrop :account=account :contract=contract :balance=balance :start=startTime :end=endTime
                     v-on:Balance=setBalance
                     v-on:tx=handleTx></EthLockdrop>
        <span v-if=hasUnlockables>
          <EthUnlock :unlockables=unlockables :account=account></EthUnlock>
        </span>
        <locked :ethLocked=ethLocked :locks=globalLocks :yourLocks=accountLocks></locked>
        <EthAccounts v-on:unlockables=appendUnlockable
                     v-on:accounts=setAccounts
                     v-on:account=setAccount
                     v-on:Balance=setBalance
                    :account=account
                    :accounts=accounts
                    :contract=contract
                    :pendingTxs=pendingTxs

        ></EthAccounts>
        <FlashMessage></FlashMessage>
    </div>
</template>
<script>
import Hero from "./components/Hero";
import Locked from "./components/Locked.vue";
import EthLockdrop from "./components/EthLockdrop.vue";
import EthAccounts from "./components/EthAccounts.vue"
import FlashMessage from "./components/FlashMessage.vue"
import EthUnlock from './components/EthUnlock.vue'
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: "components",
  components: {
    Hero, Locked, EthLockdrop, EthAccounts, FlashMessage, EthUnlock,
  },
  created() {
      this.getContractData()
  },
  data: function() { 
    return {
      hasUnlockables: false,
      globalLocks: [],
      accountLocks: [],
      unlockables: [],
      pendingTxs: [],
      populated: false,
      tekAwarded: 0,
      ethLocked: 0,
      startTime: 0,
      endTime: 0,
      totalSupply: 0,
      contract: null,
      telikos: null,    
      accounts: [],
      account: null,
      balance: 0,
    }
  },
  computed: {
    ...mapGetters(['ABI', 'ContractAddr', 'TelikosABI', 'TelikosAddr', 'GenesisBlock'])
  },
    methods: {
      setAccounts: function(accounts) {
        this.accounts = accounts
      },
      setAccount: async function(account) {
          this.account = account
          this.balance = await window.web3.eth.getBalance(this.account);
          this.accountLocks.splice(0,this.accountLocks.length)

          for(const i in this.globalLocks)
          {   var lock = this.globalLocks[i];
              await this.addPersonalLock(lock)
          }
      },
      setBalance: function(balance) {
           this.balance = balance
      },
      handleTx: function(tx){
          this.pendingTxs.push(tx)
      },
      appendUnlockable: function(event) {
        this.canUnlock.push(event)
        this.hasUnlockables = true;
      },
      getContractData: async function() {
            this.contract = new window.web3.eth.Contract(this.ABI, this.ContractAddr);
            if(this.TelikosAddr == null)
              this.totalSupply = 0
            else {
              this.telikos = new window.web3.eth.Contract(this.TelikosABI, this.TelikosAddr);
              this.totalSupply = await this.telikos.methods.totalSupply().call();
            }
            this.startTime = await this.contract.methods.LOCK_START_TIME().call();
            this.endTime = await this.contract.methods.LOCK_END_TIME().call();
            await this.SubscribeToLocked()     
      },
      SubscribeToLocked: async function() {
          this.contract.events.Locked({fromBlock: this.GenesisBlock}, this.addLocked);
      },
      addLocked: async function(err, event) {
          if( event.returnValues )
          {   this.tekAwarded += parseInt(event.returnValues.tek)
              this.ethLocked += parseInt(event.returnValues.eth)
              this.globalLocks.unshift(event)
              if(this.account){
                await this.addPersonalLock(event, true)
              }
          }
      },
      addPersonalLock: async function(lock, prepend=false) {
          if(lock.returnValues.owner == this.account)
          {   var bal = await window.web3.eth.getBalance(lock.returnValues.lock)   
              lock.returnValues.remaining = await this.getRemaining(lock.blockNumber, lock.returnValues.duration)
              if(prepend)
                this.accountLocks.unshift(lock)
              else
                this.accountLocks.push(lock)
              lock.returnValues.eth = bal
              if(lock.returnValues.remaining <= 0)
              {   if( bal > 0)
                  {   this.unlockables.push(lock)
                      this.hasUnlockables = true
                  }
              }                  
          }        
      },
      getRemaining: async function(block, duration){
          var start = await web3.eth.getBlock(block)
          var end
          start = start.timestamp 
          end = start + (duration * 24 * 60 * 60) 
          end = moment.unix(end)
          return end.diff(moment(), 'days')
      },        
    }
};
</script>

<style>
    body {
        background: radial-gradient(farthest-corner at -640px 640px, #0C0316 0, #062B27 100%) !important;    
    }
</style>