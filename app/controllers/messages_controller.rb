class MessagesController < ApplicationController
  def index
    @chat = Chat.find(params[:chat_id])
    @messages = @chat.messages.as_json(include: {user: {only: :name}})
    render json: @messages
  end

  def create
    @chat = Chat.find(message_params["chat_id"])
    @message = @chat.messages.new(message_params)
    if request.xhr?
      if @message.save
        render json: @message.as_json(include: {user: {only: :name}})
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
