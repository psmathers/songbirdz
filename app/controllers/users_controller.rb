class UsersController < ApplicationController

 def show
 end

 def update
  user = User.find(current_user.id)
  p user
  user.update(age: params[:age], gender: params[:gender], about: params[:about], min_age_choice: params[:minAge], max_age_choice: params[:maxAge])
  redirect_to root_url
 end

 def destroy
 end

end
