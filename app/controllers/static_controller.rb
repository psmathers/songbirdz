class StaticController < ApplicationController
  def index
    if !!current_user
      if current_user.birdlist_id != nil
        redirect_to matches_path
      end
    end
  end

end
