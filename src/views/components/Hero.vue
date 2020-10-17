<template>
    <section class="section-hero section-shaped my-0">
        <div class='shape-primary-secondary'>
        <div class="shape shape-style-1 shape-primary">

        </div>
        <div class="container shape-container d-flex align-items-center">

            <div class="col px-0">
                <div class="row justify-content-center align-items-center">
                    <div class="text-center pt-lg div-logo">
                        <img class='img-logo' src='/logo.png' />
                    </div>

                    <div class="text-center pt-lg logo">
                        Telikos
                        <p class="lead countdown shadow mt-4 mb-5" v-if='!hasStarted()'><span class='counttitle'>Lockdrop starts in</span> <span class='digit' v-if='days > 0'>{{days}}d </span> <span class='digit'>{{hours}}h</span> <span class='digit'>{{minutes}}m</span> <span class='digit'>{{seconds}}s</span></p>
                        <p class="lead countdown shadow mt-4 mb-5" v-else><span class='counttitle'>Lockdrop Ending </span><span class='digit' v-if='days > 0'>{{days}}d<span class='digit'> {{hours}}h</span><span class='digit'> {{minutes}}m</span><span class='digit'> {{seconds}}s</span></span></p>
                    </div>
                </div>
                <div class="row justify-content-center align-items-center">
                    <div class="text-center pt-lg depad">                
                        <p>Ethereum Locked</p>
                        <p><ICountUp :endVal=EthLocked></ICountUp></p>
                        <p>Telikos Awarded</p>
                        <p><ICountUp :endVal=TekAwarded></ICountUp></p>
                        <div class="btn-wrapper">
                            <base-button tag="a"
                                         href="#lockdrop"
                                         class="mb-3 mb-sm-0 bg-gradient-tek"
                                         icon="fa fa-lock">
                                Lock Up Etherum
                            </base-button>
                        </div>
                    </div>
                </div>
                <div class="row align-items-center justify-content-around stars-and-coded">
                    <div class="col-sm-4">
                        <span class="text-white alpha-7 ml-3">Star us on</span>
                        <a href="https://github.com/TelikosDAO" target="_blank" title="Support us on Github">
                            <img src="img/brand/github-white-slim.png" style="height: 22px; margin-top: -3px">
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </section>
</template>
<script>

import moment from 'moment'
import ICountUp from 'vue-countup-v2';
export default {
    name: 'Hero',
    props: ['eth', 'tek', 'start', 'end'],
    components: {
      ICountUp
    },    
    data: function() {
        return {    days: 0,
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                }
    },
    created() {
            window.setInterval(() => {
                this.updateCountdown()
            }, 1000);
    },    
    methods : {
        updateCountdown: function() {
            let now = moment();
            let exp = moment.unix(this.start);
            if(this.hasStarted())
            {
                exp = moment.unix(this.end);
            }
            this.days = exp.diff(now, 'days').toString().padStart(2, '0');
            this.hours = exp.subtract(this.days, 'days').diff(now, 'hours').toString().padStart(2, '0');
            this.minutes = exp.subtract(this.hours, 'hours').diff(now, 'minutes').toString().padStart(2, '0');
            this.seconds = exp.subtract(this.minutes, 'minutes').diff(now, 'seconds').toString().padStart(2, '0');
        },
        hasStarted: function() {
            let now = moment();
            let exp = moment.unix(this.start);
            return exp.diff(now, 'seconds') < 0
        },
        displayWei : function(wei) {
            return window.web3.displayWei(wei)
        }
    },
    computed: {
        EthLocked: function() {
            return parseInt(window.web3.displayWei(this.eth))
        },
        TekAwarded: function () {
            return parseInt(window.web3.displayWei(this.tek))
        },
    },

};
</script>
<style>
    .longText {
        display: none !important;
    }
     
</style>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins');
    .countdown {
        background: radial-gradient(ellipse at top, #000000, rgba(0, 0, 0, 0.5)),
            radial-gradient(ellipse at bottom, #000000, transparent);
        padding: 5px;
        color: #39ff14;
        font-size: 23pt;
   }
    .shadow {
        -webkit-box-shadow: 0 1px 10px rgba(174, 69, 155, 1), 0 1px 5px rgba(255, 225, 255, 0.3) !important;
        box-shadow: 0 1px 10px rgba(174, 69, 155, 1), 0 1px 5px rgba(255, 255, 255, 0.3) !important;
    }    
    .counttitle, .countnums {
        display: block;
        width: 100%;
    }
    .counttitle {
        font-size: 12pt;
    }
    .countnums {
        font-family: Poppins,Avenlr,Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Arial,sans-serif;
    }
    .depad {
        padding-top: 20px !important;
    }
    .depad > p {
        font-family: 'Zekton';
        font-size: 14pt;
        color: white !important;
        border: 1px solid white;
        width: 45vw;
        margin: 0 auto 0 auto;
        padding: 5px;
        height: 2.5rem;
        background: radial-gradient(ellipse at top, #000000, transparent),
            radial-gradient(ellipse at bottom, #000000, transparent);        

    }
    .digit {
        display: inline-block;
        min-width: 4rem;
        font-size: 14pt;
    }
    .shape-primary {
        background: radial-gradient(ellipse at top, #000000, rgba(0, 0, 0, 0.1)),
             url('/splash.png') !important;
        background-size:contain;
    }
    .shape-primary-secondary {
                background: rgba(0,0,0,.3) !important;
                height: 100vh;
                
    }
    .logo {
        font-size: 66.6px;
        font-family: Olga;
        font-stretch: 100%;
        font-weight: 600;
        color:white;
        letter-spacing: 7.33333px;
        padding: 2rem !important;
        padding-bottom: 0 !important;
        padding-left: 0px !important;
        padding-right: 0px !important;
        border-bottom: 1px solid white;
        border-top: 1px solid white;
        width: 95%;
        margin-top: 20px;
    }
    .img-logo {
        max-width: 150px;
    }
    .div-logo {
        padding-top: 0px !important;
    }
    .logo > p {
        font-family: 'Zekton';
        font-size: 12pt;
        margin-top: 15px !important;
    }
    .btn-wrapper {
        margin-top: 20px;
    }
</style>
