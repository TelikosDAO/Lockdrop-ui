
<template>
    <div class='page' >
                                     
        <div class='trow'>
            <th>Locked in Block #</th>
            <th class='longText d-md-table-cell'>Eth</th>
            <th>Duration</th>
            <th class='longText d-md-table-cell'>Remaining</th>
        </div>
        <div class='trow d-md-none secondary'>
            <th>Eth</th>
            <th>Remaining</th>
        </div>            
        <div v-for='tx in pages'>
        <div class='trow'>
            <td>#{{tx.blockNumber}}</td>
            <td class='longText d-md-table-cell'><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 417" preserveAspectRatio="xMidYMid"><path fill="#343434" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"/><path fill="#8C8C8C" d="M127.962 0L0 212.32l127.962 75.639V154.158z"/><path fill="#3C3C3B" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"/><path fill="#8C8C8C" d="M127.962 416.905v-104.72L0 236.585z"/><path fill="#141414" d="M127.961 287.958l127.96-75.637-127.96-58.162z"/><path fill="#393939" d="M0 212.32l127.96 75.638v-133.8z"/></svg> {{displayWei(tx.returnValues.eth)}}</td>
            <td>{{tx.returnValues.duration}} day{{plural(tx.returnValues.duration)}}</td>
            <td class='longText d-md-table-cell'>{{tx.returnValues.remaining}} day{{plural(tx.returnValues.remaining)}}</td>
        </div>
        <div class='trow d-md-none secondary'>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 256 417" preserveAspectRatio="xMidYMid"><path fill="#343434" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"/><path fill="#8C8C8C" d="M127.962 0L0 212.32l127.962 75.639V154.158z"/><path fill="#3C3C3B" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"/><path fill="#8C8C8C" d="M127.962 416.905v-104.72L0 236.585z"/><path fill="#141414" d="M127.961 287.958l127.96-75.637-127.96-58.162z"/><path fill="#393939" d="M0 212.32l127.96 75.638v-133.8z"/></svg> {{displayWei(tx.returnValues.eth)}}</td>
            <td>{{tx.returnValues.remaining}} day{{plural(tx.returnValues.remaining)}}</td>
        </div>  
        </div>
        
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'


export default {
  name: "yourpages",
        props:[
            'pages',

        ],
        data: function() {
            return {
                mytx: []
            }
        },
        methods: {
            displayAddr: function(addr) {
                return window.web3.displayAddr(addr)
            },
            displayWei: function(val) {
                return window.web3.displayWei(val)
            },
            plural: function(val) {
                if(val > 1)
                    return 's'
                return ''
            }

        }
};

</script>
<style scoped>
    tr {
        width: 100% !important;
        min-width: 100% !important;
    }
    .trow {
        display: flex;
        justify-content: space-around;
    }
    .page {
        max-height: 70vh;
        overflow: scroll;
    }
    .secondary > td {
        padding-top: 0;
        border-bottom: 1px solid black;
    }
    .secondary > th {
        padding-top: 0;
        border-bottom: 1px solid black;
    }      
</style>

