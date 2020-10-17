<template>
    <div class='fixed-top account'>
        <div class='row'>
            <div class='col-md-5 offset-md-6 col-sm-12'>
                <transition-group name="popIn" tag='div'>                
                <div class='message' v-for="(msg, index) in messages" :key="msg">
                    <span v-html=msg></span>
                    <button @click='markRead($event, index)' class='closeBtn'>x</button>
                </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: "flashmessage",
    data: function() {
        return {
            messages: [],

        }
    },
    created() {
        this.updateMessages()
        window.setInterval(() => {
                this.updateMessages()
            }, 1000);
    },
    computed: {
        ...mapGetters([
            'Messages',
        ])        
    },    
    methods: {
       updateMessages() {
            let newmsg = this.Messages.pop()
            while(newmsg)
            {   this.messages.push(newmsg)
                newmsg = this.Messages.pop()
            }
       },
       markRead: function(event, index) {
           if(this.messages.length <= 1)
                this.messages = []
            else
                this.messages.splice(index,1)
            event.target.classList.toggle('pending')                
       },
        ...mapMutations([
            'addMessage'
        ])
    }
};

</script>
<style scoped>
    .message {
        width: 100%;
        padding: 15px;
        margin-left:10px;
        margin-right: 10px;
        background-color: var(--dark);
        margin-top: 2px;

    }
    .closeBtn {
        all: unset;
        float: right;
        border-radius: 50%;
        background-color:black;
        color:white;
        box-shadow: none;
        padding: 5px;
        width: 1em;
        height: 1em;
        text-align: center;
        vertical-align: middle;
        line-height: 1em;
    }

    .popIn-enter-active {
        animation: pop-in 2s;
    }
    .popIn-leave-active {
        animation: pop-in 2s reverse;
    }
    @keyframes pop-in {
    0% {
        right: 200%;
        }
    50% {
        right: 50%;
    }
    100% {
        right:0;
    }
    }
</style>
