module FmeaHelper
  def fmea_type_icon(fmea)
    #'Design', 'System' or 'Process'
    if fmea.fmea_type == "Process"
      ('<i class="fas fa-tasks"></i>').html_safe
    elsif fmea.fmea_type == "System"
      ('<i class="fas fa-project-diagram"></i>').html_safe
    else
      ('<i class="fas fa-drafting-compass"></i>').html_safe
    end
  end

  def product_images?(fmea)
    fmea.images.length == 0 ? false : true
  end
end