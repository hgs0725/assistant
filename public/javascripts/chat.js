import Axios from 'axios';


const Chat = (function () {
    const myName = "User";

    // init 함수
    function init() {
        // enter 키 이벤트
        $(document).on('keydown', 'div.input-div textarea', function (e) {
            if (e.keyCode == 13 && !e.shiftKey) {
                e.preventDefault();
                const message = $(this).val();

                // 메시지 전송
                sendMessage(message);
                textQuery(message);
                var scrollingElement = (document.scrollingElement || document.body);
                scrollingElement.scrollTop = scrollingElement.scrollHeight;
                // 입력창 clear
                clearTextarea();
            }
        });
    }

    // 메세지 태그 생성
    function createMessageTag(LR_className, senderName, message) {
        // 형식 가져오기
        let chatLi = $('div.chat.format ul li').clone();

        // 값 채우기
        chatLi.addClass(LR_className);
        chatLi.find('.sender span').text(senderName);
        chatLi.find('.message span').text(message);

        return chatLi;
    }

    // 메세지 태그 append
    function appendMessageTag(LR_className, senderName, message) {
        const chatLi = createMessageTag(LR_className, senderName, message);

        $('div.chat:not(.format) ul').append(chatLi);

        // 스크롤바 아래 고정
        $('div').scrollTop($('div')[0].scrollHeight);
    }

    // 메세지 전송
    function sendMessage(message) {
        // 서버에 전송하는 코드로 후에 대체
        data = {
            senderName : 'User',
            message : message
        }
        // 통신하는 기능이 없으므로 여기서 receive
        resive(data);
    }

    const textQuery = async (text) => {

        //  First  Need to  take care of the message I sent     
        let conversation = {
            senderName: 'user',
            content: {
                text: {
                    text: text
                }
            }
        }


        // We need to take care of the message Chatbot sent 
        const textQueryVariables = {
            text
        }
        
            const response = await Axios.post('/api/dialogflow/textQuery', textQueryVariables)
            console.log(response);

            //for (let content of response.data.fulfillmentMessages) {

                conversation = {
                    senderName: 'bot',
                    text: response.data.fulfillmentText
                }
                resive(conversation);
           // }


    }
    // 메세지 입력박스 내용 지우기
    function clearTextarea() {
        $('div.input-div textarea').val('');
    }

    // 메세지 수신
    function resive(data) {
        const LR = (data.senderName != myName) ? "right" : "left";
        appendMessageTag(LR, data.senderName, data.message);
    }

    return {
        'init': init
    };
})();

$(function () {
    Chat.init();
});

