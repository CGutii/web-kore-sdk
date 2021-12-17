
import helpers from '../../../../../src/utils/helpers';
import KoreGraphAdapter from '../../../../../libs/KoreGraphAdapter';
import './lineChartTemplate.scss';
class LineChartTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.cwInstance.$;
        let helpersObj = new helpers();
        let chatWindowInstance = me.cwInstance;
        let _chatContainer = chatWindowInstance.config.chatContainer;
        if (msgData.message[0] && msgData.message[0].component && msgData.message[0].component.payload && msgData.message[0].component.payload.template_type == "linechart") {
            me.messageHtml = $(me.getTemplateString('linechartTemplate')).tmpl({
                'msgData': msgData,
                'helpers': helpersObj.helpers
            });

            me.bindEvents(msgData);
            return me.messageHtml;
        }
    }
    bindEvents(msgData: any) {
        let me: any = this;
        let $ = me.cwInstance.$;
        let helpersObj = new helpers();
        let chatWindowInstance = me.cwInstance;
        let _chatContainer = chatWindowInstance.config.chatContainer;
        KoreGraphAdapter.drawlineChartTemplate(msgData,me.messageHtml);

        setTimeout(() => {
            $('.chat-container').scrollTop($('.chat-container').prop('scrollHeight'));
            KoreGraphAdapter.handleChartOnClick();
        }, 200);
    }
    getTemplateString() {
        var linechartTemplate = '<script id="chat_message_tmpl" type="text/x-jqury-tmpl"> \
        {{if msgData.message}} \
            <li data-time="${msgData.createdOnTimemillis}" id="${msgData.messageId || msgItem.clientMessageId}"\
                class="{{if msgData.type === "bot_response"}}fromOtherUsers{{else}}fromCurrentUser{{/if}} with-icon linechart"> \
                {{if msgData.createdOn}}<div aria-live="off" class="extra-info">${helpers.formatDate(msgData.createdOn)}</div>{{/if}} \
                {{if msgData.icon}}<div aria-live="off" class="profile-photo extraBottom"> <div class="user-account avtar" style="background-image:url(${msgData.icon})"></div> </div> {{/if}} \
                {{if msgData.message[0].component.payload.text}}<div class="messageBubble linechart">\
                    <span>{{html helpers.convertMDtoHTML(msgData.message[0].component.payload.text, "bot")}}</span>\
                </div>{{/if}}\
                <div class="linechartDiv">\
                    <div class="lineChartChildDiv" id="linechart${msgData.messageId}"></div>\
                </div>\
            </li> \
        {{/if}} \
    </scipt>';


        return linechartTemplate;
    }

}

export default LineChartTemplate;