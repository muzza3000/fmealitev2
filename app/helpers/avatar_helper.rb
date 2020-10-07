module AvatarHelper
  def avatar(user)
    initials = "#{user.first_name.first.capitalize}#{user.last_name.first.capitalize}"
    html = "<div class='avatar' style='background-color: #{user.color}'>
      <span class='initials'>#{initials}</span>
      </div>"
    html.html_safe
  end
end
