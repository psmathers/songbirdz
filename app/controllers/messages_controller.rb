class MessagesController < ApplicationController
  def index

  end

  def create
    @chat = Chat.find(params[:chat_id])
    @message = @chat.messages.new(message_params)
    if @message.save
      if request.xhr?
        debugger
        return @message.as_json
      end
    else

    end
  end

  private

  def message_params
    params.require(:message).permit(:chat_id, :user_id, :content)
  end
end
