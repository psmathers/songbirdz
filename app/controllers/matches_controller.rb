class MatchesController < ApplicationController
  def index
    # change this
    @matches= current_user.match_list.as_json(methods: :match_tier)

    @all_pairs = [current_user.get_matched_pairs].as_json

  end

  def create
    sent_pair = Pair.find_by(sender_id: current_user, receiver_id: params[:match_id])
    received_pair = Pair.find_by(sender_id: params[:match_id], receiver_id: current_user.id)
    if !sent_pair && !received_pair
      pair = current_user.sent_pairs.new(receiver_id: params[:match_id])
      if pair.save
        if request.xhr?
          render :json => {pair: pair}.as_json(include: [:sender, :receiver])
        else
         redirect_to root_url
        end
      else
        # errors
      end
    elsif received_pair
      received_pair.update(accepted: true)
      redirect_to root_url
    end
  end

  def update
    sent_pair = Pair.find_by(sender_id: current_user, receiver_id: params[:match_id])
    received_pair = Pair.find_by(sender_id: params[:match_id], receiver_id: current_user.id)
    if !sent_pair && !received_pair
      pair = current_user.sent_pairs.new(receiver_id: params[:match_id], accepted: false)
      if pair.save
        if request.xhr?
          render :json => {pair: pair}.as_json(include: [:sender, :receiver])
        else
         redirect_to root_url
        end
      else
      end
    elsif received_pair
      received_pair.update(accepted: false)
      redirect_to root_url
    end
  end

  def destroy
  end

end
