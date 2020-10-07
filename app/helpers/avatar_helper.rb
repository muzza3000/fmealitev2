module AvatarHelper
  def avatar(user)
    standards = ["BB", "TM"]
    initials = standards.sample
    initials = "#{user.first_name.first.capitalize}#{user.last_name.first.capitalize}" unless (user.first_name.nil? || user.last_name.nil?)
    html = "<div class='avatar' style='background-color: #{user.color}'>
      <span class='initials'>#{initials}</span>
      </div>"
    html.html_safe
  end
end
