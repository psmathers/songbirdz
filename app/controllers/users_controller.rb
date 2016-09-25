class UsersController < ApplicationController

 def show
  if request.xhr?
    current_user.get_anthem_id
    current_user.save
  end
  @user = current_user.as_json(include: :preferences)
 end

 def update
  user = current_user

  user.update(age: params[:age], gender: params[:gender], about: params[:about], min_age_choice: params[:minAge], max_age_choice: params[:maxAge])

  user.update_preferences(params)

  if request.xhr?
    render :json => {user: user}.as_json(include: :preferences)
  else
    redirect_to root_url
  end
 end

 def destroy
 end

end
