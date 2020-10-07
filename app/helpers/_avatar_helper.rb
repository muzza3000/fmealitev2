module AvatarHelper
  def avatar(user)
    initials = "#{user.first_name.first.capitalize}#{user.last_name.first.capitalize}"
    html = "<div class='avatar' style='background-color: #{user.color}'>
      <h3>#{initials}</h3>
      </div>"
    html.safe_html
  end


end
