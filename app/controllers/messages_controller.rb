class MessagesController < ApplicationController
  def index

  end

  def create
    @chat = Chat.find_or_create_by(id: params[:message][:chat_id])
    @message = @chat.messages.new(message_params)
    if request.xhr?
      if @message.save
        return @message.as_json
      else
        @errors = @message.errors.full_messages
        puts @errors
      end
    else
      
    end
  end

  private

  def message_params
    params[:message][:user_id] = current_user.id
    params.require(:message).permit(:chat_id, :user_id, :content)
  end
end
