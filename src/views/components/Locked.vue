<template>
    <section class="section section-components pb-0" id="section-components">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-12">
                    <!-- Basic elements -->
                    <h2 class="mb-5">
                        <span>Locked Ethereum</span>
                    </h2>
                    <tabs fill class="flex-column flex-md-row">
                        <card shadow slot-scope="{activeTabIndex}">
                            <tab-pane key="tab1">
                                <template slot="title">
                                    <i class="ni ni-cloud-upload-96 mr-2 bg-gradient-tek"></i>Globally Locked Ethereum
                                </template>

                                <p class="description">
                                    <h3 class='text-center'>Total Locked</h3>
                                    <h4 class='text-center'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 256 417" preserveAspectRatio="xMidYMid"><path fill="#343434" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"/><path fill="#8C8C8C" d="M127.962 0L0 212.32l127.962 75.639V154.158z"/><path fill="#3C3C3B" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"/><path fill="#8C8C8C" d="M127.962 416.905v-104.72L0 236.585z"/><path fill="#141414" d="M127.961 287.958l127.96-75.637-127.96-58.162z"/><path fill="#393939" d="M0 212.32l127.96 75.638v-133.8z"/></svg>{{GlobalEth}}ETH</h4>
                                    <div class='table'>
                                        <Pagination :pages=locks>
                                        </Pagination>
                                    </div>

                                </p>
                            </tab-pane>

                            <tab-pane key="tab2">
                                <template slot="title">
                                    <i class="ni ni-lock-circle-open mr-2 bg-gradient-tek"></i>Your Locked Ethereum
                                </template>

                                <p class="description">
                                    <div class='table'>
                                        <MyPages :pages=yourLocks>
                                        </MyPages>
                                    </div>
                                </p>
                            </tab-pane>
                        </card>
                    </tabs>                    
                </div>
            </div>
        </div>
    </section>

</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from './Pagination.vue';
import MyPages from './YourPages.vue'
import Tabs from "@/components/Tabs/Tabs.vue";
import TabPane from "@/components/Tabs/TabPane.vue";
export default {
    name: 'locked',
    props: ['ethLocked', 'locks', 'yourLocks'],
    components: {
        Tabs,
        TabPane,
        Pagination,
        MyPages,
    },
    data: function () {
        return {
        }
    },
    methods: {
    },        
    computed: {
        GlobalEth: function() {
            return window.web3.displayWei(this.ethLocked)
        }
    }
};
</script>
<style>
.nav-link.active {
    background: linear-gradient(87deg, #812ae5 0, #148176 100%) !important;    
}
.nav-pills .nav-link > div > .ni {
    color:white !important;

}
<style scoped>
    table {
        text-align: center;
    }
    h2 > span {
        color:white;
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
