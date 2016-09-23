class MatchesController < ApplicationController
  def index
    # change this
    @matches= User.all.as_json
  end
end
