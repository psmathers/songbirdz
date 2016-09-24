class MatchesController < ApplicationController
  def index
    # change this
    @matches= current_user.match_list.as_json
  end
end
