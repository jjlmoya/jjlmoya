<template>
    <div class="chat-content">
        <div class="chat-content__heading">
            <div class="chat-content__image">
                <img src="https://scontent.fpmi3-1.fna.fbcdn.net/v/t1.6435-1/p320x320/78802274_2636002596447411_6878993129362423808_n.jpg?_nc_cat=108&ccb=1-3&_nc_sid=7206a8&_nc_ohc=nvLxWf9ztDMAX8K-m_V&_nc_ht=scontent.fpmi3-1.fna&oh=0f6f783b4195065fecdb25b4a23f7e8c&oe=60F75E96">
            </div>
            <div class="chat-content__claim">
                <div class="chat-content__claim-title">
                    jjlmoya
                </div>
                <div class="chat-content__claim-subtitle">
                    ¿Puedo ayudarte en algo?
                </div>
            </div>
            <span class="u-pointer far fa-times" @click="$emit('close')"></span>
        </div>
        <div ref="body" class="chat-content__body">
            <Message 
                v-for="(msg,i) in messages"
                :key="i"
                :sender="msg.sender"
                :message="msg.text"
            />
            <Responses
                v-for="(msg,i) in questions"
                :key="i"
                :message="msg"
                @response="addQuestion"
            />
        </div>
    </div>
</template>

<script>
    import { ref, onMounted, watch } from 'vue'
    import Message from '@/components/Core/Chat/Message.vue'
    import Responses from '@/components/Core/Chat/Responses.vue'
    import { defaultMessages, getQuestionByMessage, getMessageByQuestion } from '@/services/messages'
    export default {
        components: {
            Message,
            Responses,
        },
        emits: ['close'],
        setup() {
            const body = ref(null)
            const messages = ref([])
            const questions = ref([])
            const lastMessage = ref({})
            const pile = ref([])
            const scroll = () => {
                body?.value?.scrollTo(0, body?.value?.scrollHeight + 300)
            }

            const addQuestion = (msg) => {
                messages.value.push({...msg, sender:false})
                questions.value = []
                loadMessages(getMessageByQuestion(msg))
            }
            onMounted(() => {
                scroll()
            })
            const popMessage = () => {
                lastMessage.value = pile.value.shift()
                messages.value.push(lastMessage.value)
                loadMessages()
                setTimeout(scroll, 100)
            }
            const loadMessages = (messages = []) => {
                if (messages?.length) {
                    pile.value = messages
                }
                if(pile.value.length) {
                    setTimeout(popMessage, 1000)
                } else {
                    loadQuestions()
                }
            }

            const loadQuestions = () => {
                questions.value = getQuestionByMessage(lastMessage.value)
                setTimeout(scroll, 50)
            }

            loadMessages(defaultMessages)
            return {
                body,
                messages,
                questions,
                addQuestion
            }
        }
    }
</script>

<style lang="postcss">
  .chat-content {
    height: em(600px);
    width: em(350px);
    background-color: #222;
    color: var(--color-white);
    border-radius: 5px;
    overflow: hidden;

    &__image,
    img {
      height: 50px;
      width: 50px;
      border-radius: 50%;
      overflow: hidden;
      object-fit: cover;
    }

    &__heading {
      height: 80px;
      background-color: #323232;
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
      grid-gap: 20px;
      padding: 20px;
    }

    &__claim {
      display: grid;
      grid-gap: 5px;

      &-title {
        font-weight: bold;
      }

      &-subtitle {
        font-size: em(12px);
      }
    }

    &__body {
      height: em(600px);
      padding-bottom: 100px;
      overflow-y: scroll;
    }

    /** */
  }
</style>