class UsersController < ApplicationController

 def show
  @user = current_user.as_json(include: :preferences)
 end

 def update
  p params
  user = User.find(current_user.id)
  user.update(age: params[:age], gender: params[:gender], about: params[:about], min_age_choice: params[:minAge], max_age_choice: params[:maxAge])

  if params[:men]
    user.user_preferences.create(preference_id: params[:men].to_i)
  end

  if params[:women]
    user.user_preferences.create(preference_id: params[:women].to_i)
  end

  if params[:other]
    user.user_preferences.create(preference_id: params[:other].to_i)
  end

  if request.xhr?
    render :json => {user: user}.as_json(include: :preferences)
  else
    redirect_to root_url
  end
 end

 def destroy
 end

end
