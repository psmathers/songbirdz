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

  if params[:user] != nil
    user.update(user_params)
  else
    user.update(age: params[:age], gender: params[:gender], about: params[:about], min_age_choice: params[:minAge], max_age_choice: params[:maxAge])
    user.update_preferences(params)
  end

  if request.xhr?
    render :json => {user: user}.as_json(include: :preferences)
  else
    redirect_to root_url
  end
 end

  def destroy
  end

  private

  def user_params
    params.require(:user).permit(:id, :name, :provider, :uid, :token, :refresh_token, :age, :gender, :about, :min_age_choice, :max_age_choice, :birdlist_id, :anthem_id, :image_file_name, :image_content_type, :image_file_size, :image_updated_at, :created_at, :updated_at, :user, :image)
  end

end
