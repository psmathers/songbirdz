class UsersController < ApplicationController

 def show
  @img = current_user.display_img
  if request.xhr?
    current_user.get_anthem_id
    current_user.save
  end
  @user = current_user.as_json(include: :preferences)
 end

 def update
  user = current_user
  if params[:user] != nil
    user.update(user_params)
  else
    user.update(age: params[:age], gender: params[:gender], about: params[:about], min_age_choice: params[:minAge], max_age_choice: params[:maxAge])
    user.update_preferences(params)
  end

  if request.xhr?
    render :json => {user: user}.as_json(include: :preferences)
  else
    redirect_to user_path
  end
 end

  def destroy
  end

  private

  def user_params
    params.require(:user).permit(:image)
  end

end
